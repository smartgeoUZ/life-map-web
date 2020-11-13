<template>
  <v-app v-resize="onResize">
    <component :is="layoutBase">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
    import EmptyLayout from './layouts/EmptyLayout'
    import MapLayout from './layouts/MapLayout'
    import MainLayout from './layouts/MainLayout'
    import * as appUtils from '../src/utils/app-utils'
    import store from "./store";
    import {CONSTANTS} from "./utils/constants";

    export default {
        name: 'App',
        data: () => ({
            //
        }),
        created() {
            // console.log('GLOBAL created')
            this.$store.dispatch('SET_IS_MOBILE', appUtils.isMobile())
            this.checkRouting()
        },
        mounted() {
            this.checkRouting()
            this.setAppLang()
        },
        computed: {
            layoutBase() {
                return (this.$route.meta.layout || 'empty') + '-layout'
            }
        },
        methods: {
            onResize() {
                this.$store.dispatch('SET_IS_MOBILE', appUtils.isMobile())
            },
            setAppLang() {
                let userLang = navigator.language || navigator.userLanguage;
                userLang = userLang.substring(0, 2)
                let curLang = localStorage.getItem('cur_lang')
                if (!curLang) {
                    localStorage.setItem('cur_lang', userLang)
                    this.$i18n.locale = userLang
                    this.$store.dispatch('APP_LANG', userLang)
                } else {
                    this.$i18n.locale = curLang
                    this.$store.dispatch('APP_LANG', curLang)
                }
            },
            checkRouting() {
                this.$router.beforeEach((to, from, next) => {
                    // let loggedIn = localStorage.getItem('loggedIn')
                    // console.log(to.matched.some(record => record.meta.requiresAuth))

                    if (to.matched.some(record => record.meta.requiresAuth)) {
                        // console.log(to.matched.some(record => record.meta.requiresAuth))
                        // console.log(store.getters.loggedIn)

                        if (!store.getters.loggedIn) {
                            next({
                                name: 'login'
                            })
                        } else {
                            console.log()
                            let basePath = to.path.substring(0,6)
                            if(basePath === '/admin' ){
                                if(this.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_PANEL)){
                                    next()
                                }else{
                                    this.$toast.warning('No Permission for role')
                                    next({
                                        name: from.name
                                    })
                                }
                            }
                            else next()
                        }
                    } else {
                        next()
                    }
                })
            }
        },
        components: {
            EmptyLayout, MainLayout, MapLayout
        },
    };
</script>
