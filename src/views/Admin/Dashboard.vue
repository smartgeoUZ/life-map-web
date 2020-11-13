<template>
  <v-container class="px-5" v-resize="onResize">
    <v-row class="ma-2 ">
      <v-col cols="12" md="6">
        <div class="text-h4 textGrey--text">
          {{$t('menu.dashboard')}}
        </div>
      </v-col>
      <!--  <v-col cols="12" md="3" align="center" >
          <flat-pickr :config="dateTimePickerConfig" :placeholder="$t('message.interval')"
                      class="date-picker-border py-4 app text&#45;&#45;primary"
                      v-model="dateRange">
          </flat-pickr>

        </v-col>
        <v-col align="right" cols="12" md="3">
          <v-btn @click="apply()" class="primary">{{$t('message.apply')}}</v-btn>
          <v-btn @click="clearFilter()" class="ml-2">{{$t('message.clear')}}</v-btn>

        </v-col>-->
    </v-row>

    <v-row class="mx-2 mx-md-16 elevation-1 white rounded" justify="space-between">
      <v-col align="center" cols="12" md="3">
        <flat-pickr :config="dateTimePickerConfig" :placeholder="$t('message.interval')"
                    class="date-picker-border py-4 app text--primary "
                    v-model="dateRange">
        </flat-pickr>

      </v-col>
      <v-col align="right" cols="12" md="3">
        <v-btn @click="apply()" class="primary">{{$t('message.apply')}}</v-btn>
        <v-btn @click="clearFilter()" class="ml-2">{{$t('message.clear')}}</v-btn>

      </v-col>
    </v-row>

    <div>
      <v-row align="center" justify="space-around">
        <v-col cols="12"
               lg="3"
               md="3"
               sm="6">
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              {{ numOfEvents.title }}
              <v-spacer></v-spacer>
              <v-tooltip small top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{numOfEvents.tableData.events_count_all}}</span>
                </template>
                <span>Total</span>
              </v-tooltip>
              <span>/</span>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs"
                        v-on="on"> {{"&nbsp; "+ numOfEvents.tableData.events_count_total_telegram}}</span>
                </template>
                <span>Telegram</span>
              </v-tooltip>

              <!--              {{numOfEvents.tableData.events_count_all + " | " + numOfEvents.tableData.events_count_total_telegram }}-->
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item>
                <v-list-item-content>Actual:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1 ">{{ numOfEvents.tableData.events_count_relevant }}
                </v-list-item-action-text>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>All:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1">{{ numOfEvents.tableData.events_count_total }}
                </v-list-item-action-text>
              </v-list-item>

              <!-- <v-list-item>
                 <v-list-item-content>My:</v-list-item-content>
                 <v-list-item-action-text class="text-subtitle-1">{{ numOfEvents.tableData.events_count_own }}
                 </v-list-item-action-text>
               </v-list-item>-->

              <v-list-item>
                <v-list-item-content>For moderation:</v-list-item-content>

                <v-list-item-action-text class="text-subtitle-1">{{ numOfEvents.tableData.events_count_moderating }}
                </v-list-item-action-text>
              </v-list-item>
              <!--
                            <v-list-item>
                              <v-list-item-content>By telegram</v-list-item-content>
                              <v-list-item-action-text class="text-subtitle-1">{{ numOfEvents.tableData.events_count_total_telegram }}
                              </v-list-item-action-text>
                            </v-list-item>-->
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12"
               lg="3"
               md="3"
               sm="6">
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              {{ numOfLayers.title }}
              <v-spacer></v-spacer>
              {{numOfLayers.tableData.layers_count_total }}
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item>
                <v-list-item-content>Active:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1">{{ numOfLayers.tableData.layers_count_active }}
                </v-list-item-action-text>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>Not Active:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1">{{numOfLayers.tableData.layers_count_not_active }}
                </v-list-item-action-text>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12"
               lg="3"
               md="3"
               sm="6">
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              {{ numOfUsers.title }}
              <v-spacer></v-spacer>
              {{numOfUsers.tableData.users_count_total }}
            </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-item>
                <v-list-item-content>Admins:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1">{{ numOfUsers.tableData.users_count_role_admin }}
                </v-list-item-action-text>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>Moderators:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1">{{numOfUsers.tableData.users_count_role_moderator }}
                </v-list-item-action-text>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>Trusted users:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1">{{numOfUsers.tableData.users_count_role_trusted_user }}
                </v-list-item-action-text>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>Users:</v-list-item-content>
                <v-list-item-action-text class="text-subtitle-1">{{numOfUsers.tableData.users_count_role_user }}
                </v-list-item-action-text>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="mx-0" justify="space-around">
        <v-col class="elevation-1 white my-3"
               cols="12"
               md="11"
               sm="12"
               v-if="datacollection != null">
          <BarChart :chart-data="datacollection"
                    :iaStackBar="false">
          </BarChart>
        </v-col>
        <v-col class="elevation-1 white my-3"
               cols="12"
               md="11"
               sm="12"
               v-if="datacollection2 != null">
          <BarChart :chart-data="datacollection2"
                    :iaStackBar="false">
          </BarChart>
        </v-col>
        <v-col class="elevation-1 white my-3"
               cols="12"
               md="11"
               sm="12"
               v-if="datacollection3 != null">
          <BarChart :chart-data="datacollection3"
                    :iaStackBar="true">
          </BarChart>
        </v-col>
      </v-row>
    </div>


  </v-container>
