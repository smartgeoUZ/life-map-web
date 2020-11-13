import Vue from 'vue'
import Vuelidate from "vuelidate";
import App from './App.vue'
import routes from './router/index'
import store from './store'
import dateFilter from './filters/date.filter'
import messagePlugin from './utils/message.plugin.js'
import VueRouter from 'vue-router'
import VueGeolocation from 'vue-browser-geolocation';
import './style/main.scss'

import VueI18n from 'vue-i18n'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

import './assets/popup/ol-popup.css';

import commonLanguage from './lang/common-language'

import vuetify from './plugins/vuetify';
import {CONSTANTS} from "./utils/constants";

require("flatpickr/dist/themes/light.css");
require("flatpickr/dist/l10n/ru.js");
require("flatpickr/dist/l10n/uz.js");


const flatpickr = require("flatpickr");

Vue.use(VueI18n)
const messages = commonLanguage

// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
})

// eslint-disable-next-line no-unused-vars
Vue.use(flatpickr)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.use(VueGeolocation);
Vue.use(VueToast, {
    position: 'bottom-right',
    duration: 5000
});
Vue.filter('date', dateFilter)

Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    // mode: 'history'
})
/*
router.beforeEach((to, from, next) => {
    // let loggedIn = localStorage.getItem('loggedIn')
    if (to.matched.some(record => record.meta.requiresAuth)) {
        console.log(to.matched.some(record => record.meta.requiresAuth))

        // let loggedTime = localStorage.getItem('loggedTime')
        // let now = new Date().getTime()
        // loggedTime = parseInt(loggedTime) + 43200000
        // console.log(loggedTime)
        // console.log(now)
        // if (loggedTime < now) {
        //     localStorage.removeItem('loggedIn')
        //     localStorage.removeItem('loggedTime')
        // }
        if (!store.getters.loggedIn) {
                next({
                    name: 'login'
                })
        } else {
            console.log()
            let basePath = to.path.substring(0,6)
            if(basePath === '/admin' ){
                if(self.$getPermission(CONSTANTS.PERMISSION.VIEW_ADMIN_PANEL)){
                    next()
                }else{
                    self.$toast.warning('No Permission for role')
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
})*/

