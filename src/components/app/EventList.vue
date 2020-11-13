<template>
    <v-container style="height: 100%;overflow: hidden">
        <v-row class="mx-1">
            <v-col align="left" class="pa-0 pb-1 ma-0" cols="4">
                <v-btn @click.stop="closeOrOpenLeftPanel()" color="primary" icon v-show="isMobile" x-large>
                    <!--          <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>-->
                    <!--          <v-icon>mdi-code-less-than</v-icon>-->
                    <v-icon>mdi-arrow-left-thick</v-icon>
                </v-btn>
            </v-col>
            <v-col align="right" class="pa-0 px-1 pb-1 ma-0" cols="8">
                <v-btn :disabled="loadingData" @click="startAddEvent()" class="ma-2" color="green accent-4" dark
                       outlined>
                    {{ $t("message.add") }}
                </v-btn>
            </v-col>
        </v-row>
        <v-col class="py-0 my-0 pt-2" cols="12" md="12">
            <v-text-field :error-messages="msgNoMatch"
                          :label="$t('message.search')"
                          class="ma-0 pa-0"
                          dense
                          outlined
                          v-model="searchEvent">
            </v-text-field>
        </v-col>
        <v-row class="px-4 pr-4 pb-2">
            <v-col class="pa-0 px-2 ma-0" cols="12" md="6" sm="12">
                <v-label>{{ $t('message.start') }}</v-label>
                <flat-pickr :config="dateTimePickerConfig" :disabled="!isDateFilterEnabled"
                            class="date-picker-border"
                            v-model="startDate">
                </flat-pickr>
            </v-col>
            <v-col class="pa-0 px-2 ma-0" cols="12" md="6" sm="12">
                <v-label>{{ $t('message.end') }}</v-label>
                <flat-pickr :config="dateTimePickerConfig" :disabled="!isDateFilterEnabled"
                            class="date-picker-border"
                            v-model="endDate">
                </flat-pickr>
            </v-col>
        </v-row>
        <v-col class="pb-0 mb-0" cols="12" md="12">
            <v-select
                :items="getDbUser ? statusList : statusListForAnonymous"
                :label="$t('filter.lbStatus')"
                @change="filterChanged()"
                dense
                hide-details
                item-text="title"
                item-value="id"
                outlined
                return-object
                v-model="filterStatus"
            ></v-select>
            <!-- <v-checkbox hide-details v-model="isActive" @change="filterChanged()" class="mx-2 my-0"
                         :label="$t('message.onlyActive')"></v-checkbox>
             <v-checkbox :disabled="!this.loggedIn" :label="$t('message.myOwnEvents')" @change="filterChanged()"
                         class="mx-2 my-0"
                         hide-details
                         v-model="isOwn"></v-checkbox>
             <v-checkbox v-if="this.loggedIn" :label="$t('message.forModeration')"
                         @change="filterChanged()"
                         hide-details
                         class="mx-2 my-0" color="red"
                         v-model="isModerated"></v-checkbox>-->
        </v-col>
        <v-col align="right" class="pa-0 px-1 py-2 ma-0" cols="12">
            <v-btn @click="showAllEvents()" class="ma-2" color="red" dark outlined
                   v-show="getEventIdFromPath != null">
                {{ $t("message.showAllEvents") }}
            </v-btn>
        </v-col>


        <v-divider></v-divider>
        <div class="listScroll">
            <v-list dense>
                <v-list-group :key="category.id"
                              :value="category.active"
                              class="ml-0"
                              no-action
                              v-for="(category, i) in categoriesWithEvents">
                    <!--                v-show="category.events.length > 0">-->
                    <template v-slot:activator>
                        <v-list-item-action @click.stop="" class="mr-2">
                            <v-checkbox @change="changeCategories(category)" class="mr-0"
                                        color="primary"
                                        v-model="categories[i].is_visible">
                            </v-checkbox>
                        </v-list-item-action>
                        <v-list-item-icon>
                            <img :src="iconsUrl[category.id]" height="32" width="32">
                        </v-list-item-icon>
                        <v-badge :content="category.events.length ? category.events.length : '0'" color="green accent-4"
                                 offset-x="10"
                                 offset-y="-1"
                                 v-show="category.events.length">
                        </v-badge>
                        <v-list-item-content class="ml-6">
                            <v-list-item-title style="font-size: 16px; font-weight: 400"> {{ getCategoryById(category.id).title }}
                            </v-list-item-title>
                        </v-list-item-content>

                    </template>

                    <v-list-item-group color="primary">
                        <v-list-item :class="getRole() ? 'pl-6 ml-4 mr-0 pr-3': 'pl-12 ml-4 mr-0 pr-3'"
                                     :id="'event_' + event.id" :key="k"
                                     style="height: 36px"
                                     v-for="(event, k) in category.events"
                                     v-model="event.active">
                            <v-subheader v-if="getRole()">ID:{{ event.id }}</v-subheader>
                            <v-list-item-content @click="eventClicked(event.geojson, event)" class="pointer">
                                <v-list-item-title style="font-size: 16px; font-weight: 400" v-text="event.name"></v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <img :src="getStatus(event)" color="green" height="16" style="margin: 4px" width="16">
                            </v-list-item-icon>
                            <v-list-item-action @click.stop="editEvent(event)"
                                                v-if="(canPreviewEventEditing || (getDbUser && getDbUser.id === event.user_id)) &&
                                        (getDbUser.region_id === event.region_id || (getDbUser.region_id === 1 || event.region_id === 1))  ">
                                <v-btn class="mx-2" icon x-small>
                                    <v-icon color="amber">mdi-circle-edit-outline</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <!--    <v-list-item-action @click.stop="eventInfo()" class="mx-0">
                                  <v-btn icon>
                                    <v-icon color="light-blue">mdi-information</v-icon>
                                  </v-btn>
                                </v-list-item-action>-->
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
            </v-list>
            <!-- <v-row justify="center" class="mt-8" v-show="filteredEvents.length === 0">
               {{$t("message.noMatches")}}
             </v-row>-->
        </div>

    </v-container>
