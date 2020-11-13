<template>
  <v-container class="px-5" v-resize="onResize">
    <v-row class="mx-2">
      <v-col>
        <div class="text-h4 textGrey--text">
          {{$t('menu.events')}}
        </div>
      </v-col>
    </v-row>

    <div class="elevation-1 white" id="event-filter-panel" v-show="windowSize.x > 500">
      <div class="text-h6 mx-0 pt-2 px-7 ">{{$t('message.filter')}}</div>
      <v-row align="center" class=" mx-0  mb-0 px-4" style="border-radius: 4px">
        <v-col class="pt-0" cols="8" md="9">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                      :label="'ID | '+ $t('message.topic') + ' | ' + $t('message.description') + ' | '+ $t('message.userName') "
                      @keyup.enter="getEventsFromDB()"
                      append-icon="mdi-magnify"
                      dense
                      hide-details
                      outlined
                      single-line
                      v-model="search"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <flat-pickr :config="dateTimePickerConfig" :placeholder="$t('message.interval')"
                          class="date-picker-border py-4 app text--primary"
                          v-model="dateRange">
              </flat-pickr>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                      :filter="customFilter"
                      :items="categoriesForLang"
                      :label="$t('message.categories')"
                      dense
                      hide-details
                      item-text="title"
                      item-value="id"
                      outlined
                      v-model="categoryId">

                <template v-slot:selection="data">
                  <v-avatar class="mr-2" left size="25" v-show="data.item.id !== 0">
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
                      <img :src="icons_url[data.item.id]" v-show="data.item.id !== 0" width="25">
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title style="font-size: 16px" v-html="data.item.title"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                      :filter="customFilter"
                      :items="statusList"
                      :label="$t('message.status')"
                      dense
                      hide-details
                      item-text="title"
                      item-value="value"
                      outlined
                      placeholder=""
                      v-model="selectedStatus">

              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                      :filter="customFilterRegion"
                      :items="regions"
                      :label="$t('menu.region')"
                      dense
                      hide-details
                      item-text="name"
                      item-value="id"
                      outlined
                      v-model="selectedRegion">
              </v-autocomplete>
            </v-col>

          </v-row>
        </v-col>
        <v-col class="text-right" cols="4" md="3">
          <v-btn @click="apply()" class="primary">{{$t('message.apply')}}</v-btn>
          <v-btn @click="clearFilter()" class="ml-2">{{$t('message.clear')}}</v-btn>
        </v-col>
      </v-row>
    </div>
    <v-expansion-panels v-model="filterPanel" v-show="windowSize.x < 500">
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-0 px-3">

          <div class="title textGrey--text"> <v-icon class="pb-1 px-1">mdi-filter-variant</v-icon><span>{{$t('message.filter')}}</span></div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row align="center" class=" mx-0  mb-0 px-4" style="border-radius: 4px">
            <v-col cols="12" md="9">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                          :label="'ID | '+ $t('message.topic') + ' | ' + $t('message.description') + ' | '+ $t('message.userName') "
                          @keyup.enter="getEventsFromDB()"
                          append-icon="mdi-magnify"
                          dense
                          hide-details
                          outlined
                          single-line
                          v-model="search"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <flat-pickr :config="dateTimePickerConfig" :placeholder="$t('message.interval')"
                              class="date-picker-border py-4 app text--primary"
                              v-model="dateRange">
                  </flat-pickr>
                </v-col>
                <v-col cols="12" md="4">
                  <v-autocomplete
                          :filter="customFilter"
                          :items="categoriesForLang"
                          :label="$t('message.categories')"
                          dense
                          hide-details
                          item-text="title"
                          item-value="id"
                          outlined
                          v-model="categoryId">

                    <template v-slot:selection="data">
                      <v-avatar class="mr-2" left size="25" v-show="data.item.id !== 0">
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
                          <img :src="icons_url[data.item.id]" v-show="data.item.id !== 0" width="25">
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title style="font-size: 16px" v-html="data.item.title"></v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </template>
                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4">
                  <v-autocomplete
                          :filter="customFilter"
                          :items="statusList"
                          :label="$t('message.status')"
                          dense
                          hide-details
                          item-text="title"
                          item-value="value"
                          outlined
                          placeholder=""
                          v-model="selectedStatus">

                  </v-autocomplete>
                </v-col>
                <v-col cols="12" md="4">
                  <v-autocomplete
                          :filter="customFilterRegion"
                          :items="regions"
                          :label="$t('menu.region')"
                          dense
                          hide-details
                          item-text="name"
                          item-value="id"
                          outlined
                          v-model="selectedRegion">
                  </v-autocomplete>
                </v-col>

              </v-row>
            </v-col>
            <v-col class="text-center py-0 pb-2" cols="12" md="3">
              <v-btn @click="apply()" class="primary">{{$t('message.apply')}}</v-btn>
              <v-btn @click="clearFilter()" class="ml-2">{{$t('message.clear')}}</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>


    <v-data-table
            :headers="headers"
            :height="events.length < itemsPerPage && windowSize.x > 500  ? '' : getTableHeight()"
            :items="events"
            :items-per-page="itemsPerPage"
            :sort-desc.sync="isDesc"
            calculate-widths
            class="elevation-1 mt-4"
            fixed-header
            :no-data-text="$t('message.noData')"
            hide-default-footer
            id="events-table">

      <template v-slot:item.id="{ item }">
        <div style="min-width: 10px; max-width: 30px">
          <span class="mx-2">{{item.id}}</span>
        </div>
      </template>
      <template v-slot:item.name="{ item }">
        <div style="max-width: 250px; display: flex; align-items: center">
          <v-avatar class=" ma-0 pa-0" left size="25" v-show="item.category_id !== 0">
            <v-img :src="icons_url[item.category_id]"></v-img>
          </v-avatar>
          <span class="mx-2 pa-1">{{item.name}}</span>
        </div>
      </template>
      <template v-slot:item.description="{ item }">
        <div class="mx-2" style="max-width: 200px">{{addSpaceByLimit(item.description, ' ', 25)}}</div>
      </template>
      <template v-slot:item.reg_date="{ item }">
        <div style="min-width: 110px; max-width: 145px">{{getDateFormatFromIso(item.reg_date)}}</div>
      </template>
      <template v-slot:item.start_date="{ item }">
        <div style="min-width: 110px; max-width: 145px">{{getDateFormatFromIso(item.start_date)}}</div>
      </template>
      <template v-slot:item.end_date="{ item }">
        <div style="min-width: 110px; max-width: 145px">{{getDateFormatFromIso(item.end_date)}}</div>
      </template>
      <template v-slot:item.is_moderated="{ item }">
        <img :src="getStatus(item)" color="green" height="16" style="margin: 4px" width="16">
      </template>
      <template v-slot:item.actions="{ item }">
        <div style="min-width: 60px; max-width: 70px">

          <v-icon @click="viewEvent(item)"
                  class="mr-2">
            mdi-comment-arrow-right-outline
          </v-icon>
          <v-icon @click="goto(item)">
            mdi-telegram
          </v-icon>
        </div>
      </template>
    </v-data-table>
    <div class="text-center pt-4">
      <v-pagination :length="pageCount" total-visible="7" v-model="page"></v-pagination>
    </div>
  </v-container>
