<template>
  <v-container class="px-5" v-resize="onResize">
    <v-row class="mx-2">
      <v-col>
        <div class="text-h4 textGrey--text">
          {{$t('menu.role')}}
        </div>
        <!--        <v-btn @click="getPerWithRp(permissions.slice(), rp)">Load data</v-btn>-->
      </v-col>
    </v-row>

    <div class="px-4">
      <v-data-table
              :headers="headers"
              :height="windowSize.y - 270"
              :items="permissionsWithRP"
              :items-per-page="perPage"
              class="elevation-1"
              fixed-header
              v-if="permissionsWithRP != null">
        <!--  <template v-slot:item.rp[0].access_value="{ item }">
            <v-checkbox hide-details class="pb-4" :input-value="item.rp[0].access_value == 15" @click.native="changePermAccess(item.rp[0])"></v-checkbox>
          </template>-->
        <template v-slot:item.rp[1].access_value="{ item }">
          <v-checkbox :input-value="item.rp[1].access_value == 15" @click.native="changePermAccess(item.rp[1])" class="pb-4"
                      hide-details></v-checkbox>
        </template>
        <template v-slot:item.rp[2].access_value="{ item }">
          <v-checkbox :input-value="item.rp[2].access_value == 15" @click.native="changePermAccess(item.rp[2])" class="pb-4"
                      hide-details></v-checkbox>
        </template>
        <template v-slot:item.rp[3].access_value="{ item }">
          <v-checkbox :input-value="item.rp[3].access_value == 15" @click.native="changePermAccess(item.rp[3])" class="pb-4"
                      hide-details></v-checkbox>
        </template>
        <template v-slot:item.rp[4].access_value="{ item }">
          <v-checkbox :input-value="item.rp[4].access_value == 15" @click.native="changePermAccess(item.rp[4])" class="pb-4"
                      hide-details></v-checkbox>
        </template>
      </v-data-table>
    </div>

    <!-- <div class="text-center pt-4">
       <v-pagination :length="pageCount" total-visible="7" v-model="page"></v-pagination>
     </div>-->

  </v-container>
</template>

<script>
    import axios from "../../plugins/api-axios";
    import {CONSTANTS} from "../../utils/constants";
    import {mapGetters} from "vuex";

    // eslint-disable-next-line no-unused-vars
    let self = null

    export default {
        name: "Role",
        data() {
            self = this
            return {
                perPage: -1,
                windowSize: {
                    x: 0,
                    y: 0,
                },
                headers: [
                    {value: 'id', sortable: false, text: 'ID'},
                    {value: 'description', sortable: true, text: 'Permission name'},
                    // {value: 'rp[0].access_value', sortable: false, text: 'System administrator'},
                    {value: 'rp[1].access_value', sortable: false, text: 'Administrator'},
                    {value: 'rp[2].access_value', sortable: false, text: 'Moderator'},
                    {value: 'rp[3].access_value', sortable: false, text: 'User'},
                    {value: 'rp[4].access_value', sortable: false, text: 'Trusted User'},
                ],
                permissions: [],
                permissionsWithRP: null,
                rp: [],
            }
        },
        components: {},
        methods: {
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
                this.headers = CONSTANTS.ROLES
            },
            onResize() {
                // this.filterPanelHeight = document.getElementById('filter-panel').offsetHeight;
                this.windowSize = {x: window.innerWidth, y: window.innerHeight}
            },

            getDataFromDB() {
                axios.get('permission/protected/getList')
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')

                            this.permissions = res.data.result

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

                axios.get('rp/protected/getList')
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')

                            this.rp = res.data.result


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
            getPerWithRp(perms, rp) {
                console.log('getPerWithRp')
                for (let perm of perms) {
                    perm.rp = rp.filter(item => {
                        return item.permission_id === perm.id
                    })
                }
                this.permissionsWithRP = perms
            },
            goto(item) {
                window.open('https://t.me/' + item.login)
            },

            changePermAccess(rp) {
                let postParams = JSON.stringify({
                    id: rp.id, // Id разрешения роли
                    accessValue: rp.access_value === 0 ? 15 : 0
                })
                axios.post('rp/protected/updateAccessValue', postParams)
                    .then(res => {
                        if (res.data.result) {
                            this.$toast.success('saved')
this.getDataFromDB()
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
        },
        computed: {
            ...mapGetters([
                'appLang',
            ])
        },
        watch: {
            rp() {
                this.getPerWithRp(this.permissions.slice(), this.rp)
            },
            perPage(val){
                console.log(val)
            }
        },
        created() {
            this.getDataFromDB()
            this.subscribeToAppStateChanged()
        },
        mounted() {
            this.onResize()
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