</template>

<script>
import {CONSTANTS} from "../../utils/constants";
import {mapGetters} from "vuex";
import flatpickr from 'vue-flatpickr-component'
import messages from "../../utils/messages";
import * as authUtils from "../../utils/auth-utils";
// import messages from "../../utils/messages";

let self
let isFirst = null
// eslint-disable-next-line no-unused-vars

export default {
    name: "EventList",
    components: {
        'flat-pickr': flatpickr,
    },
    data: function () {
        self = this
        return {
            isFirst: true,
            dateTimePickerConfig: {
                locale: {
                    localize: localStorage.getItem('cur_lang')
                },
                time_24hr: true,
                tdateFormat: 'H:i',
                enableTime: true,
                // eslint-disable-next-line no-unused-vars
                onClose: function (selectedDates, dateStr, instance) {
                    self.filterChanged()
                }
            },
            selectedEvent: {id: 0, category_id: 0},
            statusList: [
                {id: 1, title: this.$t('filter.statusActual')},
                {id: 2, title: this.$t('filter.statusAll')},
                {id: 3, title: this.$t('filter.statusMyEvents')},
                {id: 4, title: this.$t('filter.statusForModeration')},
            ],
            statusListForAnonymous: [
                {id: 1, title: this.$t('filter.statusActual')},
                {id: 2, title: this.$t('filter.statusAll')},
            ],
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
            searchEvent: '',
            startDate: this.getDateWithoutTime(new Date()),
            endDate: this.getDateWithCustomTime(new Date(), 23, 59),
            filterStatus: {id: 1},
            startDateMenu: false,
            endDateMenu: false,
            categoriesCheck: [],
            iconsUrl: CONSTANTS.ICONS_URL,
            statusIcon: {
                forModeration: require('../../assets/icons/m.png'),
                actual: require('../../assets/icons/actual.png'),
                notActual: require('../../assets/icons/notActive.png'),
                rejected: require('../../assets/icons/rejected.png'),
            },
            categories: [],
            msgNoMatch: '',
            isActive: true,
            isOwn: false,
            isModerated: false,

            loadingData: true,
            intervalPermissionsUpdate: null,
            intervalEventsUpdate: null,
            intervalDbUserUpdate: null,
            events: [],
            canModerateEvent: null,
            canPreviewEventEditing: false,
            isDateFilterEnabled: false,
        }
    },
    watch: {
        searchEvent(val) {
            if (parseInt(val)) {
                this.loadEventsFromDb()
            } else {
                if (val.length > 2 || val.length === 0) {
                    this.loadEventsFromDb()
                }
            }
            this.updateFilterParams()
        },
        startDate() {
            this.updateFilterParams()
        },
        endDate() {
            this.updateFilterParams()
        },
        events() {
            let events = this.events
            if (events) {
                let eventId = localStorage.getItem('selectedEventId')

                let eventName = localStorage.getItem('selectedEventName')
                let dateStart = localStorage.getItem('selectedEventDateStart')
                this.startDate = dateStart ? dateStart : this.startDate
                this.searchEvent = eventName ? eventName : this.searchEvent

                if (eventId && isFirst === false) {
                    if (this.filterStatus.id !== 2) {
                        this.filterStatus = {id: 2}
                        this.filterChanged()
                    }

                    let selectedEvent = events.find(x => x.id === parseInt(eventId))
                    console.log(selectedEvent)
                    if (selectedEvent) {
                        this.eventClicked(selectedEvent.geojson, selectedEvent)
                        this.msgNoMatch = this.events.length === 0 ? this.$t("message.noMatches") : ''
                        localStorage.removeItem('selectedEventId')
                        localStorage.removeItem('selectedEventName')
                        localStorage.removeItem('selectedEventDateStart')

                    }

                }
            }

        },
    },
    updated: function () {
        this.$nextTick(function () {

            // console.log('update')
            if (this.selectedEvent.category_id !== 0) {
                this.centeringListScroll(this.selectedEvent.id)
            }
        })
    },
    computed: {
        // смешиваем результат mapGetters с внешним объектом computed
        ...mapGetters([
            'loggedIn',
            'isMobile',
            'getEvents',
            'getFilterParams',
            'getCurrentState',
            'getExtUser',
            'getDbUser',
            'getSelectedFeature',
            'getUserPermissions',
            'getEventIdFromPath'
        ]),
        categoriesWithEvents() {
            let categories = this.$store.getters.getCategories
            // console.log('categoriesWithEvents')

            // console.log(isFirst)
            if (categories !== null) {
                // console.log(this.selectedEvent)
                self.categories = categories

                for (let key in categories) {
                    let cId = 0
                    categories[key].events = this.events.filter(event => {

                        if (this.selectedEvent) {
                            if (this.selectedEvent.id === event.id) {
                                cId = event.category_id
                                event.active = true
                            } else {
                                event.active = false
                            }
                        }
                        return event.category_id === categories[key].id
                    })
                    categories[key].active = !isFirst ? cId === categories[key].id : true
                    categories[key].action = key
                }
                if (isFirst) {
                    this.filterChanged()
                    self.isFirst = isFirst = false
                }
                // console.log(this.categories)
            }
            return categories
        },
        filteredEvents() {
            let filteringItems = this.events

            /*

                            for(let key in this.events){
                                eventsObj[key.id] = key
                            }
                            eventsObj[this.selselectedEvent.id]*/

            if (this.searchEvent !== '') filteringItems = filteringItems.filter(event => {
                return event.name.toLowerCase().indexOf(this.searchEvent.toLowerCase()) > -1
            })
            return filteringItems
        },
    },
    created() {
        // console.log('create')
        this.subscribeToEventsLoad()
        this.loadData()
        isFirst = true
        // console.log(this.getFilterParams)
        if (this.getFilterParams) {
            this.searchEvent = this.getFilterParams.searchEvent
            this.startDate = this.getFilterParams.startDate
            this.endDate = this.getFilterParams.endDate
            this.filterStatus = this.getFilterParams.filterStatus
        }

    },
    mounted() {
        self = this
        // console.log('mounted')
        this.onChangeLang()
    },
    methods: {
        showAllEvents() {
            this.$router.push('/').then(function () {
                location.reload()
            })
            // window.location.reload()
            this.$store.dispatch('SET_EVENT_ID_FROM_PATH', null)
        },
        getCategoryById(cid) {
            return this.categoriesForLang.find(x => x.id === cid);
        },
        updateFilterParams() {
            let filter_params = {
                searchEvent: this.searchEvent,
                startDate: this.startDate,
                endDate: this.endDate,
                filterStatus: this.filterStatus
            }
            this.$store.dispatch('SET_FILTER_PARAMS', filter_params)
        },
        closeOrOpenLeftPanel() {
            this.$store.dispatch('SET_IS_LEFT_PANEL_OPEN', !this.$store.getters.getIsLeftPanelOpen)
        },
        getRole() {
            return this.getDbUser ? this.getDbUser.role_id < 4 : false
        },
        getStatus(event) {
            if (event.is_moderated == null) {
                return this.statusIcon.forModeration
            } else if (event.is_moderated) {
                if (event.is_active) return this.statusIcon.actual
                else return this.statusIcon.notActual
            } else {
                return this.statusIcon.rejected
            }
        },
        onChangeLang: function () {
            // console.log('onChangeLanguage');
            // Change array Locale

            //statusList
            this.statusList = [
                {id: 1, title: this.$t('filter.statusActual')},
                {id: 2, title: this.$t('filter.statusAll')},
                {id: 3, title: this.$t('filter.statusMyEvents')},
                {id: 4, title: this.$t('filter.statusForModeration')},
            ]
            this.statusListForAnonymous = [
                {id: 1, title: this.$t('filter.statusActual')},
                {id: 2, title: this.$t('filter.statusAll')},
            ]
            //categoriesForLang
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

            //msgNoMatch lang change
            this.msgNoMatch = this.events.length === 0 && this.searchEvent.length > 0 ? this.$t("message.noMatches") : ''
        },
        async loadData() {
            if (this.getExtUser) {
                if (this.getDbUser) {
                    if (this.getEvents && this.getUserPermissions) {
                        this.loadEventsFromStore()
                    } else {
                        await this.$store.dispatch('GET_USER_PERMISSIONS', this.getDbUser.id)
                        // console.log('if getDbUser > loadEventsFromDb')

                        this.loadEventsFromDb()
                    }
                    this.setUserPermissions()
                } else {
                    // console.log('else getDbUser > loadEventsFromDb')
                    await this.loadUserData()
                    this.loadEventsFromDb()
                    this.setUserPermissions()
                }
                this.setPeriodicDataUpdate()
            } else {
                console.log('EVENT LIST ANONYMOUS USER')
                this.loadEventsFromDb()
            }
        },
        async loadUserData() {
            await this.$store.dispatch('GET_USER_BY_EXT_ID', this.getExtUser.id).then(async dbUser => {
                if (dbUser) {
                    if (dbUser.is_blocked) {
                        // eslint-disable-next-line no-unused-vars
                        await this.$store.dispatch('LOGOUT').then(res => {
                            this.$router.push('/login')
                            this.$message(messages['logout'])
                        });
                    } else {
                        if (authUtils.tokenDateIsExpired(JSON.parse(this.getExtUser.auth_date))) {
                            await this.$router.push('/login')
                            this.$message(messages['logout'])
                        } else {
                            await this.$store.dispatch('SET_DB_USER', dbUser)
                            await this.$store.dispatch('GET_USER_PERMISSIONS', this.getDbUser.id)
                        }
                    }
                }
            }, error => {
                console.log('GET_USER_BY_EXT_ID -- ERROR : ' + error)
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
            })
        },
        loadEventsFromDb() {
            // console.log('loadEventsFromDb')
            this.loadingData = true
            let payload

            let userId = 0;
            let roleId = 0;
            let startDate = this.getDate(this.startDate);
            let endDate = this.getDate(this.endDate);
            let userRegionId = 1;
            let searchText = this.searchEvent;

            if (this.loggedIn && this.getDbUser) {
                roleId = this.getDbUser.role_id

                // console.log(this.getDbUser.region_id)
                userRegionId = this.getDbUser.region_id
            }

            if (this.getDbUser && userId === 0) {
                if ((this.getDbUser.role_id === CONSTANTS.ROLE.USER || this.getDbUser.role_id === CONSTANTS.ROLE.TRUSTED_USER) &&
                    (this.filterStatus.id === CONSTANTS.FILTER_STATUS.OWN || this.filterStatus.id === CONSTANTS.FILTER_STATUS.MODERATING)) {
                    userId = this.getDbUser.id
                }
                if ((this.getDbUser.role_id === CONSTANTS.ROLE.MODERATOR ||
                    this.getDbUser.role_id === CONSTANTS.ROLE.ADMINISTRATOR ||
                    this.getDbUser.role_id === CONSTANTS.ROLE.SYSTEM_ADMINISTRATOR) &&
                    (this.filterStatus.id === CONSTANTS.FILTER_STATUS.OWN)) {
                    userId = this.getDbUser.id
                }
            }

            payload = {
                'userId': userId,
                'roleId': roleId,
                'categoryId': 0,
                'filterStatusId': this.filterStatus.id,
                'startDate': startDate,
                'endDate': endDate,
                'userRegionId': userRegionId,
                'searchText': searchText
            }

            if (this.getEventIdFromPath) {
                this.$store.dispatch('GET_EVENT_BY_ID', this.getEventIdFromPath)
            } else {
                this.$store.dispatch('GET_EVENTS', payload)
            }
        },
        setPeriodicDataUpdate() {
            this.intervalPermissionsUpdate = setInterval(function () {
                this.periodicPermissionsUpdate();
            }.bind(this), 1000 * 60); // every 1 minute reload user permissions

            if (this.getDbUser && this.getDbUser.role_id === CONSTANTS.ROLE.USER) {
                this.intervalDbUserUpdate = setInterval(function () {
                    this.$userRoleUpdate();
                }.bind(this), 1000 * 7); // every 1 minute reload user
            }

            this.intervalEventsUpdate = setInterval(function () {
                this.periodicEventUpdate();
            }.bind(this), 1000 * 60 * 3); // every 3 minute reload events
        },
        periodicPermissionsUpdate() {
            if (this.getDbUser) {
                this.$store.dispatch('GET_USER_PERMISSIONS', this.getDbUser.id)
            }
        },
        periodicEventUpdate() {
            // if (this.getDbUser) {
            //   console.log('periodicEventUpdate > loadEventsFromDb')

            this.loadEventsFromDb()
            // }
        },
        getCategoryActive(category) {
            console.log('getCategoryActive')
            console.log(category)
            if (this.selectedEvent) {
                return category.id === this.selectedEvent.category_id
            } else {
                return false
            }
        },
        subscribeToEventsLoad() {
            this.unsubscribe = this.$store.subscribe((mutation, state) => {
                switch (mutation.type) {
                    case 'STATE_CHANGED':
                        this.stateProcessing(state.appStates.currentState)
                        break;
                    case 'SET_EVENTS':
                        this.loadEventsFromStore()
                        this.loadCategoriesFromDb()
                        this.setUserPermissions()

                        this.loadingData = false
                        break;
                    case 'SET_SELECTED_FEATURE':
                        // console.log('SET_SELECTED_FEATURE')
                        // console.log(this.getSelectedFeature)
                        if (this.getSelectedFeature) {
                            this.selectedEvent = this.getSelectedFeature.values_
                            this.selectedEvent.id = this.getSelectedFeature.id_
                            this.selectedEvent.active = true

                        }
                        break;
                    case 'APP_LANG':
                        // console.log('APP_LANG')
                        this.onChangeLang()
                        break;
                    case 'SET_EVENT_ID_FROM_PATH':
                        // console.log('SET_EVENT_ID_FROM_PATH')
                        // console.log(this.getEventIdFromPath)
                        break;
                }
            });
        },
        centeringListScroll(id) {
            if (id) {
                let selectScroll = document.getElementById('event_' + id);
                // console.log(selectScroll)
                selectScroll.scrollIntoView({
                    block: 'center',
                });
            }

        },
        stateProcessing(appState) {
            switch (appState) {
                case CONSTANTS.APP_STATE.DEFAULT:
                    // console.log('DEFAULT state event list')
                    this.defaultState();
                    break;
                case CONSTANTS.APP_STATE.ADD_EVENT:
                    this.addEventState();
                    break;
                case CONSTANTS.APP_STATE.EDIT_EVENT:
                    this.editEventState()
                    break;
                case CONSTANTS.APP_STATE.CANCEL_ADD_EVENT:
                    this.cancelAddEventState()
                    break;
                case CONSTANTS.APP_STATE.CANCEL_EDIT_EVENT:
                    break;
            }
        },
        async defaultState() {
            // console.log('defaultState > loadEventsFromDb')
            this.loadEventsFromDb()
        },
        addEventState() {
            // this.$toast.success('Event list addEventState')
        },
        editEventState() {
            // this.$toast.warning('Event list editEventState')
        },
        cancelAddEventState() {
            // this.$toast.warning('Event list cancelAddEventState')
        },
        eventClicked(geojson, event) {
            this.selectedEvent = event
            let coordinates = JSON.parse(geojson).geometry.coordinates
            this.$root.$emit('eventSelected', coordinates, event.id, event.category_id)
            if (this.isMobile) {
                this.closeOrOpenLeftPanel()
            }
        },
        editEvent(event) {
            // console.log(this.$getPermission(CONSTANTS.PERMISSION.PREVIEW_EVENT_EDITING))
            // console.log(event)
            if (this.getDbUser && this.getDbUser.id === event.user_id) {
                this.$store.dispatch("SET_EDITED_EVENT", event)
                this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.EDIT_EVENT)
            } else {
                if (this.$getPermission(CONSTANTS.PERMISSION.PREVIEW_EVENT_EDITING)) {
                    this.$store.dispatch("SET_EDITED_EVENT", event)
                    this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.EDIT_EVENT)
                } else {
                    this.$toast.warning('No Permission for role')

                    if (this.getDbUser.role_id === CONSTANTS.ROLE.USER ||
                        this.getDbUser.role_id === CONSTANTS.ROLE.TRUSTED_USER) {
                        this.$router.push('/login?message=new_user_add')
                    }
                }
            }
        },
        eventInfo() {
            // this.$toast.success('event Info')
        },
        async startAddEvent() {
            if (this.getDbUser && this.getDbUser.role_id === CONSTANTS.ROLE.USER) {
                await this.$userRoleUpdate()
            }

            if (this.$getPermission(CONSTANTS.PERMISSION.ADD_EVENT)) {
                // console.log('START CONSTANTS.APP_STATE.ADD_EVENT')
                await this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.ADD_EVENT)
            } else {
                if (this.getExtUser) {
                    this.$toast.warning('No Permission for role')
                } else {
                    this.$notification(this.$t('notification.youNeedRegister'))
                    await this.$router.push('/login?message=new_user_add')
                }

            }
        },
        cancelAdding() {
            this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.CANCEL_ADD_EVENT)

        },
        filterChanged() {
            // console.log(this.filterStatus.id)
            this.updateFilterParams()

            switch (this.filterStatus.id) {
                case CONSTANTS.FILTER_STATUS.ACTUAL:
                    this.isDateFilterEnabled = false
                    break;
                case CONSTANTS.FILTER_STATUS.ALL:
                    this.isDateFilterEnabled = true
                    break;
                case CONSTANTS.FILTER_STATUS.OWN:
                    this.isDateFilterEnabled = false
                    break;
                case CONSTANTS.FILTER_STATUS.MODERATING:
                    this.isDateFilterEnabled = true
                    break;
            }
            // console.log('filterChanged > loadEventsFromDb')

            this.loadEventsFromDb()
        },
        changeCategories(category) {
            // console.log('changeCategories')
            //
            // console.log(category.is_visible)
            // console.log(this.categories)

            this.$root.$emit('categoryChecked', category.id, category.is_visible)

            this.$store.dispatch("SET_CATEGORIES", this.categories)
        },
        async loadCategoriesFromDb() {
            // console.log('loadCategoriesFromDb')
            await this.$store.dispatch('GET_CATEGORIES')
        },
        loadEventsFromStore() {
            // console.log(this.getEvents)
            this.events = this.getEvents
            this.msgNoMatch = this.events.length === 0 && this.searchEvent !== '' ? this.$t("message.noMatches") : ''
            /*  if (this.getEventIdFromPath){
                  this.eventClicked(this.getEvents[0].geojson, this.getEvents)
              }*/
            this.loadingData = false
        },
        setUserPermissions() {
            this.canModerateEvent = this.$getPermission(CONSTANTS.PERMISSION.MODERATE_EVENT)

            this.canPreviewEventEditing = this.$getPermission(CONSTANTS.PERMISSION.PREVIEW_EVENT_EDITING)

            if (this.getDbUser) {
                switch (this.getDbUser.role_id) {
                    case CONSTANTS.ROLE.SYSTEM_ADMINISTRATOR:
                        this.canPreviewEventEditing = true
                        break;
                    case CONSTANTS.ROLE.ADMINISTRATOR:
                        this.canPreviewEventEditing = true
                        break;
                    case CONSTANTS.ROLE.MODERATOR:


                        this.canPreviewEventEditing = true
                        break;
                }
            }
        }

    },
    beforeDestroy() {
        this.unsubscribe();
        clearInterval(this.intervalPermissionsUpdate);
        clearInterval(this.intervalEventsUpdate);
        clearInterval(this.intervalDbUserUpdate);
    },

}

</script>

<style>

.listScroll {
    height: calc(100% - 275px);
    overflow-y: auto;
    overflow-x: hidden
}

div.v-list-group .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
    min-width: 42px;
}

div.v-list-item {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 36px;
    outline: none;
    padding: 0 16px;
    position: relative;
    text-decoration: none;
}

.date-picker-border {
    border: 1px solid #868686 !important;
    border-radius: 5px;
    padding: 3px 12px !important;
    width: 100%;
}

</style>
