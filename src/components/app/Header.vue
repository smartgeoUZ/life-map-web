<template>
  <v-app-bar dark :clipped-left="$vuetify.breakpoint.lgAndUp"
             app
             color="green accent-4"
             dense>

    <v-app-bar-nav-icon v-show="btnLeftPanelShow" @click.stop="closeOrOpenLeftPanel()"></v-app-bar-nav-icon>
    <v-app-bar-nav-icon @click.stop="closeOrOpenAdminLeftPanel()"
                        v-show="($router.currentRoute.path).includes('/admin')"></v-app-bar-nav-icon>
    <v-toolbar-title @click="goto('/')" style="cursor: pointer">
<!--            <span class="hidden-sm-and-down">lifemap.uz</span>-->
            <span >lifemap.uz</span>
<!--      <a href="/" style="color: white; text-decoration: none">lifemap.uz</a>-->
    </v-toolbar-title>

    <v-spacer></v-spacer>


    <!--    <v-autocomplete v-if="showHeaderSearch"-->
    <!--                    :items="places"-->
    <!--                    :loaduser_blockeding="isLoading"-->
    <!--                    :search-input.sync="searchAddress"-->
    <!--                    class="mx-2"-->
    <!--                    color="green accent-4"-->
    <!--                    dense-->
    <!--                    flat-->
    <!--                    clearable-->
    <!--                    hide-details-->
    <!--                    hide-no-data-->
    <!--                    item-text="addressName"-->
    <!--                    item-value="place_id"-->
    <!--                    outlined-->
    <!--                    :placeholder="$t('message.startTypingToSearchAddress')"-->
    <!--                    prepend-inner-icon="mdi-magnify"-->
    <!--                    return-object-->
    <!--                    solo-inverted-->
    <!--                    no-filter-->
    <!--                    v-model="foundAddressModel">-->
    <!--    </v-autocomplete>-->


    <span class="hidden-sm-and-down pt-1">{{date | date('datetime')}}</span>

    <v-spacer></v-spacer>

    <v-menu offset-y open-on-hover>
      <template v-slot:activator="{ on }">
        <v-btn class="px-0 mr-3" color="green" elevation="1" height="32" min-width="32" small
               dark
               v-on="on">
          {{$i18n.locale}}
        </v-btn>
      </template>

      <v-list dense class="ma-0 pa-0" width="33">
        <v-list-item v-for="(lang, index) in langs"
                     :key="index" :id="'btn-lang-' + lang"
                     height="35"
                     @click="changeLang(lang)"
                     class="pl-1 pr-0 py-0">
          <v-list-item-title class="text-uppercase px-1 py-0">{{ lang }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu offset-y v-if="getDbUser">
      <template v-slot:activator="{ on }">

        <v-btn icon v-on="on" class="ma-0" @click="openMenu()">

          <v-avatar width="40px" height="40px">
            <img :src="userPhotoUrl ? userPhotoUrl : defaultAvatarUrl" alt="Avatar" class="avatar">
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img :src="userPhotoUrl ? userPhotoUrl : defaultAvatarUrl" alt="Avatar" class="avatar">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{userFullName}}</v-list-item-title>
            <span style="font-size: 11px">{{role.name}}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in header_menu"
                     :key="i" @click="goto(item.link)" v-show="item.permission">
          <v-list-item-icon class="mr-4">
            <v-icon class="">{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.name">
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn @click="goto('/login')" class="secondary" light v-else>{{$t('login.enter')}}</v-btn>
  </v-app-bar>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {CONSTANTS} from "../../utils/constants";
    // import axios from "../../plugins/api-axios";


    export default {
        name: "Header",
        props: {
            btnLeftPanelShow: Boolean
        },
        data() {
            return {
                langs: ['en', 'ru', 'uz'],
                curr_lang: 'en',
                role: {name: ''},
                searchText: '',
                defaultAvatarUrl: 'https://www.w3schools.com/howto/img_avatar.png',
                offset: true,
                date: new Date(),
                interval: null,
                dropdown: null,
                header_menu: [
                    {
                        permission: true,
                        name: this.$t('menu.profile'),
                        link: '/profile',
                        icon: 'mdi-account-circle-outline'
                    },
                    {
                        permission: true,
                        name: this.$t('menu.admin'),
                        link: '/admin',
                        icon: 'mdi-shield-key-outline'
                    },
                    {permission: true, name: this.$t('menu.about'), link: '/about', icon: 'mdi-information-outline'},
                    {permission: true, name: this.$t('menu.terms'), link: '/terms', icon: 'mdi-book-check-outline'},
                    {permission: true, name: this.$t('menu.logout'), link: '/logout', icon: 'mdi-logout'}
                ],
                userFullName: 'Anonymous',
                userPhotoUrl: '',
                // entries: [],
                // isLoading: false,
                // foundAddressModel: '',
                // searchAddress: '',
                // showHeaderSearch: true
            }
        },
        created() {
            this.subscribeToAppStateChanged()
        },
        mounted() {
            this.$i18n.locale = localStorage.getItem('cur_lang') || 'en'
            this.interval = setInterval(() => {
                this.date = new Date()
            }, 1000)

            if (this.loggedIn) {
                this.userFullName = (this.getExtUser.first_name || '') + ' ' +
                    (this.getExtUser.last_name || ''),
                    this.userPhotoUrl = this.getExtUser.photo_url || ''
            }

            if (this.getDbUser) {
                this.loadRole()
            }
            let msgLogout = localStorage.getItem('msg_logout')
            if (msgLogout) {
                this.$toast.success(this.$t('auth.logout'))
                localStorage.removeItem('msg_logout')
            }

        },
        methods: {
            async openMenu() {
                // if (this.getDbUser && this.getDbUser.role_id === CONSTANTS.ROLE.USER) {
                this.$userRoleUpdate()
                await this.$store.dispatch('GET_USER_PERMISSIONS', this.getDbUser.id)
                this.updateMenuItems()
                // }
            },
            onChangeLang: function () {
                // console.log('onChangeLanguage');
                // Change array Locale

                this.updateMenuItems()
            },
            updateMenuItems() {
                this.header_menu = [
                    {
                        permission: true,
                        name: this.$t('menu.profile'),
                        link: '/profile',
                        icon: 'mdi-account-circle-outline'
                    },
                    {
                        permission: this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_PANEL),
                        name: this.$t('menu.admin'),
                        link: '/admin',
                        icon: 'mdi-shield-key-outline'
                    },
                    {permission: true, name: this.$t('menu.about'), link: '/about', icon: 'mdi-information-outline'},
                    {permission: true, name: this.$t('menu.terms'), link: '/terms', icon: 'mdi-book-check-outline'},
                    {permission: true, name: this.$t('menu.logout'), link: '/logout', icon: 'mdi-logout'}
                ]
            },
            changeLang(lang) {

                localStorage.setItem('cur_lang', lang)
                this.$i18n.locale = lang
                this.$store.dispatch('APP_LANG', lang)

                this.onChangeLang()
            },
            subscribeToAppStateChanged() {
                // eslint-disable-next-line no-unused-vars
                this.unsubscribe = this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'STATE_CHANGED':
                            this.stateProcessing(state.appStates.currentState)
                            break;
                        case 'SET_DB_USER':
                            this.loadRole()
                            break;
                        case 'SET_USER_PERMISSIONS':
                            // console.log('SET_USER_PERMISSIONS ')
                            if (this.$store.getters.getUserPermissions) {
                                this.header_menu[1].permission = this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_PANEL)
                            }
                            break;
                    }
                });
            },
            stateProcessing(appState) {
                switch (appState) {
                    case CONSTANTS.APP_STATE.DEFAULT:
                        // this.showHeaderSearch = true
                        break;
                    case CONSTANTS.APP_STATE.ADD_EVENT:
                        // this.showHeaderSearch = false
                        break;
                    case CONSTANTS.APP_STATE.EDIT_EVENT:
                        // this.showHeaderSearch = false
                        break;
                    case CONSTANTS.APP_STATE.CANCEL_ADD_EVENT:
                        // this.showHeaderSearch = true
                        break;
                    case CONSTANTS.APP_STATE.CANCEL_EDIT_EVENT:
                        // this.showHeaderSearch = true
                        break;
                }
            },
            loadRole() {
                let roleId = this.getDbUser.role_id
                this.role = CONSTANTS.ROLES[roleId - 1]
            },
            async logout() {
                console.log('logout')
                // eslint-disable-next-line no-unused-vars
                await this.$store.dispatch('LOGOUT').then(res => {

                    localStorage.setItem('msg_logout', 'true')
                });

            },
            goto(path) {
                if (path === '/about' || path === '/terms') {
                    window.open('#' + path);
                } else if (path === '/') {
                    this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.DEFAULT)
                    if (path && this.$router.history.current.path !== path) {
                        this.$router.push('/').then(function () {
                            location.reload()
                        })
                    }
                } else if (path !== '/logout') {
                    this.$router.push(path)
                } else {
                    location.reload('/')
                    this.logout();
                }
                this.$store.dispatch('SET_EVENT_ID_FROM_PATH', null)
            },
            closeOrOpenLeftPanel() {
                this.$store.dispatch('SET_IS_LEFT_PANEL_OPEN', !this.$store.getters.getIsLeftPanelOpen)
            },
            closeOrOpenAdminLeftPanel() {
                this.$store.dispatch('SET_IS_ADMIN_LEFT_PANEL_OPEN', !this.$store.getters.getIsAdminLeftPanelOpen)
            },
        },
        watch: {
            async foundAddressModel(searchResult) {
                if (searchResult && searchResult.geojson) {
                    await this.$store.dispatch('SET_ADDRESS_SEARCH_RESULT', searchResult)
                    this.$root.$emit('foundAddressClick', searchResult.geojson)
                }
            },
            // async searchAddress() {
            //     // Items have already been loaded
            //
            //     if (!this.searchAddress) return
            //     if (this.searchAddress.length < 4) return
            //
            //     this.isLoading = true
            //
            //     await this.getAddressesByTextSearch(this.searchAddress)
            //         .then(searchResult => {
            //             this.entries = searchResult
            //         })
            //         .catch(e => {
            //             this.$store.dispatch('SET_ERROR', e)
            //             console.log('error- ' + e)
            //         })
            //         .finally(() => (this.isLoading = false))
            // }
        },
        computed: {
            // смешиваем результат mapGetters с внешним объектом computed
            ...mapGetters([
                'loggedIn',
                'isMobile',
                'getCurrentState',
                'getUserPermissions',
                'getDbUser',
                'getExtUser',
            ]),
            places() {
                return this.entries.map(entry => {
                    const addressName = entry.display_name

                    return Object.assign({}, entry, {addressName})
                })
            }
        },
        beforeDestroy() {
            this.unsubscribe();
        },
    }
</script>

<style>
  div.search-list {
    position: absolute;
    left: 40%;
    top: 45px;
    max-width: 506px;
  }

  @media only screen and (max-width: 959px) {
    div.search-list {
      position: absolute;
      left: 35%;
      top: 45px;
      max-width: 350px;
    }
  }

  @media only screen and (max-width: 650px) {
    div.search-list {
      position: absolute;
      left: 25%;
      top: 45px;
      max-width: 350px;
    }
  }
</style>
