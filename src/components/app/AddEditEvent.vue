<template>
  <v-container>
    <v-toolbar dense flat style="padding-top: 2px">
      <v-btn @click.stop="closeOrOpenLeftPanel()" color="primary" icon v-show="isMobile" x-large>
        <!--          <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>-->
        <!--          <v-icon>mdi-code-less-than</v-icon>-->
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title style="font-size: 17px">{{ isAdd ? $t('message.addOnMap') : $t('message.editEvent') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="cancelAddEdit(!isEdited())" fab small>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-form class="pa-3 pt-0" v-model="valid">
      <v-row class="ma-0">
        <v-col class="pa-0">
          <span class="font-weight-bold">{{ $t('message.address') }}: </span>
          <v-label>{{ " " + event.address.display_name }}</v-label>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="pt-0 pb-5 ">
          <span class="font-weight-bold" style="font-size: 12px" v-show="event.address.lat">
            {{
              $t('message.latitude') + ': ' + event.address.lat.substring(0, 8) + ' / ' + $t('message.longitude') + ': ' + event.address.lon.substring(0, 8)
            }}
          </span>
        </v-col>
      </v-row>
      <v-autocomplete
              :disabled="!canEditEventCategory && !isOwnEvent"
              :filter="customFilter"
              :items="categoriesForLang"
              :label="$t('message.categories')"
              :no-data-text="$t('message.noData')"
              @change="changeCategory(event.category_id)"
              color="primary"
              filled
              item-text="description"
              item-value="id"
              outlined
              v-model="event.category_id"
      >
        <template v-slot:selection="data">
          <v-avatar class="mr-2" left size="25">
            <v-img :src="icons_url[data.item.id]"></v-img>
          </v-avatar>
          {{ data.item.title }}
        </template>

        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-icon clas="ma-0">
              <img :src="icons_url[data.item.id]" width="25">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size: 16px" v-html="data.item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>

      <v-row justify="space-between">
        <v-spacer></v-spacer>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="mr-4" v-bind="attrs" @click="event.show_name_for_anonym = !event.show_name_for_anonym"
                    :disabled="!canEditEventNameVisibility && !isOwnEvent" color="green" v-on="on">
              {{ event.show_name_for_anonym ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
            </v-icon>
          </template>

          <span>{{
              event.show_name_for_anonym ? $t('message.eventVisibleOnDescription') : $t('message.eventVisibleOffDescription')
            }} </span>
        </v-tooltip>
      </v-row>
      <v-text-field
              :disabled="!canEditEventName && !isOwnEvent"
              :label="$t('message.eventName')"
              dense
              outlined
              required
              v-model="event.name">
      </v-text-field>

      <v-row justify="space-between">
        <v-spacer></v-spacer>
        <v-tooltip right>

          <template v-slot:activator="{ on, attrs }">
            <v-icon class="mr-4" v-bind="attrs"
                    @click="event.show_description_for_anonym = !event.show_description_for_anonym"
                    :disabled="!canEditEventDescriptionVisibility && !isOwnEvent"
                    color="green" v-on="on">{{ event.show_description_for_anonym ? 'mdi-eye-outline' :
              'mdi-eye-off-outline' }}
            </v-icon>
          </template>
          <span>{{
              event.show_description_for_anonym ? $t('message.eventVisibleOnDescription') : $t('message.eventVisibleOffDescription')
            }} </span>
        </v-tooltip>
      </v-row>
      <v-textarea
              :disabled="!canEditEventDescription && !isOwnEvent"
              :label="$t('message.eventDescription')"
              :rules="descriptionRules"
              counter="500"
              denss
              outlined
              rows="5"
              v-model="event.description"
      ></v-textarea>
      <v-row class="px-1 py-2  pt-0">
        <v-col class="pt-0" cols="6" md="6">

          <v-label>{{ $t('message.start') }}</v-label>
          <flat-pickr :config="dateTimePickerConfig" class="date-picker-border"
                      :disabled="!canEditEventStartDate && !isOwnEvent"
                      v-model="event.start_date">
          </flat-pickr>

          <v-label v-if="(canEditEventDuration && isAdd) || ((canEditEventDuration && !isAdd))">{{ $t('message.end')
            }}
          </v-label>
          <flat-pickr :config="dateTimePickerConfig" class="date-picker-border"
                      :disabled="!canEditEventDuration"
                      v-if="(canEditEventDuration && isAdd) || ((canEditEventDuration && !isAdd))"
                      v-model="event.end_date">
          </flat-pickr>

        </v-col>

      </v-row>

      <v-row justify="space-between" v-if="!isAdd">
        <v-col class="px-4 py-1" cols="12">
          <v-label>
            {{ $t("message.status") }}:
          </v-label>
          <span
                  :style="'color: ' + getColor(event.is_active)"> {{
              event.is_active ? $t('message.eventStatusActive') : $t('message.eventStatusNotActive')
            }}
          </span>
        </v-col>

        <v-col class="px-4 py-1" cols="12">
          <v-label>
            {{ $t("message.moderationStatus") }}:
          </v-label>
          <span
                  :style="'color: ' + getColor(isModeratedOneWay)"> {{
              isModeratedOneWay === true ? $t('message.moderationStatusModerated') : isModeratedOneWay === false ? $t('message.notModerated') : $t('message.waitingModeration')
            }}
          </span>
        </v-col>

        <v-col class="px-2 pa-1 pb-3 right" align="right" cols="8" v-if="canModerateEvent">
          <v-checkbox
                  :indeterminate="event.is_moderated === null"
                  :label="event.is_moderated === true ? $t('message.moderated') : event.is_moderated === false ? $t('message.notModerated') : $t('message.waitingModeration')" class="ma-2"
                  hide-details inset
                  v-model="event.is_moderated"></v-checkbox>
        </v-col>
      </v-row>
      <v-row justify="space-around">
        <v-btn @click="deleteEvent()" class=" error pa-2 mx-1 white--text"
               color="role"
               v-show="!isAdd && (isOwnEvent || canDeleteEvent)">
          {{ $t("message.delete") }}
        </v-btn>
        <!-- <v-btn @click="clear()" class="mx-1">{{ $t("message.clear") }}</v-btn>-->
        <v-btn :disabled="(event.name.length < 3 || !valid) || !isEdited()" @click="submit()"
               class=" pa-2 mx-1 white--text"
               color="green accent-4">
          {{ $t("message.save") }} {{ event.is }}
        </v-btn>
      </v-row>
    </v-form>
    <v-divider class="mt-6 mb-2"></v-divider>
    <v-card class="mx-4 mt-5 px-2"
            color="light-green lighten-5"
            elevation="1" v-show="!isAdd">

      <v-card-title class="py-2">
        <v-col align="center" class="pa-0 pt-1">
          <v-avatar>
            <img :src="eventUser.photo_url ? eventUser.photo_url : defaultAvatarUrl" alt="Avatar" class="avatar">
          </v-avatar>
          <a :href="'https://t.me/' + eventUser.login" class="mx-3" style="text-decoration: none;font-size: 1.15rem"
             target="_blank">
            {{ eventUser.login ? ('@' + eventUser.login) : '' }}</a>
        </v-col>
      </v-card-title>

      <v-card-actions v-if="canBlockUser && !isOwnEvent">
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="blockUser()">Block user</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>

    <v-dialog max-width="350"
              v-model="dialog">
      <v-card>
        <v-card-title class="headline">
            {{$t("notification.areYouLeavePageTitle")}}
        </v-card-title>
        <v-card-text>
          {{$t("notification.areYouLeavePage")}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false"
                 color="green darken-1"
                 text>
            {{$t("message.no")}}
          </v-btn>
          <v-btn @click="cancelAddEdit(true)"
                 color="green darken-1"
                 text>
            {{$t("message.yes")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
    import {CONSTANTS} from "../../utils/constants";
    import axios from "../../plugins/api-axios";
    import {mapGetters} from "vuex";
    import flatpickr from 'vue-flatpickr-component'
    import moment from "moment";

    export default {
        name: "AddEditEvent",
        components: {
            'flat-pickr': flatpickr,
        },
        data() {
            return {
                dialog: false,
                defaultAvatarUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                startDateMenu: false,
                dateTimePickerConfig: {
                    firstDayOfWeek: 1,
                    locale: {
                        firstDayOfWeek: 1,
                        localize: localStorage.getItem('cur_lang')
                    },
                    time_24hr: true,
                    tdateFormat: 'H:i',
                    enableTime: true,
                    weekNumbers: true
                },
                isAdd: true,
                isModerator: false,
                saveDisabled: true,
                hasSaved: false,
                isEditing: false,
                descriptionLimit: 255,
                entries: [],
                isLoading: false,
                foundAddressModel: null,
                categoriesForLang: [
                    {id: 1, title: this.$t('category.need_help')},
                    {id: 2, title: this.$t('category.ready_assist')},
                    {id: 3, title: this.$t('category.water')},
                    {id: 4, title: this.$t('category.food')},
                    {id: 5, title: this.$t('category.health_care_center')},
                    {id: 6, title: this.$t('category.doctor')},
                    {id: 7, title: this.$t('category.blood_center')},
                    {id: 8, title: this.$t('category.blood_donor')},
                    {id: 9, title: this.$t('category.charity')},
                    {id: 10, title: this.$t('category.attention')},
                    {id: 11, title: this.$t('category.level')},
                    {id: 12, title: this.$t('category.vet')},
                ],
                // searchAddress: null,
                eventUser: {},
                event: {
                    user_id: null,
                    category_id: 1,
                    name: '',
                    description: '',
                    address: {
                        display_name: '',
                        lat: '',
                        lon: ''
                    },
                    geojson: null,
                    is_active: true,
                    start_date: new Date().toISOString(),
                    end_date: this.getDate(new Date(), 3),
                    is_moderated: null,
                    reg_date: null,
                    show_name_for_anonym: true,
                    show_description_for_anonym: false,
                    calc_status: null,
                },
                defaultEvent: null,
                isModeratedOneWay: null,
                descriptionRules: [
                    v => v.length <= 500 || this.$t('message.descriptionMaxLengthRule'),
                ],
                icons_url: CONSTANTS.ICONS_URL,
                categories: [],
                isOwnEvent: false,
                canModerateEvent: null,
                canEditEventDuration: null,
                canDeleteEvent: null,
                canBlockUser: null,
                canEditEventCategory: null,
                canEditEventName: null,
                canEditEventDescription: null,
                canEditEventStartDate: null,
                canEditEventEndDate: null,
                canEditEventNameVisibility: null,
                canEditEventDescriptionVisibility: null,

                valid: false
            }
        },
        created() {
            this.subscribeToAppStateChanged()
        },
        mounted() {
            this.categories = this.$store.getters.getCategories
            this.onChangeLang()
            // console.log('this.$store.getters.isMobile: ' + this.$store.getters.isMobile)
        },
        watch: {},
        methods: {
            // eslint-disable-next-line no-unused-vars
            isEdited() {
                console.log('isEdited')
                if (this.defaultEvent != null) {
                    this.event.start_date = this.getDateFormatFromIso(this.event.start_date)
                    this.event.end_date = this.getDateFormatFromIso(this.event.end_date)
                    this.defaultEvent.start_date = this.getDateFormatFromIso(this.defaultEvent.start_date)
                    this.defaultEvent.end_date = this.getDateFormatFromIso(this.defaultEvent.end_date)
                    let eventStr = JSON.stringify(this.event)
                    let defaultStr = JSON.stringify(this.defaultEvent)

                    // console.log(eventStr)
                    // console.log(defaultStr)
                    console.log(!(Object.is(defaultStr, eventStr)))
                    return !(Object.is(defaultStr, eventStr))
                } else {
                    return false
                }
            },
            // eslint-disable-next-line no-unused-vars
            customFilter(item, queryText) {
                const textOne = item.title.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1
            },
            closeOrOpenLeftPanel() {
                this.$store.dispatch('SET_IS_LEFT_PANEL_OPEN', !this.$store.getters.getIsLeftPanelOpen)
            },
            onChangeLang: function () {
                // Change array Locale
                // categoriesForLang
                this.categoriesForLang = [
                    {id: 1, title: this.$t('category.need_help')},
                    {id: 2, title: this.$t('category.ready_assist')},
                    {id: 3, title: this.$t('category.water')},
                    {id: 4, title: this.$t('category.food')},
                    {id: 5, title: this.$t('category.health_care_center')},
                    {id: 6, title: this.$t('category.doctor')},
                    {id: 7, title: this.$t('category.blood_center')},
                    {id: 8, title: this.$t('category.blood_donor')},
                    {id: 9, title: this.$t('category.charity')},
                    {id: 10, title: this.$t('category.attention')},
                    {id: 11, title: this.$t('category.level')},
                    {id: 12, title: this.$t('category.vet')},
                ]
            },
            getEventUser(userId) {
                axios.get('user/protected/getById/' + userId)
                    .then(res => {
                        if (res.data.result) {
                            this.eventUser = res.data.result
                        } else {
                            // console.log('--003')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--004')
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            },
            cancelAddEdit(isAgree) {
                // console.log(isAgree)
                if (isAgree) {
                    this.dialog = false
                    this.defaultEvent = null
                    switch (this.getCurrentState) {
                        case CONSTANTS.APP_STATE.ADD_EVENT:
                            this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.CANCEL_ADD_EVENT)
                            break;
                        case CONSTANTS.APP_STATE.EDIT_EVENT:
                            this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.CANCEL_EDIT_EVENT)
                            break;
                        default:
                            this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.DEFAULT)
                    }
                } else {
                    this.dialog = true
                }
            },
            async submit() {
                // this.isEditing = !this.isEditing
                this.hasSaved = true
                // console.log(this.getCurrentState)

                if (this.isEdited()) {
                    switch (this.getCurrentState) {
                        case CONSTANTS.APP_STATE.ADD_EVENT:
                            // console.log('ADD_EVENT ADD form')

                            this.addEvent()
                            break;
                        case CONSTANTS.APP_STATE.EDIT_EVENT:
                            this.updateEvent()
                            break;
                    }
                }


            },
            async addEvent() {
                // console.log('addEvent')
                try {
                    if (!axios.defaults.headers.common['Authorization']) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
                    }

                    if (this.getDbUser && this.getDbUser.role_id === CONSTANTS.ROLE.USER) {
                        // console.log(this.event.end_date)
                        // console.log(this.event.category_id)

                        this.changeEventEndDateByCategory(this.event.start_date, this.event.category_id)
                        // console.log(this.event.end_date)
                        // this.event.end_date = this.getDate(this.event.start_date, 1)
                    }

                    if ((this.event.start_date && this.event.end_date) && this.getDate(this.event.start_date) >= this.getDate(this.event.end_date)) {
                        this.$toast.warning(this.$t("notification.notValidDatePeriod"))
                        console.log('check dates!!!!')
                        return
                    }

                    // console.log(this.getEditedPointFeature)
                    if (this.getEditedPointFeature) {

                        let editedPointFeature = this.getEditedPointFeature
                        let editedPointFeatureAddress = this.getEditedPointFeatureAddress

                        let startDateWithZone = moment(this.event.start_date).format()
                        let endDateWithZone = moment(this.event.end_date).format()

                        let lon = this.event.address.lon
                        let lat = this.event.address.lat

                        let regionId = await this.getRegionIdByCoordinates(lon, lat);

                        let postParams = JSON.stringify({
                            user_id: this.$store.getters.getDbUser.id,
                            category_id: this.event.category_id,
                            name: this.event.name,
                            description: this.event.description,
                            geojson: editedPointFeature.get('geoJsonFeature'),
                            address: JSON.stringify(this.event.address),
                            country_code: editedPointFeatureAddress.country_code,
                            start_date: startDateWithZone,
                            end_date: endDateWithZone,
                            show_name_for_anonym: this.event.show_name_for_anonym,
                            show_description_for_anonym: this.event.show_description_for_anonym,
                            region_id: regionId
                        })

                        let eventObject = JSON.parse(postParams)

                        // console.log(JSON.parse(editedPointFeature.get('geoJsonFeature')).geometry.coordinates)

                        axios.post('event/protected/save', postParams)
                            .then(res => {
                                if (res.data.result) {
                                    this.$toast.success(this.$t("notification.saved"))

                                    eventObject.id = res.data.result.id
                                    eventObject.is_active = true

                                    this.$store.dispatch('ADD_COMPLETE', eventObject)
                                    this.$store.dispatch('STATE_CHANGED', CONSTANTS.APP_STATE.DEFAULT)

                                    // Export event to other projects
                                    this.exportEventToOtherProjects(eventObject)

                                    if (!axios.defaults.headers.common['Authorization']) {
                                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
                                    }

                                    axios.get('event/protected/getById/' + eventObject.id)
                                        .then(res => {
                                            // console.log(res)
                                            if (res.data.result) {
                                                this.notifyTelegramBotAboutNewEvent(res.data.result, 1, regionId)
                                                this.defaultEvent = null
                                            } else {
                                                console.log(res.data.error)
                                                // console.log('--005')
                                                this.$store.dispatch('SET_ERROR', res.data.error)
                                            }
                                        })
                                        .catch(e => {
                                            // console.log('--006')
                                            this.$store.dispatch('SET_ERROR', e)
                                            console.log('error- ' + e)
                                        })


                                    this.clearValues()
                                } else {
                                    console.log(res.data.error)
                                    // console.log('--007')
                                    this.$store.dispatch('SET_ERROR', res.data.error)
                                }
                            })
                            .catch(e => {
                                // console.log('--008')
                                this.$store.dispatch('SET_ERROR', e)
                                console.log('error- ' + e)
                            })
                    }

                } catch (e) {
                    console.log(e)
                    throw e
                }
            },
            async updateEvent() {
                try {
                    if (!axios.defaults.headers.common['Authorization']) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
                    }

                    if (this.getDbUser && this.getDbUser.role_id === CONSTANTS.ROLE.USER &&
                        (!this.event.is_moderated && this.event.is_moderated !== true)) {
                        // console.log('22222222222222')
                        // console.log(this.event.category_id)

                        this.changeEventEndDateByCategory(this.event.start_date, this.event.category_id)
                        // console.log(this.event.end_date)
                        // this.event.end_date = this.getDate(this.event.start_date, 1)
                    }

                    if ((this.event.start_date && this.event.end_date) && this.getDate(this.event.start_date) >= this.getDate(this.event.end_date)) {
                        // console.log((this.event.start_date && this.event.end_date))
                        // console.log(this.getDate(this.event.start_date) >= this.getDate(this.event.end_date))
                        this.$toast.warning(this.$t("notification.notValidDatePeriod"))
                        return
                    }

                    if (this.getEditedPointFeature) {

                        let editedPointFeature = this.getEditedPointFeature

                        // eslint-disable-next-line no-unused-vars
                        let needRemoderateEvent = false
                        let moderationStatus = 1

                        let actionUserId = null

                        if (this.getDbUser) {
                            actionUserId = this.getDbUser.id;
                        }

                        if (!this.event.is_moderated && this.event.is_moderated !== false) {
                            if (this.getDbUser &&
                                this.getDbUser.role_id === CONSTANTS.ROLE.USER ||
                                this.getDbUser.role_id === CONSTANTS.ROLE.TRUSTED_USER) {
                                this.event.is_moderated = null
                                needRemoderateEvent = true
                                moderationStatus = 2
                            }
                        }

                        if (this.event.is_moderated || this.event.is_moderated === false) {
                            if (this.getDbUser &&
                                this.getDbUser.role_id === CONSTANTS.ROLE.USER ||
                                this.getDbUser.role_id === CONSTANTS.ROLE.TRUSTED_USER) {

                                this.event.is_moderated = null
                                needRemoderateEvent = true
                                moderationStatus = 3
                            }
                        }

                        let lon = this.event.address.lon
                        let lat = this.event.address.lat

                        let regionId = await this.getRegionIdByCoordinates(lon, lat);

                        let postParams = JSON.stringify({
                            id: editedPointFeature.get('id'),
                            category_id: this.event.category_id,
                            name: this.event.name,
                            description: this.event.description,
                            geojson: editedPointFeature.get('geoJsonFeature'),
                            address: JSON.stringify(this.event.address),
                            country_code: this.event.address.country_code || '',
                            start_date: new Date(this.event.start_date).toISOString(),
                            end_date: new Date(this.event.end_date).toISOString(),
                            is_moderated: this.event.is_moderated,
                            show_name_for_anonym: this.event.show_name_for_anonym,
                            show_description_for_anonym: this.event.show_description_for_anonym,
                            action_user_id: actionUserId,
                            region_id: regionId
                        })

                        let postParamsObject = JSON.parse(postParams)

                        axios.post('event/protected/save', postParams)
                            .then(res => {
                                if (res.data.result) {
                                    this.$toast.success(this.$t("notification.updated"))
                                    this.defaultEvent = null
                                    postParamsObject.id = res.data.result.id
                                    postParamsObject.is_active = editedPointFeature.get('is_active')

                                    if (this.getDbUser &&
                                        this.getDbUser.role_id === CONSTANTS.ROLE.MODERATOR ||
                                        this.getDbUser.role_id === CONSTANTS.ROLE.ADMINISTRATOR ||
                                        this.getDbUser.role_id === CONSTANTS.ROLE.SYSTEM_ADMINISTRATOR) {

                                        if (this.isModeratedOneWay !== this.event.is_moderated) {
                                            this.notifyTelegramBotAboutModeration(this.event, regionId)
                                        }
                                    }

                                    if (needRemoderateEvent) {
                                        axios.get('event/protected/getById/' + res.data.result.id)
                                            .then(res => {
                                                if (res.data.result) {
                                                    this.notifyTelegramBotAboutNewEvent(res.data.result, moderationStatus, regionId)
                                                } else {
                                                    console.log(res.data.error)
                                                    // console.log('--009')
                                                    this.$store.dispatch('SET_ERROR', res.data.error)
                                                }
                                            })
                                            .catch(e => {
                                                // console.log('--010')
                                                this.$store.dispatch('SET_ERROR', e)
                                                console.log('error- ' + e)
                                            })
                                    }

                                    this.$store.dispatch('UPDATE_COMPLETE', postParamsObject)
                                    this.$store.dispatch('STATE_CHANGED', CONSTANTS.APP_STATE.DEFAULT)
                                    this.clearValues()
                                } else {
                                    console.log(res.data.error)
                                    // console.log('--011')
                                    this.$store.dispatch('SET_ERROR', res.data.error)
                                }
                            })
                            .catch(e => {
                                // console.log('--012')
                                this.$store.dispatch('SET_ERROR', e)
                                console.log('error- ' + e)
                            })
                    }

                } catch (e) {
                    console.log(e)
                    throw e
                }
            },
            deleteEvent() {
                try {
                    if (!axios.defaults.headers.common['Authorization']) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
                    }

                    if (this.getDbUser) {
                        let postParams = JSON.stringify({
                            eventId: this.event.id,
                            performDeletionUserId: this.getDbUser.id,
                            categoryId: this.event.category_id,
                        })

                        let postParamsObject = JSON.parse(postParams)


                        axios.post('event/protected/deleteEvent', postParams)
                            .then(res => {
                                if (res.data.result) {

                                    this.$store.dispatch('DELETE_COMPLETE', postParamsObject)
                                    this.$store.dispatch('STATE_CHANGED', CONSTANTS.APP_STATE.DEFAULT)
                                } else {
                                    console.log(res.data.error)
                                    // console.log('--013')
                                    this.$store.dispatch('SET_ERROR', res.data.error)
                                }
                            })
                            .catch(e => {
                                // console.log('--014')
                                this.$store.dispatch('SET_ERROR', e)
                                console.log('error- ' + e)
                            })
                    }

                } catch (e) {
                    console.log(e)
                    throw e
                }
            },
            blockUser() {
                try {
                    if (!axios.defaults.headers.common['Authorization']) {
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
                    }

                    if (this.getDbUser) {
                        let postParams = JSON.stringify({
                            userId: this.event.user_id,
                            performBlockingUserId: this.getDbUser.id
                        })

                        axios.post('user/protected/blockUser', postParams)
                            .then(res => {
                                if (res.data.result) {
                                    this.$store.dispatch('STATE_CHANGED', CONSTANTS.APP_STATE.DEFAULT)
                                } else {
                                    console.log(res.data.error)
                                    // console.log('--015')
                                    this.$store.dispatch('SET_ERROR', res.data.error)
                                }
                            })
                            .catch(e => {
                                // console.log('--016')
                                this.$store.dispatch('SET_ERROR', e)
                                console.log('error- ' + e)
                            })
                    }

                } catch (e) {
                    console.log(e)
                    throw e
                }
            },
            notifyTelegramBotAboutNewEvent(eventData, moderationStatus, regionId) {

                delete eventData['geojson']
                eventData.ext_user_id = this.getExtUser.id
                eventData.ext_user_name = this.getExtUser.first_name
                eventData.ext_user_last_name = this.getExtUser.last_name
                eventData.ext_user_login = this.getExtUser.username
                eventData.moderation_status = moderationStatus
                eventData.region_id = regionId
                // eventData.startDateLocale = eventData.startDate.toLocaleString()
                // eventData.createDate = eventData.startDate.toLocaleString()
                // console.log(eventData)
                let eventDataString = JSON.stringify(eventData)

                axios.post(process.env.VUE_APP_BOT_API_URL + '/eventAdded/', eventDataString)
                    .then(res => {
                        if (res.data.result) {
                            this.$toast.success(this.$t("notification.eventSendToModeration",
                                {url_bot: "<a href=\"https://telegram.me/lifemap_bot\" place=\"url\" target=\"_blank\">@lifemap_bot</a>"}))

                        } else {
                            // console.log('--017')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--018')
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            },
            notifyTelegramBotAboutModeration(eventData, regionId) {
                delete eventData['geojson']

                let postParams = JSON.stringify({
                    eventId: eventData.id,
                    userId: eventData.user_id,
                    extUserId: eventData.user_ext_user_id,
                    categoryId: eventData.category_id || 0,
                    name: eventData.name || '',
                    description: eventData.description || '',
                    regDate: eventData.reg_date || '',
                    startDate: new Date(eventData.start_date).toISOString() || '',
                    endDate: new Date(eventData.end_date).toISOString() || '',
                    address: eventData.address.display_name || '',
                    isModerationSuccess: eventData.is_moderated,
                    regionId: regionId
                })

                // eventData.ext_user_id = this.getExtUser.id
                // eventData.ext_user_name = this.getExtUser.first_name
                // eventData.ext_user_last_name = this.getExtUser.last_name
                // eventData.ext_user_login = this.getExtUser.username
                // eventData.startDateLocale = eventData.startDate.toLocaleString()
                // eventData.createDate = eventData.startDate.toLocaleString()
                // console.log(eventData)
                // let eventDataString = JSON.stringify(eventData)
                // console.log(eventDataString)

                axios.post(process.env.VUE_APP_BOT_API_URL + '/eventModerated/', postParams)
                    .then(res => {
                        if (res.data.result) {
                            // console.log(res.data.result)
                        } else {
                            // console.log('--019')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--020')
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            },
            async exportEventToOtherProjects(eventData) {
                if (eventData.category_id === CONSTANTS.EVENT_CATEGORY.NEED_HELP) {

                    let externalEventId = await this.exportEventToBirdamlik(eventData)
                    // console.log(externalEventId)

                    let exportedEventId = await this.saveExportedEvent(eventData.id, externalEventId)
                    console.log(exportedEventId)
                }
            },
            async exportEventToBirdamlik(eventData) {
                // console.log('exportEventToBirdamlik')
                let fullName = ''

                if (this.getExtUser.first_name) {
                    fullName = this.getExtUser.first_name
                }

                if (this.getExtUser.last_name) {
                    fullName += ' ' + this.getExtUser.last_name
                }

                if (!eventData.id || !eventData.name || !JSON.parse(eventData.address).display_name) {
                    console.log('Not found required fields')
                    return
                }

                let messageText = eventData.name

                if (eventData.description) {
                    messageText += ', ' + eventData.description
                }
                // console.log('quick birdamlik post')

                let postParams = JSON.stringify({
                    lifemap_id: eventData.id,
                    fio: fullName || '',
                    phone: this.getDbUser.phone_mobile || '',
                    address: JSON.parse(eventData.address).display_name || '',
                    description: messageText || '',
                })

                // let eventObject = JSON.parse(postParams)

                delete axios.defaults.headers.common['Authorization']

                return axios.post(CONSTANTS.BIRDAMLIK_EXPORT_EVENT_URL, postParams, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                })
                    .then(birdamlikRes => {
                        // console.log(birdamlikRes)

                        if (birdamlikRes.data) {
                            // console.log(birdamlikRes.data)
                            return birdamlikRes.data.id
                        } else {
                            // console.log(birdamlikRes)
                            this.$store.dispatch('SET_ERROR', birdamlikRes)
                        }
                    })
                    .catch(e => {
                        console.log(e)
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            },

            async saveExportedEvent(eventId, externalEventId) {

                let postParams = JSON.stringify({
                    event_id: eventId,
                    external_event_id: externalEventId || 999
                })

                // console.log(postParams)

                return axios.post('exported-event/protected/save', postParams)
                    .then(res => {
                        if (res.data.result) {
                            this.$toast.success(this.$t("notification.saved"))

                            if (res.data.result.id) {
                                return res.data.result.id
                            }

                        } else {
                            // console.log(res.data.error)
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            },
            async getRegionIdByCoordinates(ilon, ilat) {

                let postParams = JSON.stringify({
                    lon: parseFloat(ilon),
                    lat: parseFloat(ilat),
                })

                // console.log(postParams)

                return axios.post('event/protected/getRegionByCoordinates', postParams)
                    .then(res => {
                        // console.log(res)
                        if (res.data.result) {
                            // console.log('region calculated success')
                            //
                            // console.log(res.data.result)
                            // console.log(res.data.result.region_id)

                            if (res.data.result.region_id) {
                                return res.data.result.region_id
                            } else {
                                return 0
                            }
                        } else {
                            // console.log(res.data.error)
                            // console.log('--011')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                            return 0
                        }
                    })
                    .catch(e => {
                        // console.log('--012')
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                        return 0
                    })
            },
            // eslint-disable-next-line no-unused-vars

            setAddressToEvent(address) {
                // console.log('setAddressToEvent')
                if (address) {
                    let addressObj = JSON.parse(JSON.stringify(address))
                    addressObj = addressObj ? addressObj : {
                        display_name: '',
                        lat: '',
                        lon: ''
                    }
                    this.event.address = addressObj

                    if (this.defaultEvent == null && (this.$store.getters.getCurrentState === CONSTANTS.APP_STATE.ADD_EVENT
                        || this.$store.getters.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT)) {
                        this.defaultEvent = Object.assign({}, this.event)
                    }
                }
            },
            clear() {
                this.clearValues()
            },
            clearValues() {
                // console.log('clear')
                // this.searchAddress = null
                this.entries = []

                let address

                if (this.getUserLocationAddress) {
                    address = this.getUserLocationAddress
                } else {
                    address = {
                        display_name: '',
                        lat: '',
                        lon: ''
                    }
                }

                this.event = {
                    user_id: null,
                    category_id: 1,
                    name: '',
                    description: '',
                    address: address,
                    geojson: null,
                    is_active: true,
                    start_date: new Date().toISOString(),
                    end_date: this.getDate(new Date(), 3),
                    is_moderated: null,
                    show_name_for_anonym: true,
                    show_description_for_anonym: false,
                    calc_status: null,
                    reg_date: null,
                    canDeleteEvent: null,
                    canBlockUser: null,
                    canEditEventCategory: null,
                    valid: false
                }
            },
            changeCategory(categoryId) {
                // console.log('changeCategory: ' + categoryId)

                if (this.getCurrentState === CONSTANTS.APP_STATE.ADD_EVENT) {
                    this.changeEventEndDateByCategory(new Date(), categoryId)
                }
            },
            changeEventEndDateByCategory(dateValue, categoryId) {
                // console.log('changeEventEndDateByCategory: ' + categoryId)
                // console.log('old this.event.end_date: ' + this.event.end_date)

                switch (categoryId) {
                    case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                        this.event.end_date = this.getDate(dateValue, 3)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                        this.event.end_date = this.getDate(dateValue, 7)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.WATER:
                        this.event.end_date = this.getDate(dateValue, 3)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.FOOD:
                        this.event.end_date = this.getDate(dateValue, 3)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                        this.event.end_date = this.getDate(dateValue, 10)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                        this.event.end_date = this.getDate(dateValue, 10)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                        this.event.end_date = this.getDate(dateValue, 10)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                        this.event.end_date = this.getDate(dateValue, 3)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.CHARITY:
                        this.event.end_date = this.getDate(dateValue, 3)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                        this.event.end_date = this.getDate(dateValue, 3)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.DRIVER:
                        this.event.end_date = this.getDate(dateValue, 7)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.VET:
                        this.event.end_date = this.getDate(dateValue, 10)
                        break;
                }

                // console.log('new this.event.end_date: ' + this.event.end_date)
            },
            subscribeToAppStateChanged() {
                this.unsubscribe = this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'STATE_CHANGED':
                            this.stateProcessing(state.appStates.currentState)
                            break;
                        case 'SET_EDITED_POINT_FEATURE_ADDRESS':
                            this.setAddressToEvent(this.getEditedPointFeatureAddress)
                            break;
                        case 'SET_USER_LOCATION_ADDRESS':
                            this.setAddressToEvent(this.getUserLocationAddress)
                            this.saveDisabled = false
                            break;
                        case 'APP_LANG':
                            // console.log('APP_LANG')
                            this.onChangeLang()
                            break;
                    }
                });
            },
            stateProcessing(appState) {

                switch (appState) {
                    case CONSTANTS.APP_STATE.DEFAULT:

                        break;
                    case CONSTANTS.APP_STATE.ADD_EVENT:
                        this.categories = this.$store.getters.getCategories
                        this.saveDisabled = true;
                        this.defaultEvent = null
                        // this.addEventState();
                        this.clearValues()

                        this.setUserPermissions()

                        this.isAdd = true;
                        break;
                    case CONSTANTS.APP_STATE.EDIT_EVENT:
                        this.categories = this.$store.getters.getCategories
                        this.saveDisabled = false;

                        // console.log(this.getEditedEvent)
                        this.event = Object.assign({}, this.getEditedEvent)
                        this.isModeratedOneWay = this.event.is_moderated

                        this.setUserPermissions()

                        this.isAdd = false;
                        this.getEventUser(this.event.user_id)

                        break;
                    case CONSTANTS.APP_STATE.CANCEL_ADD_EVENT:
                        // this.cancelAddEventState()
                        break;
                    case CONSTANTS.APP_STATE.CANCEL_EDIT_EVENT:
                        break;
                }
            },
            getColor(is_active) {
                if (is_active === true) {
                    'green'
                } else if (is_active === false) {
                    'red'
                } else {
                    'yellow'
                }

                return is_active ? 'green' : 'red'
            },
            setUserPermissions() {
                this.canModerateEvent = this.$getPermission(CONSTANTS.PERMISSION.MODERATE_EVENT)
                this.canDeleteEvent = this.$getPermission(CONSTANTS.PERMISSION.DELETE_EVENT)
                this.canBlockUser = this.$getPermission(CONSTANTS.PERMISSION.BLOCK_USER)

                if (this.event.user_id === this.getDbUser.id) {
                    this.isOwnEvent = true
                } else {
                    this.isOwnEvent = false
                }

                switch (this.getCurrentState) {
                    case CONSTANTS.APP_STATE.ADD_EVENT:

                        this.canEditEventCategory = true
                        this.canEditEventName = true
                        this.canEditEventDescription = true
                        this.canEditEventStartDate = true
                        this.canEditEventEndDate = true
                        this.canEditEventNameVisibility = true
                        this.canEditEventDescriptionVisibility = true

                        if (this.getDbUser.role_id === CONSTANTS.ROLE.MODERATOR ||
                            this.getDbUser.role_id === CONSTANTS.ROLE.ADMINISTRATOR ||
                            this.getDbUser.role_id === CONSTANTS.ROLE.TRUSTED_USER ||
                            this.getDbUser.role_id === CONSTANTS.ROLE.SYSTEM_ADMINISTRATOR) {
                            this.canEditEventDuration = true
                        }
                        break;
                    case CONSTANTS.APP_STATE.EDIT_EVENT:
                        // console.log('user region :' + this.getDbUser.region_id)
                        // console.log('event region :' + this.event.region_id)


                        if ((this.event.region_id !== 1 && this.getDbUser.region_id !== 1) && this.getDbUser.region_id !== this.event.region_id) {
                            if (this.getDbUser.role_id === CONSTANTS.ROLE.MODERATOR) {
                                // Moderator can't edit events from another region

                                this.canModerateEvent = false
                                this.canDeleteEvent = false
                                this.canBlockUser = false
                                return
                            }
                        }

                        this.canEditEventDuration = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_DURATION)
                        this.canEditEventCategory = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_CATEGORY)
                        this.canEditEventName = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_NAME)
                        this.canEditEventDescription = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION)
                        this.canEditEventStartDate = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_START_DATE)
                        this.canEditEventEndDate = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_END_DATE)
                        this.canEditEventNameVisibility = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_NAME_VISIBILITY)
                        this.canEditEventDescriptionVisibility = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION_VISIBILITY)
                        break;
                }
            },
            getDateFormatFromIso(val) {

                if (val !== null) {
                    let date = new Date(val);
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let dd = date.getDate();
                    let HH = date.getHours();
                    let mm = date.getMinutes();

                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }
                    if (HH < 10) {
                        HH = '0' + HH;
                    }
                    if (mm < 10) {
                        mm = '0' + mm;
                    }

                    // console.log(HH + ' : ' + mm)
                    return year + '-' + month + '-' + dd + ' ' + HH + ':' + mm
                } else {
                    return ''
                }
            },
        },
        computed: {
            // смешиваем результат mapGetters с внешним объектом computed
            ...mapGetters([
                'loggedIn',
                'getCurrentState',
                'getEditedPointFeature',
                'getEditedPointFeatureAddress',
                'getEditedEvent',
                'getDbUser',
                'isMobile',
                'getExtUser',
                'getUserLocationAddress'
            ])
        },
        beforeDestroy() {
            this.unsubscribe();
        }
    }

</script>

<style scoped>
  #search-address .v-input__control .v-text-field__details {
    display: none;
  }

  div.v-text-field .v-text-field--enclosed .v-text-field__details {
    margin: 0;
  }

</style>
