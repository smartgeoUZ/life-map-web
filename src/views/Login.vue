<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="px-6" cols="12" md="5" sm="8">
        <v-card class="elevation-6">
          <v-toolbar color="green accent-4"
                     dark
                     flat>
            <v-toolbar-title>{{ $t("login.registration") }}</v-toolbar-title>
            <v-spacer></v-spacer>

          </v-toolbar>
          <v-card-text :class="(isMobile ? 'px-6' : 'px-10') + ' pb-0 pt-7'">
            <p class="font-weight-medium">
              {{ $t("login.text1") }} <a href="https://telegram.org/" target="_blank">telegram.org</a>
            </p>
            <p class="font-weight-medium">
              {{ $t("login.text2") }}
            </p>
            <p class="font-weight-medium">

              <i18n path="login.text3">
                <a href="https://telegram.me/lifemap_bot" place="url" target="_blank">lifemap.uz</a>
              </i18n>

              <!--              {{ $t("login.text3", {url:('')}) }}-->
            </p>
          </v-card-text>
          <v-card-actions :class="(isMobile ? 'px-6' : 'px-12 ') + ' pa-0 body-2 text-center'">
            <v-checkbox :class="isMobile ? 'ml-2' : 'ml-12'" v-model="accept">
            </v-checkbox>

            <i18n path="login.acceptLabel">
              <a href="#/terms" place="url" target="_blank">{{$t('login.terms')}}</a>
            </i18n>


          </v-card-actions>
          <v-card-actions class="pa-4 pt-2">
            <v-spacer></v-spacer>

            <v-btn class="pa-4 mb-4 copy_telegram_btn" color="secondary" disabled rounded style="height: 40px"
                   v-show="!accept">
              <v-icon class="pa-2 pl-1 pr-3" left size="28" src="require('../assets/icons/telegram.png')">mdi-telegram
              </v-icon>
              <span class="pb-1">{{lang == 'en' ? 'Log in with Telegram': 'Войти через Telegram'}}</span>
            </v-btn>


            <div class="mb-4" ref="loginPanel" style="height: 40px" v-show="accept"></div>

            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    // import msgs from "../utils/messages";
    import {mapGetters} from "vuex";
    import * as authUtils from '../../src/utils/auth-utils'
    import {CONSTANTS} from "../utils/constants";
    import messages from "../utils/messages";
    import axios from "../plugins/api-axios";

    export default {
        name: 'Login',

        data: () => ({
            accept: false,
            lang: 'en'
        }),
        mounted() {
            this.createTelegramAuthScript()
            this.loadData()
        },
        created() {
            this.setBtnTextLang()
        },
        methods: {
            setBtnTextLang() {
                let browserLang = navigator.language || navigator.userLanguage;
                this.lang = browserLang = browserLang.substring(0, 2)
            },
            loadData() {
            },
            createTelegramAuthScript() {
                // create script with given params
                const script = document.createElement('script')
                script.async = true
                script.src = 'https://telegram.org/js/telegram-widget.js?11'
                script.setAttribute('data-size', 'large')

                script.setAttribute('data-telegram-login', CONSTANTS.BOT_NAME)
                script.setAttribute('data-onauth', 'onTelegramAuth(user)')
                script.setAttribute('data-request-access', 'write')

                this.$refs.loginPanel.appendChild(script)

                window.onTelegramAuth = this.onTelegramAuth
            },
            async onTelegramAuth(user) {
                // console.log(user.photo_url)
                let isValidTelegramData = authUtils.checkSignature(user)


                if (isValidTelegramData) {

                    if (!authUtils.tokenDateIsExpired(user.auth_date)) {

                        this.saveExtUser(user)

                        await this.updateTelegramUserData(user)

                        this.getUserFromDb(user)

                    } else {
                        await this.$store.dispatch('LOGOUT')
                    }
                } else {
                    await this.$store.dispatch('LOGOUT')
                }
            },
            saveExtUser(user) {
                this.$store.dispatch('SET_EXT_USER', user)
                    .then(() => {
                        // console.log('SET_EXT_USER END')
                    });
            },
            async getUserFromDb(user) {
                // console.log('getUserFromDb check block')
                await this.$store.dispatch('GET_USER_BY_ID_AND_UPDATE', user).then(async res => {
                    if (res.data.result) {
                        if (res.data.result.is_blocked) {
                            // this.$warning(messages['user_blocked'] || 'Something went wrong')
                            this.$toast.warning(this.$t('auth.userBlocked'))
                        } else {
                            await this.$store.dispatch('SET_DB_USER', res.data.result)
                            // this.$message(messages['auth_success'])
                            this.$toast.success(this.$t('auth.success'))
                            await this.$router.push('/')
                        }
                    } else {
                        this.createDbUser(user)
                    }
                }, error => {
                    console.log('BY_ID_AND_UPDATE -- ERROR : ' + error)
                    console.error("Got nothing from server. Prompt user to check internet connection and try again")
                })
            },

            async createDbUser(user) {
                // eslint-disable-next-line no-unused-vars
                await this.$store.dispatch('SAVE_DB_USER', user).then(async userId => {
                    await this.$store.dispatch('GET_USER_BY_EXT_ID', this.$store.getters.getExtUser.id).then(async dbUser => {
                        if (dbUser) {
                            await this.$store.dispatch('SET_DB_USER', dbUser)
                            this.$message(messages['auth_success'])
                            await this.$router.push('/')
                        } else {
                            this.$error('User not registered')
                        }
                    }, error => {
                        console.log('GET_USER_BY_EXT_ID -- ERROR : ' + error)
                        console.error("Got nothing from server. Prompt user to check internet connection and try again")
                    })
                }, error => {
                    console.log('BY_ID_AND_UPDATE -- ERROR : ' + error)
                    console.error("Got nothing from server. Prompt user to check internet connection and try again")
                })
            },
            async updateTelegramUserData(user) {
                // console.log(user)
                try {
                    if (!axios.defaults.headers.common['Authorization']) {
                        // console.log('EMPTY AUTH HEADER DATA')
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.hash
                    }

                    // console.log(user)

                    let postParams = JSON.stringify({
                        ext_user_id: user.id,
                        login: user.username || '',
                        auth_type_id: CONSTANTS.AUTH_TYPE.TELEGRAM,
                        photo_url: user.photo_url || ''
                    })

                    return axios.post('user/protected/updateUserData', postParams)
                        .then(async res => {

                            if (res.data.result) {
                                // console.log('TELEGRAM USER DATA UPDATED ' + res.data.result.id)

                                return res.data.result.id
                            } else {

                                console.log(res.data.error)
                                return 0
                            }
                        })
                        .catch(e => {
                            this.$store.dispatch('SET_ERROR', e)
                            console.log('error- ' + e)
                        })
                } catch (e) {
                    console.log(e)
                    await this.$store.dispatch('SET_ERROR', e)
                    throw e
                }
            }

        },
        computed: {
            // смешиваем результат mapGetters с внешним объектом computed
            ...mapGetters([
                'isMobile',
                'appLang',
                'getCurrentState',
                'getDbUser',
            ]),
            // isXSmallScreen() {
            //     return this.windowSize.x < 700
            // },
            // isSmallScreen() {
            //     return this.windowSize.x < 960
            // },
            // isNormalScreen() {
            //     return this.windowSize.x < 940 <this.windowSize.x < 1460
            // }
        },
    }
</script>
<style>
  button.copy_telegram_btn {
    height: 40px;
    text-transform: none;
    padding: 9px 21px 11px;
    font: 400 13.3333px Arial;
  }
</style>