</template>

<script>
    import axios from "../../plugins/api-axios";
    import {CONSTANTS} from "../../utils/constants";
    import {mapGetters} from "vuex";
    import flatpickr from 'vue-flatpickr-component'

    // eslint-disable-next-line no-unused-vars
    let self = null

    export default {
        name: "Events",
        data() {
            self = this
            return {
                windowSize: {
                    x: 0,
                    y: 0,
                },
                filterPanelHeight: 0,
                filterPanel: null,
                dateTimePickerConfig: {
                    mode: "range",
                    dateFormat: 'yy-m-d',
                    firstDayOfWeek: 1,
                    locale: localStorage.getItem('cur_lang'),
                    weekNumbers: true
                },
                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                sortName: ['id'],
                isDesc: false,
                dialog: false,
                search: '',
                categoryId: 0,
                userId: 0,
                selectedStatus: '0',
                selectedRegion: 0,
                dateRange: '',
                statusList: [
                    {value: '0', title: this.$t('category.all')},
                    {value: 'A', title: 'Active'},
                    {value: 'D', title: 'Delete'},
                ],
                regions: [],
                categoriesForLang: [
                    {id: 0, title: this.$t('category.all')},
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
                icons_url: CONSTANTS.ICONS_URL,
                headers: [
                    {text: 'ID', align: 'start', sortable: true, value: 'id',},
                    {text: this.$t('message.topic'), align: 'start', sortable: true, value: 'name',},
                    {text: this.$t('message.description'), value: 'description'},
                    {text: this.$t('headerEventTable.created'), value: 'reg_date'},
                    {text: this.$t('message.start'), value: 'start_date'},
                    {text: this.$t('message.end'), value: 'end_date'},
                    {text: this.$t('message.userName'), value: 'user_full_name'},
                    {text: this.$t('menu.role'), value: 'role_name'},
                    {text: this.$t('headerEventTable.status'), align: 'center', value: 'status'},
                    {text: this.$t('message.eventStatusIsModerating'), align: 'center', value: 'is_moderated'},
                    {text: this.$t('menu.region'), value: 'region_name'},
                    {text: this.$t('headerEventTable.responseCount'), align: 'center', value: 'responses_count'},
                    {text: this.$t('headerEventTable.actions'), align: 'center', value: 'actions', sortable: false},
                ],
                statusIcon: {
                    forModeration: require('../../assets/icons/m.png'),
                    actual: require('../../assets/icons/actual.png'),
                    notActual: require('../../assets/icons/notActive.png'),
                    rejected: require('../../assets/icons/rejected.png'),
                },
                events: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
                defaultItem: {
                    name: '',
                    calories: 0,
                    fat: 0,
                    carbs: 0,
                    protein: 0,
                },
            }
        },
        components: {
            'flat-pickr': flatpickr,
        },
        methods: {
            initialize() {
                this.getEventsFromDB()
                this.getRegionsFromDB()
            },
            subscribeToAppStateChanged() {
                this.unsubscribe = this.$store.subscribe((mutation) => {
                    switch (mutation.type) {
                        case 'APP_LANG':
                            // console.log('APP_LANG')
                            this.onChangeLang()
                            break;
                    }
                });
            },
            onChangeLang: function () {
                // Change array Locale
                // categoriesForLang
                this.categoriesForLang = [
                    {id: 0, title: this.$t('category.all')},
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
                this.statusList = [
                    {value: '0', title: this.$t('category.all')},
                    {value: 'A', title: 'Active'},
                    {value: 'D', title: 'Delete'},
                ]
                this.getRegionsFromDB()

                this.dateTimePickerConfig = {
                    mode: "range",
                    dateFormat: 'yy-m-d',
                    firstDayOfWeek: 1,
                    locale: localStorage.getItem('cur_lang'),
                    weekNumbers: true
                }
                this.headers = [
                    {text: 'ID', align: 'start', sortable: true, value: 'id',},
                    {text: this.$t('message.topic'), align: 'start', sortable: true, value: 'name',},
                    {text: this.$t('message.description'), value: 'description'},
                    {text: this.$t('headerEventTable.created'), value: 'reg_date'},
                    {text: this.$t('message.start'), value: 'start_date'},
                    {text: this.$t('message.end'), value: 'end_date'},
                    {text: this.$t('message.userName'), value: 'user_full_name'},
                    {text: this.$t('menu.role'), value: 'role_name'},
                    {text: this.$t('headerEventTable.status'), align: 'center', value: 'status'},
                    {text: this.$t('message.eventStatusIsModerating'), align: 'center', value: 'is_moderated'},
                    {text: this.$t('menu.region'), value: 'region_name'},
                    {text: this.$t('headerEventTable.responseCount'), align: 'center', value: 'responses_count'},
                    {text: this.$t('headerEventTable.actions'), align: 'center', value: 'actions', sortable: false},
                ]
            },
            onResize() {
                // console.log('on resize')
                let filterPanelHeight =  document.getElementById('event-filter-panel')
                this.filterPanelHeight = filterPanelHeight.offsetHeight;

                this.windowSize = {x: window.innerWidth, y: window.innerHeight}
            },

            // eslint-disable-next-line no-unused-vars
            customFilter(item, queryText, itemText) {
                const textOne = item.title.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1
            },
            // eslint-disable-next-line no-unused-vars
            customFilterRegion(item, queryText, itemText) {
                const textOne = item.name.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1
            },
            clearFilter() {
                this.search = ''
                this.dateRange = ''
                this.categoryId = 0
                this.userId = 0
                this.selectedStatus = '0'
                this.selectedRegion = 0
                this.search = ''
                this.getEventsFromDB()
            },
            apply() {
                this.page = 1
                this.filterPanel = null
                this.getEventsFromDB()
            },
            getRegionsFromDB() {
                axios.post('region/getListByLang', JSON.stringify({"lang": this.appLang}))
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')
                            let region = res.data.result
                            region.unshift({id: 0, name: this.$t('category.all')})
                            this.regions = region
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
            },
            getEventsFromDB() {
                let dateRange = this.dateRange.split(' — ')
                let sortName = this.sortName[0]

                let postParams = JSON.stringify({
                    perpage: this.itemsPerPage, // Количество записей на 1 странице
                    page: this.page - 1,  // Номер страницы
                    sort_field: sortName ? sortName : 'id', // Наименование поля для сортировки
                    order: !this.isDesc ? 'desc' : 'asc', // Наименование направления сортировки
                    user_id: this.userId, // (фильтрация) Id пользователя сисетмы Life Map
                    category_id: this.categoryId, // (фильтрация) Id категории события
                    region_id: this.selectedRegion, // (фильтрация) Id региона, в котором создано событие
                    status: this.selectedStatus, // (фильтрация) статус пользователя "A", "D" , если фильтр не применен - "0"
                    reg_date_start: dateRange.length < 2 ? "1970-01-01" : dateRange[0], // (фильтрация) Дата регистрации от, если фильтр не применен - "1970-01-01"
                    reg_date_end: dateRange.length < 2 ? "1970-01-01" : dateRange[1], // (фильтрация) Дата регистрации до, если фильтр не применен - "1970-01-01"
                    text_search: this.search // (фильтрация) Текстовое значение поиска, ведется по колонкам (first_name,last_name , middle_name, login, email, phone_mobile)
                })
                let postParamsForCount = JSON.stringify({
                    user_id: this.userId, // (фильтрация) Id пользователя сисетмы Life Map
                    category_id: this.categoryId, // (фильтрация) Id категории события
                    region_id: this.selectedRegion, // (фильтрация) Id региона, в котором создано событие
                    status: this.selectedStatus, // (фильтрация) статус пользователя "A", "D" , если фильтр не применен - "0"
                    reg_date_start: dateRange.length < 2 ? "1970-01-01" : dateRange[0], // (фильтрация) Дата регистрации от, если фильтр не применен - "1970-01-01"
                    reg_date_end: dateRange.length < 2 ? "1970-01-01" : dateRange[1], // (фильтрация) Дата регистрации до, если фильтр не применен - "1970-01-01"
                    text_search: this.search // (фильтрация) Текстовое значение поиска, ведется по колонкам (first_name,last_name , middle_name, login, email, phone_mobile)
                })

                axios.post('event/protected/getListByFilter', postParams)
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')

                            this.events = res.data.result
                            this.onResize()

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


                axios.post('event/protected/getCountByFilter', postParamsForCount)
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')

                            let count = res.data.result.count
                            let residue = count % this.itemsPerPage
                            let pageCount = parseInt(count / this.itemsPerPage)
                            this.pageCount = residue > 0 ?  pageCount + 1 : pageCount
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
            viewEvent(item) {
                console.log(item)
                localStorage.setItem('selectedEventId', item.id)
                localStorage.setItem('selectedEventName', item.name)
                localStorage.setItem('selectedEventDateStart',  this.getDate(item.start_date, -1))
               window.open('#/')
            },

            goto(item) {
                window.open('https://t.me/' + item.user_login)
            },

            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save() {

            },

            getDateFormatFromIso(val) {
                let dateBase = new Date(val)
                let date = dateBase.toISOString().substring(0, 10)
                let time = dateBase.toISOString().substring(11, 16)
                let dateF = date + ' ' + time
                return dateF
            },
            getTableHeight() {
                let spaceSize = this.windowSize.x < 500 ? 310 : 260
                return (this.windowSize.y - (this.filterPanelHeight + spaceSize)) +'px'
            },
        },
        computed: {
            ...mapGetters([
                'appLang',
            ])
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
            page() {
                this.getEventsFromDB()
            },
            sortName(val) {
                console.log('sortNmae')
                console.log(val)
                this.getEventsFromDB()
            },
            isDesc(val) {
                console.log('orcer')
                console.log(val)
                this.getEventsFromDB()
            },

        },
        created() {
            this.subscribeToAppStateChanged()
            let userId = localStorage.getItem('selectedUserId')
            if(userId){
                console.log('userid')
                this.userId = parseInt(userId)
                localStorage.removeItem('selectedUserId')
            }
        },
        mounted() {
            this.initialize()

        },

    }
</script>

<style scoped>
  .date-picker-border {
    border: 1px solid #9e9e9e !important;
    border-radius: 5px;
    padding: 7px 12px !important;
    width: 100%;
  }

  #events-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size: 15px !important;
  }
</style>