</template>

<script>
    import axios from "../../plugins/api-axios";
    import BarChart from '../../components/charts/vue-chartjs/BarChart'
    import flatpickr from 'vue-flatpickr-component'


    export default {
        name: "Dashboard",
        components: {
            BarChart,
            'flat-pickr': flatpickr,
        },
        data() {
            return {
                dateTimePickerConfig: {
                    mode: "range",
                    dateFormat: 'yy-m-d',
                    firstDayOfWeek: 1,
                    locale: localStorage.getItem('cur_lang'),
                    weekNumbers: true
                },
                dateRange: '',
                itemsPerPage: 4,
                columnCategoryLabels: [
                    this.$t('category.need_help'),
                    this.$t('category.ready_assist'),
                    this.$t('category.water'),
                    this.$t('category.food'),
                    this.$t('category.health_care_center'),
                    this.$t('category.doctor'),
                    this.$t('category.blood_center'),
                    this.$t('category.blood_donor'),
                    this.$t('category.charity'),
                    this.$t('category.attention'),
                    this.$t('category.level'),
                    this.$t('category.vet'),
                ],
                dataForChart: [
                    {
                        label: 'All',
                        data: [],
                        backgroundColor: '#faebcc',
                    },
                    {
                        label: 'Actual',
                        data: [],
                        backgroundColor: '#abe98c',
                    },
                    /* {
                        label: 'Own',
                        data: [],
                        backgroundColor: '#EBCCD1',
                    },*/
                    {
                        label: 'Moderating',
                        data: [],
                        backgroundColor: '#77c2eb',
                    },
                ],
                dataForChartRegionFilter: [
                    {
                        label: 'All',
                        data: [],
                        backgroundColor: '#faebcc',
                    },
                    {
                        label: 'Actual',
                        data: [],
                        backgroundColor: '#abe98c',
                    },
                    /* {
                        label: 'Own',
                        data: [],
                        backgroundColor: '#EBCCD1',
                    },*/
                    {
                        label: 'Moderating',
                        data: [],
                        backgroundColor: '#77c2eb',
                    },
                ],

                dataForChartCategoryRegion: [
                    {
                        label: 'Andijan',
                        data: [],
                        backgroundColor: '#00ff66',
                    },
                    {
                        label: 'Bukhara',
                        data: [],
                        backgroundColor: '#fad160',
                    },
                    {
                        label: 'Fergana',
                        data: [],
                        backgroundColor: '#EBCCD1',
                    },
                    {
                        label: 'Jizzakh',
                        data: [],
                        backgroundColor: '#77c2eb',
                    },
                    {
                        label: 'Karakalpakstan',
                        data: [],
                        backgroundColor: '#8265db',
                    },
                    {
                        label: 'Namangan',
                        data: [],
                        backgroundColor: '#e4e138',
                    },
                    {
                        label: 'Navoiy',
                        data: [],
                        backgroundColor: '#0fb366',
                    },
                    {
                        label: 'Qashqadaryo',
                        data: [],
                        backgroundColor: '#812772',
                    },
                    {
                        label: 'Samarqand',
                        data: [],
                        backgroundColor: '#3e77a7',
                    },
                    {
                        label: 'Sirdaryo',
                        data: [],
                        backgroundColor: '#919519',
                    },
                    {
                        label: 'Surxondaryo',
                        data: [],
                        backgroundColor: '#d22275',
                    },
                    {
                        label: 'Tashkent city',
                        data: [],
                        backgroundColor: '#d42e42',
                    },
                    {
                        label: 'Tashkent',
                        data: [],
                        backgroundColor: '#cdb62d',
                    },
                    {
                        label: 'Unknown',
                        data: [],
                        backgroundColor: '#3dbdb9',
                    },
                    {
                        label: 'Xorazm',
                        data: [],
                        backgroundColor: '#3469fc',
                    },
                ],
                numOfEvents: {
                    id: 1,
                    title: 'Number of events',
                    tableData: {
                        events_count_all: 0,
                        events_count_moderating: 0,
                        // events_count_own: 0,
                        events_count_relevant: 0,
                        events_count_total: 0,
                        events_count_total_telegram: 0
                    }
                },
                numOfUsers: {
                    id: 2,
                    title: 'Number of users',
                    tableData: {
                        users_count_total: 0,
                        users_count_role_admin: 0,
                        users_count_role_moderator: 0,
                        users_count_role_trusted_user: 0,
                        users_count_role_user: 0
                    }
                },
                numOfLayers: {
                    id: 3,
                    title: 'Number of layers',
                    tableData: {
                        layers_count_total: 0,
                        layers_count_active: 0,
                        layers_count_not_active: 0,
                    }
                },
                datacollection: null,
                datacollection2: null,
                datacollection3: null,
            }
        },
        mounted() {
            this.onResize()
        },
        created() {
            console.log('created')
            this.getDataFromDB()
        },
        methods: {
            fillData(data, dataForChart, labels, withRegion) {
                // console.log('111111111')
                if (withRegion) {
                    return {
                        labels: labels,
                        datasets: this.createDataForChartToCategoryByRegion(data, dataForChart)
                    }
                } else {
                    return {
                        labels: labels,
                        datasets: this.createDataForChart(data, dataForChart)
                    }
                }

            },
            onChangeLang: function () {
                this.columnCategoryLabels = [
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
            onResize() {
                // console.log('dashboard resize')
            },
            getDataFromDB() {
                let dateRange = this.dateRange.split(' — ')
                console.log('getDataFromDB')
                let postParams = JSON.stringify({
                    category_id: 0,
                    region_id: 1,
                    user_id: 0,
                    start_date: dateRange.length < 2 ? "1970-01-01" : dateRange[0],
                    end_date: dateRange.length < 2 ? "1970-01-01" : dateRange[1],

                })
                let postParamsOnlyDate = JSON.stringify({
                    start_date: dateRange.length < 2 ? "1970-01-01" : dateRange[0],
                    end_date: dateRange.length < 2 ? "1970-01-01" : dateRange[1],
                })

                // All events count by state
                axios.post('eventCategory/protected/getEventCategories', JSON.stringify({roleId: 1}))
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')
                            let layers = res.data.result

                            this.numOfLayers.tableData = this.getLayersCount(layers, Object.assign({}, this.numOfLayers.tableData))
                            console.log(this.numOfLayers)
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


                // All events count by state
                axios.post('event/protected/getDashboardDataEvents', postParams)
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')
                            this.numOfEvents.tableData = res.data.result[0]
                            console.log(this.numOfEvents)
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

                //All users count by roles
                axios.post('/event/protected/getDashboardDataUsers')
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')

                            this.numOfUsers.tableData = res.data.result[0]

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


                //All users count by roles
                axios.post('/event/protected/getDashboardDataEventsByCategoryFilter', postParamsOnlyDate)
                    .then(res => {
                        if (res.data.result) {
                            let eventCategoriesByFilter = res.data.result
                            console.log(eventCategoriesByFilter)
                            this.datacollection = this.fillData(eventCategoriesByFilter, this.dataForChart.slice(), this.columnCategoryLabels, false)
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


                //All users count by roles
                axios.post('/event/protected/getDashboardDataEventsByRegionFilter', postParamsOnlyDate)
                    .then(res => {
                        if (res.data.result) {
                            let eventRegionByFilter = res.data.result
                            let labels = eventRegionByFilter.map(a => a.region_name_en)
                            this.datacollection2 = this.fillData(eventRegionByFilter, this.dataForChartRegionFilter.slice(), labels, false)

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


                axios.post('/event/protected/getDashboardDataEventsByCategoryRegion', postParamsOnlyDate)
                    .then(res => {
                        if (res.data.result) {
                            let eventCategoriesByRegion = res.data.result
                            this.datacollection3 = this.fillData(eventCategoriesByRegion, this.dataForChartCategoryRegion.slice(), this.columnCategoryLabels, true)

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
            getLayersCount(layers, dt) {
                let total = layers.length
                let active = 0

                for (let l of layers){
                    if(l.is_active){
                        active++
                    }
                }
                dt.layers_count_total = total
                dt.layers_count_active = active
                dt.layers_count_not_active = total - active

                return dt
            },
            createDataForChart(items, dataForChart) {
                console.log('createDataForChart')
                dataForChart[0].data = []
                dataForChart[1].data = []
                dataForChart[2].data = []
                for (let i in items) {
                    dataForChart[0].data.push(items[i].all_events_count)
                    dataForChart[1].data.push(items[i].relevant_events_count)
                    dataForChart[2].data.push(items[i].moderating_events_count)
                }
                return dataForChart
            },
            createDataForChartToCategoryByRegion(items, dataForChart) {
                dataForChart[0].data = []
                dataForChart[1].data = []
                dataForChart[2].data = []
                dataForChart[3].data = []
                dataForChart[4].data = []
                dataForChart[5].data = []
                dataForChart[6].data = []
                dataForChart[7].data = []
                dataForChart[8].data = []
                dataForChart[9].data = []
                dataForChart[10].data = []
                dataForChart[11].data = []
                dataForChart[12].data = []
                dataForChart[13].data = []
                dataForChart[14].data = []
                for (let i in items) {
                    dataForChart[0].data.push(items[i].andijan_region_events_count)
                    dataForChart[1].data.push(items[i].bukhara_region_events_count)
                    dataForChart[2].data.push(items[i].fergana_region_events_count)
                    dataForChart[3].data.push(items[i].jizzakh_region_events_count)
                    dataForChart[4].data.push(items[i].karakalpakstan_events_count)
                    dataForChart[5].data.push(items[i].namangan_region_events_count)
                    dataForChart[6].data.push(items[i].navoiy_region_events_count)
                    dataForChart[7].data.push(items[i].qashqadaryo_region_events_count)
                    dataForChart[8].data.push(items[i].samarqand_region_events_count)
                    dataForChart[9].data.push(items[i].sirdaryo_region_events_count)
                    dataForChart[10].data.push(items[i].surxondaryo_region_events_count)
                    dataForChart[11].data.push(items[i].tashkent_events_count)
                    dataForChart[12].data.push(items[i].tashkent_region_events_count)
                    dataForChart[13].data.push(items[i].unknown_region_events_count)
                    dataForChart[14].data.push(items[i].xorazm_region_events_count)
                }
                return dataForChart
            },
            apply() {
                this.getDataFromDB()
            },
            clearFilter() {
                this.dateRange = ''
                this.getDataFromDB()
            },
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
</style>