Vue.mixin({
    created: function () {
    },
    methods: {
        // $sayHello(msg) {
        //     // this.$toast.success('sayHello')
        //     this.$toast.info(msg)
        // },
        $getPermission(permissionName) {
            let hasAccess = false
            switch (permissionName) {
                case CONSTANTS.PERMISSION.ADD_EVENT:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.ADD_EVENT)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT)
                    break;
                case CONSTANTS.PERMISSION.DELETE_EVENT:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.DELETE_EVENT)
                    break;
                case CONSTANTS.PERMISSION.RESPONSE_TO_HELP:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.RESPONSE_TO_HELP)
                    break;
                case CONSTANTS.PERMISSION.BLOCK_USER:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.BLOCK_USER)
                    break;
                case CONSTANTS.PERMISSION.MODERATE_EVENT:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.MODERATE_EVENT)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_DURATION:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_DURATION)
                    break;
                case CONSTANTS.PERMISSION.PREVIEW_EVENT_EDITING:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.PREVIEW_EVENT_EDITING)
                    break;


                case CONSTANTS.PERMISSION.EDIT_EVENT_CATEGORY:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_CATEGORY)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_NAME:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_NAME)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_START_DATE:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_START_DATE)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_END_DATE:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_END_DATE)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_COORDINATES:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_COORDINATES)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_NAME_VISIBILITY:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_NAME_VISIBILITY)
                    break;
                case CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION_VISIBILITY:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION_VISIBILITY)
                    break;

                case CONSTANTS.PERMISSION.VIEW_ADMIN_PANEL:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.VIEW_ADMIN_PANEL)
                    break;
                case CONSTANTS.PERMISSION.VIEW_ADMIN_DASHBOARD:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.VIEW_ADMIN_DASHBOARD)
                    break;
                case CONSTANTS.PERMISSION.VIEW_ADMIN_EVENTS:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.VIEW_ADMIN_EVENTS)
                    break;
                case CONSTANTS.PERMISSION.VIEW_ADMIN_USERS:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.VIEW_ADMIN_USERS)
                    break;
                case CONSTANTS.PERMISSION.VIEW_ADMIN_ROLES:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.VIEW_ADMIN_ROLES)
                    break;
                case CONSTANTS.PERMISSION.VIEW_ADMIN_LAYERS:
                    hasAccess = this.hasAccess(CONSTANTS.PERMISSION.VIEW_ADMIN_LAYERS)
                    break;

                default :
                    hasAccess = false
            }
            // console.log(hasAccess)
            return hasAccess
        },
        hasAccess(permissionName) {
            // console.log(permissionName + ' for roleId ' + this.$store.getters.getDbUser.role_id)
            let access_value = 0
            let hasAccess = false
            let userPermissions = this.$store.getters.getUserPermissions

            if (userPermissions) {
                let userPermission = userPermissions.filter(userPermission => {
                    return userPermission.name === permissionName
                })
                if (userPermission[0]) {
                    access_value = userPermission[0].access_value


                    switch (permissionName) {
                        case CONSTANTS.PERMISSION.ADD_EVENT:
                            hasAccess = access_value >= 2
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT:
                            hasAccess = access_value >= 4
                            break;
                        case CONSTANTS.PERMISSION.DELETE_EVENT:
                            hasAccess = access_value >= 8
                            break;
                        case CONSTANTS.PERMISSION.RESPONSE_TO_HELP:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.BLOCK_USER:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.MODERATE_EVENT:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_DURATION:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.PREVIEW_EVENT_EDITING:
                            hasAccess = access_value >= 15
                            break;

                        case CONSTANTS.PERMISSION.EDIT_EVENT_CATEGORY:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_NAME:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_START_DATE:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_END_DATE:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_COORDINATES:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_NAME_VISIBILITY:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.EDIT_EVENT_DESCRIPTION_VISIBILITY:
                            hasAccess = access_value >= 15
                            break;

                        case CONSTANTS.PERMISSION.VIEW_ADMIN_PANEL:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.VIEW_ADMIN_DASHBOARD:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.VIEW_ADMIN_EVENTS:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.VIEW_ADMIN_USERS:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.VIEW_ADMIN_ROLES:
                            hasAccess = access_value >= 15
                            break;
                        case CONSTANTS.PERMISSION.VIEW_ADMIN_LAYERS:
                            hasAccess = access_value >= 15
                            break;

                        default :
                            hasAccess = false
                    }
                }
            }

            // console.log(access_value)
            // console.log(hasAccess)
            return hasAccess

        },
        // eslint-disable-next-line no-unused-vars
        getDate(date, days, hours, minutes) {
            let result = new Date(date);

            if (days) {
                result.setDate(result.getDate() + days);
            }

            if (hours) {
                result.setHours(hours);
            }

            if (minutes) {
                result.setMinutes(minutes);
            }

            return result.toISOString();
        },
        // eslint-disable-next-line no-unused-vars
        getDateWithCustomTime(date, hours, minutes) {
            let result = new Date(date);

            if (hours) {
                result.setHours(hours);
            }

            if (minutes) {
                result.setMinutes(minutes);
            }

            return result.toISOString();
        },

        // eslint-disable-next-line no-unused-vars
        getDateWithoutTime(date, days) {
            let result = new Date(date.getFullYear(), date.getMonth(), date.getDate())

            if (days) {
                result.setDate(result.getDate() + days);
            }

            return result.toISOString();
        },
        addSpaceByLimit(s, ch, limit) {
            const cyrillicPattern = /^\p{Script=Cyrillic}+$/u;
            limit = cyrillicPattern.test(s) ? 22 : limit

            var rx = new RegExp(
                "[A-Za-z_а-яА-ЯЁё_0-9]{" + limit + "}" + // Match a digit, limit times
                "(?!" +  // Only match if, immediately to the right, there is no
                ch.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + // delimiting char (escaped)
                "|$)", // or end of string
                "g"); // Global modifier, replace all occurrences

            let res = s.replace(rx, "$&" + ch)
            return res ? res : s; // Replace with the match itself + delimiting char
        },
        async $userRoleUpdate() {
            // console.log('userRoleUpdate start 3333')
            await this.$store.dispatch('GET_USER_BY_EXT_ID', this.getExtUser.id).then(async dbUser => {
                if (dbUser) {
                    // console.log('userRoleUpdate success 333')
                    // console.log(dbUser)
                    await this.$store.dispatch('SET_DB_USER', dbUser)
                    // console.log('SET_DB_USER done 3333')
                }
            }, error => {
                console.log('userRoleUpdate -- ERROR : ' + error)
                console.error("Got nothing from server. Prompt user to check internet connection and try again")
            })
        },
    }
})


let app

if (!app) {
    new Vue({
        router,
        store,
        i18n,
        created: function () {
            Vue.prototype.$featureTypeCircle = 'Circle'
            Vue.prototype.$featureTypeLineString = 'LineString'
            Vue.prototype.$featureTypePolygon = 'Polygon'
            Vue.prototype.featureTypePoint = 'Point'
        },
        vuetify,
        mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
        render:
            h => h(App)
    }).$mount('#app')
}

Vue.config.productionTip = false

