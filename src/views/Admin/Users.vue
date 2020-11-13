<template>
    <v-container class="px-5" v-resize="onResize">
        <v-row class="mx-2">
            <v-col>
                <div class="text-h4 textGrey--text">
                    {{ $t('menu.users') }}
                </div>
            </v-col>
        </v-row>

        <div class="elevation-1 white" id="filter-panel" v-show="windowSize.x > 500">
            <div class="text-h6 mx-0 pt-2 px-7 ">{{ $t('message.filter') }}</div>
            <v-row align="center" class=" mx-0  mb-0 px-4"
                   style="border-radius: 4px">

                <v-col class="pt-0" cols="8" md="9">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field
                                :label="'ID | '+ $t('message.topic') + ' | ' + $t('message.description') + ' | '+ $t('message.userName') "
                                @keyup.enter="getUsersFromDB()"
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
                                :filter="customFilterRegion"
                                :items="roles"
                                :label="$t('menu.role')"
                                dense
                                hide-details
                                item-text="name"
                                item-value="id"
                                outlined
                                placeholder=""
                                v-model="roleId">
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
                    <v-btn @click="apply()" class="primary">{{ $t('message.apply') }}</v-btn>
                    <v-btn @click="clearFilter()" class="ml-2">{{ $t('message.clear') }}</v-btn>
                </v-col>
            </v-row>
        </div>
        <v-expansion-panels v-model="filterPanel" v-show="windowSize.x < 500">
            <v-expansion-panel>
                <v-expansion-panel-header class="pa-0 px-3">

                    <div class="title textGrey--text">
                        <v-icon class="pb-1 px-1">mdi-filter-variant</v-icon>
                        <span>{{ $t('message.filter') }}</span></div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row align="center"
                           class="mx-0  mb-0 px-4"
                           id="filter-panel2"
                           style="border-radius: 4px">
                        <v-col cols="12" md="9">
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        :label="'ID | '+ $t('message.topic') + ' | ' + $t('message.description') + ' | '+ $t('message.userName') "
                                        @keyup.enter="getUsersFromDB()"
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
                                        :filter="customFilterRegion"
                                        :items="roles"
                                        :label="$t('menu.role')"
                                        dense
                                        hide-details
                                        item-text="name"
                                        item-value="id"
                                        outlined
                                        placeholder=""
                                        v-model="roleId">
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
                        <v-col class="text-right" cols="12" md="3" sm="12" style="display: flex">
                            <v-btn @click="apply()" class="primary">{{ $t('message.apply') }}</v-btn>
                            <v-btn @click="clearFilter()" class="ml-2">{{ $t('message.clear') }}</v-btn>
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-data-table
            :headers="headers"
            :height="users.length < itemsPerPage && windowSize.x > 500  ? '' : getTableHeight()"
            :items="users"
            :items-per-page="itemsPerPage"
            :sort-desc.sync="isDesc"
            calculate-widths
            class="elevation-1 mt-4"
            fixed-header
            :no-data-text="$t('message.noData')"
            hide-default-footer
            id="users-table">

            <template v-slot:item.id="{ item }">
                <div style="min-width: 20px; max-width: 30px">
                    <span class="mx-2">{{ item.id }}</span>
                </div>
            </template>
            <template v-slot:item.reg_date="{ item }">
                <div style="min-width: 110px; max-width: 145px">{{ getDateFormatFromIso(item.reg_date) }}</div>
            </template>
            <template v-slot:item.role_name="props">
                <v-edit-dialog :return-value.sync="props.item.role_name"
                               large
                               @cancel="cancel"
                               @close="close"
                               @open="open(props.item.role_id)"
                               @save="save(props.item, 'role')"
                               v-if="props.item.role_id !== 1"
                > {{ props.item.role_name }}
                    <template v-slot:input>
                        <v-autocomplete
                            :filter="customFilterRegion"
                            :items="rolesToSave"
                            :label="$t('menu.role')"
                            class="my-3"
                            dense
                            hide-details
                            item-text="name"
                            item-value="id"
                            outlined
                            v-model="props.item.role_id">
                        </v-autocomplete>

                    </template>
                </v-edit-dialog>
                <div v-else style="min-width: 50px; max-width: 60px">{{ props.item.role_name }}</div>
            </template>
            <template v-slot:item.status="{ item }">
                <div style="min-width: 50px; max-width: 60px">{{ item.status }}</div>
            </template>
            <template v-slot:item.perform_blocking_user_full_name="{ item }">
                <div style="min-width: 110px; max-width: 150px">{{ item.perform_blocking_user_full_name }}</div>
            </template>
            <template v-slot:item.block_date="{ item }">
                <div style="min-width: 110px; max-width: 145px">{{ getDateFormatFromIso(item.block_date) }}</div>
            </template>
            <template v-slot:item.last_event_start_date="{ item }">
                <div style="min-width: 110px; max-width: 145px">{{ getDateFormatFromIso(item.last_event_start_date) }}</div>
            </template>
            <template v-slot:item.region_name="props">
                <v-edit-dialog :return-value.sync="props.item.region_name"
                               large
                               @cancel="cancel"
                               @close="close"
                               @open="open(props.item.region_id)"
                               @save="save(props.item, 'region')"
                > {{ props.item.region_name }}
                    <template v-slot:input>
                        <v-autocomplete
                            :filter="customFilterRegion"
                            :items="regionsToSave"
                            :label="$t('menu.region')"
                            class="my-3"
                            dense
                            hide-details
                            item-text="name"
                            item-value="id"
                            outlined
                            v-model="props.item.region_id">
                        </v-autocomplete>

                    </template>
                </v-edit-dialog>
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
import {CONSTANTS} from "@/utils/constants";
import {mapGetters} from "vuex";
import flatpickr from 'vue-flatpickr-component'

