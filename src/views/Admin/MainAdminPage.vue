<template>
  <div class="" style="background-color: #f0f0f0; height: 100%">
    <cus-header :btn-left-panel-show="false"></cus-header>
    <v-navigation-drawer :clipped="true"
                         v-model="drawer"
                         app
                         mobile-break-point="860px" width="300px">
      <v-list active-class="primary">
        <v-list-item-group color="primary">
          <v-list-item :key="i"
                       :to="item.path" class="px-6"
                       v-for="(item, i) in items"
                       v-show="item.permission">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>


    <!--        <left-panel></left-panel>-->


    <v-main class="app-content pa-0 ma-0">
      <div class="app-page">
        <router-view/>
      </div>
    </v-main>
    <Footer></Footer>
  </div>
</template>

<script>
    import CusHeader from '../../components/app/Header.vue'
    import Footer from '../../components/app/Footer.vue'
    import {mapGetters} from "vuex";
    import messages from "../../utils/messages";
    import * as authUtils from "../../utils/auth-utils";
    import {CONSTANTS} from "../../utils/constants";

    export default {
        name: "MainAdminPage",
        data: () => ({
            item: 1,
            items: [
                {permission: true, text: 'Dashboard', icon: 'mdi-monitor-dashboard', path: '/admin/dashboard'},
                {permission: false, text: 'Events', icon: 'mdi-calendar-blank-multiple', path: '/admin/events'},
                {permission: false, text: 'Users', icon: 'mdi-account-multiple-outline', path: '/admin/users'},
                {permission: false, text: 'Role', icon: 'mdi-shield-check-outline ', path: '/admin/role'},
                {permission: false, text: 'Layers', icon: 'mdi-layers-triple-outline', path: '/admin/layers'},
            ],
        }),
        components: {
            CusHeader,
            Footer
        },
        created() {
            // console.log('created');
            this.loadData()
            this.subscribeToAppStateChanged()
        },
        methods: {
            onChangeLang: function () {
                // Change array Locale
                this.updateMenu()
            },
            updateMenu() {
                this.items = [
                    {
                        permission: this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_DASHBOARD),
                        text: this.$t('menu.dashboard'),
                        icon: 'mdi-monitor-dashboard',
                        path: '/admin/dashboard'
                    },
                    {
                        permission: this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_EVENTS),
                        text: this.$t('menu.events'),
                        icon: 'mdi-calendar-blank-multiple',
                        path: '/admin/events'
                    },
                    {
                        permission: this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_USERS),
                        text: this.$t('menu.users'),
                        icon: 'mdi-account-multiple-outline',
                        path: '/admin/users'
                    },
                    {
                        permission: this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_ROLES),
                        text: this.$t('menu.role'),
                        icon: 'mdi-shield-check-outline ',
                        path: '/admin/role'
                    },
                    {
                        permission: this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_LAYERS),
                        text: this.$t('menu.layers'),
                        icon: 'mdi-layers-triple-outline',
                        path: '/admin/layers'
                    },
                ]
            },
            subscribeToAppStateChanged() {
                // eslint-disable-next-line no-unused-vars
                this.unsubscribe = this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'SET_USER_PERMISSIONS':
                            // console.log('SET_USER_PERMISSIONS ')
                            if (this.$store.getters.getUserPermissions) {
                                this.updateMenu()
                            }
                            break;
                        case 'APP_LANG':
                            // console.log('APP_LANG')
                            this.onChangeLang()
                            break;
                    }
                });
            },
            async loadData() {
                // console.log('loadData');
                if (this.getExtUser) {
                    // if (!this.getDbUser) {
                    await this.loadUserData()
                    // }
                }
            },
            async loadUserData() {
                // console.log('loadUserData');
                await this.$store.dispatch('GET_USER_BY_EXT_ID', this.getExtUser.id).then(async dbUser => {
                    // console.log(dbUser);
                    if (dbUser) {
                        // console.log('dbUser');

                        if (dbUser.is_blocked) {
                            // eslint-disable-next-line no-unused-vars
                            await this.$store.dispatch('LOGOUT').then(res => {
                                // console.log('is_blocked');
                                this.$router.push('/login')
                                this.$message(messages['logout'])
                            });
                        } else {
                            if (authUtils.tokenDateIsExpired(JSON.parse(this.getExtUser.auth_date))) {
                                // console.log('authUtils.tokenDateIsExpired');

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
        },
        computed: {
            ...mapGetters([
                'isMobile',
                'getIsAdminLeftPanelOpen',
                'getDbUser',
                'getExtUser',
            ]),
            drawer: {
                get() {
                    return this.getIsAdminLeftPanelOpen
                },
                set(value) {
                    if (!value) {
                        this.$store.dispatch('SET_IS_ADMIN_LEFT_PANEL_OPEN', value)
                    }
                }
            }
        },
    }
</script>

<style scoped>

</style>