// eslint-disable-next-line no-unused-vars
let self = null

export default {
    name: "Users",
    data() {
        self = this
        return {
            snack: false,
            snackColor: '',
            snackText: '',
            windowSize: {
                x: 0,
                y: 0,
            },
            filterPanel: null,
            filterPanelHeight: 0,
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
            roleId: 0,
            selectedStatus: '0',
            selectedRegion: 0,
            dateRange: '',
            selectedForSaveRoleId: 0,
            statusList: [
                {value: '0', title: this.$t('category.all')},
                {value: 'A', title: 'Active'},
                {value: 'D', title: 'Delete'},
            ],
            regions: [],
            regionsToSave: [],
            roles: CONSTANTS.ROLES.slice(),
            rolesToSave: CONSTANTS.ROLES.slice(1, 5),
            icons_url: CONSTANTS.ICONS_URL,
            headers: [
                {text: 'ID', align: 'start', sortable: true, value: 'id',},
                {text: '@' + this.$t('message.firstName'), align: 'start', sortable: true, value: 'login'},
                {text: this.$t('message.firstName'), value: 'first_name'},
                {text: this.$t('message.lastName'), value: 'last_name'},
                {text: this.$t('message.mobileNumber'), value: 'phone_mobile'},
                {text: this.$t('message.email'), value: 'email'},
                {text: this.$t('menu.role'), value: 'role_name'},
                {text: this.$t('headerEventTable.created'), value: 'reg_date'},
                {text: this.$t('headerEventTable.status'), align: 'center', value: 'status'},
                {text: this.$t('headerEventTable.blockedBy'), value: 'perform_blocking_user_full_name'},
                {text: this.$t('headerEventTable.blockedDate'), value: 'block_date'},
                {text: this.$t('headerEventTable.lastEvent'), value: 'last_event_start_date'},
                {text: this.$t('menu.region'), value: 'region_name'},
                {text: this.$t('headerEventTable.actions'), align: 'center', value: 'actions', sortable: false},
            ],
            statusIcon: {
                forModeration: require('../../assets/icons/m.png'),
                actual: require('../../assets/icons/actual.png'),
                notActual: require('../../assets/icons/notActive.png'),
                rejected: require('../../assets/icons/rejected.png'),
            },
            users: [],
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
            this.getUsersFromDB()
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
            this.roles = CONSTANTS.ROLES
            this.roles.unshift({id: 0, name: this.$t('category.all')})
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
                {text: '@' + this.$t('message.userName'), align: 'start', sortable: true, value: 'login'},
                {text: this.$t('message.firstName'), value: 'first_name'},
                {text: this.$t('message.lastName'), value: 'last_name'},
                {text: this.$t('message.mobileNumber'), value: 'phone_mobile'},
                {text: this.$t('message.email'), value: 'email'},
                {text: this.$t('menu.role'), value: 'role_name'},
                {text: this.$t('headerEventTable.created'), value: 'reg_date'},
                {text: this.$t('headerEventTable.status'), align: 'center', value: 'status'},
                {text: this.$t('headerEventTable.blockedBy'), value: 'perform_blocking_user_full_name'},
                {text: this.$t('headerEventTable.blockedDate'), value: 'block_date'},
                {text: this.$t('headerEventTable.lastEvent'), value: 'last_event_start_date'},
                {text: this.$t('menu.region'), value: 'region_name'},
                {text: this.$t('headerEventTable.actions'), align: 'center', value: 'actions', sortable: false},
            ]
        },
        onResize() {
            // console.log('userson resize')
            this.filterPanelHeight = document.getElementById('filter-panel').offsetHeight;
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
            this.roleId = 0
            this.selectedStatus = '0'
            this.selectedRegion = 0
            this.search = ''
            this.getUsersFromDB()
        },
        apply() {
            this.page = 1
            this.filterPanel = null
            this.getUsersFromDB()
        },
        getRegionsFromDB() {
            axios.post('region/getListByLang', JSON.stringify({"lang": this.appLang}))
                .then(res => {
                    if (res.data.result) {
                        // this.$toast.success('getEvents')
                        let region = res.data.result
                        this.regionsToSave = region.slice()
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
        getUsersFromDB() {
            let dateRange = this.dateRange.split(' — ')
            let sortName = this.sortName[0]

            let postParams = JSON.stringify({
                perpage: this.itemsPerPage, // Количество записей на 1 странице
                page: this.page - 1,  // Номер страницы
                sort_field: sortName ? sortName : 'id', // Наименование поля для сортировки
                order: !this.isDesc ? 'desc' : 'asc', // Наименование направления сортировки
                role_id: this.roleId, // (фильтрация) Id роли пользователя (фильтрация), если фильтр не применен - 0
                region_id: this.selectedRegion, // (фильтрация) Id региона, в котором создано событие
                status: this.selectedStatus, // (фильтрация) статус пользователя "A", "D" , если фильтр не применен - "0"
                reg_date_start: dateRange.length < 2 ? "1970-01-01" : dateRange[0], // (фильтрация) Дата регистрации от, если фильтр не применен - "1970-01-01"
                reg_date_end: dateRange.length < 2 ? "1970-01-01" : dateRange[1], // (фильтрация) Дата регистрации до, если фильтр не применен - "1970-01-01"
                text_search: this.search // (фильтрация) Текстовое значение поиска, ведется по колонкам (first_name,last_name , middle_name, login, email, phone_mobile)

            })
            let postParamsForCount = JSON.stringify({
                role_id: 0, // (фильтрация) Id роли пользователя (фильтрация), если фильтр не применен - 0
                region_id: this.selectedRegion, // (фильтрация) Id региона, в котором создано событие
                status: this.selectedStatus, // (фильтрация) статус пользователя "A", "D" , если фильтр не применен - "0"
                reg_date_start: dateRange.length < 2 ? "1970-01-01" : dateRange[0], // (фильтрация) Дата регистрации от, если фильтр не применен - "1970-01-01"
                reg_date_end: dateRange.length < 2 ? "1970-01-01" : dateRange[1], // (фильтрация) Дата регистрации до, если фильтр не применен - "1970-01-01"
                text_search: this.search // (фильтрация) Текстовое значение поиска, ведется по колонкам (first_name,last_name , middle_name, login, email, phone_mobile)
            })

            axios.post('user/protected/getListByFilter', postParams)
                .then(res => {
                    if (res.data.result) {
                        // this.$toast.success('getEvents')

                        this.users = res.data.result

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


            axios.post('user/protected/getCountByFilter', postParamsForCount)
                .then(res => {
                    if (res.data.result) {
                        // this.$toast.success('getEvents')

                        let count = res.data.result.count
                        let residue = count % this.itemsPerPage
                        let pageCount = parseInt(count / this.itemsPerPage)
                        this.pageCount = residue > 0 ? pageCount + 1 : pageCount
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
        viewEvent(user) {
            console.log(user)
            localStorage.setItem('selectedUserId', user.id)
            window.open('#/admin/events')
        },

        goto(item) {
            window.open('https://t.me/' + item.login)
        },

        saveRole(user) {
            let postParams = JSON.stringify({
                role_id: user.role_id,
                user_id: user.id
            })

            axios.post('userRole/protected/updateUserRole', postParams)
                .then(res => {
                    if (res.data.result) {
                        this.$toast.success('saved')
                        this.getUsersFromDB()

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

        saveRegion(user) {
            let postParams = JSON.stringify({
                region_id: user.region_id,
                user_id: user.id,
                auth_type_id: user.auth_type_id
            })

            axios.post('user/protected/updateUserRegion', postParams)
                .then(res => {
                    if (res.data.result) {
                        this.$toast.success('saved')
                        this.getUsersFromDB()

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

        save(user, field_name) {
            // console.log('save')
            // console.log(user)
            if (field_name === 'role') {
                this.saveRole(user)
            } else {
                this.saveRegion(user)
            }
        },
        cancel() {
            this.snack = true
            this.snackColor = 'error'
            this.snackText = 'Canceled'
        },
        open(val) {
            this.selectedForSaveRoleId = val
            this.snack = true
            this.snackColor = 'info'
            this.snackText = 'Dialog opened'
        },
        close() {
            // console.log('Dialog closed')
        },

        getDateFormatFromIso(val) {
            if (val !== null) {
                let dateBase = new Date(val)
                let date = dateBase.toISOString().substring(0, 10)
                let time = dateBase.toISOString().substring(11, 16)
                let dateF = date + ' ' + time
                return dateF
            } else {
                return ''
            }
        },
        getTableHeight() {
            let spaceSize = this.windowSize.x < 500 ? 310 : 260
            return (this.windowSize.y - (this.filterPanelHeight + spaceSize)) + 'px'
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
            this.getUsersFromDB()
        },
        sortName(val) {
            console.log('sortNmae')
            console.log(val)
            this.getUsersFromDB()
        },
        isDesc(val) {
            console.log('orcer')
            console.log(val)
            this.getUsersFromDB()
        }
    },
    created() {
        this.subscribeToAppStateChanged()
    },
    mounted() {
        this.initialize()
        this.onResize()
        this.roles.unshift({id: 0, name: this.$t('category.all')})
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

#users-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size: 15px !important;
}
</style>

