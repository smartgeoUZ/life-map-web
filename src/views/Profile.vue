<template>
  <v-container style="max-width: 100%; ">
    <v-row class="mx-2">
      <v-col cols="12" md="6" sm="12">
        <v-row justify="space-around">
          <v-col align="right" cols="12" lg="6" md="10" sm="12">
            <v-card class="ma-5" elevation="0">
              <v-card-actions class="ml-1">
                <v-spacer></v-spacer>

                <v-btn @click="logout()" class="secondary" light>{{$t('login.logout')}}</v-btn>
                <v-spacer></v-spacer>

                <v-avatar class="profile offset-2"
                          color="grey"
                          size="120">
                  <v-img :src="user.photo_url"></v-img>
                </v-avatar>
              </v-card-actions>
            </v-card>
            <v-form v-model="valid">
              <v-text-field :label="$t('message.telegramUserName')"
                            :value="'@'+ user.login"
                            class="custom-input"
                            dense
                            outlined
                            disabled
                            readonly
              ></v-text-field>
              <v-text-field :label="$t('message.firstName')"
                            dense
                            outlined
                            v-model="user.first_name"
              ></v-text-field>
              <v-text-field :label="$t('message.lastName')"
                            dense
                            outlined
                            v-model="user.last_name"
              ></v-text-field>
              <v-text-field :label="$t('message.mobileNumber')"
                            :value="getPhoneFormat(user.phone_mobile)"
                            dense
                            outlined
                            disabled
                            readonly
              ></v-text-field>
              <!--                            v-model="user.phone_mobile"-->
              <v-text-field :label="$t('message.email')"
                            :rules="emailRules"
                            dense
                            outlined
                            v-model="user.email"
              ></v-text-field>
              <v-row class="px-4" justify="space-between">
                <div>
                  <v-btn @click="back()">{{ $t("message.back") }}</v-btn>
                </div>
                <div>
<!--                  <v-btn @click="clear()" class="mr-4">{{ $t("message.clear") }}</v-btn>-->
                  <v-btn :disabled="!valid" @click="updateProfile()" class="success">{{ $t("message.save") }}</v-btn>
                </div>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="6" sm="12">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import axios from "../plugins/api-axios";
    import {mapGetters} from "vuex";
    // import messages from "../utils/messages";

    export default {
        name: "Profile",
        data: () => ({
            user: {
                login: '',
                first_name: '',
                last_name: '',
                phone_mobile: '',
                email: '',
                photo_url: '',
                role_id: null,
            },
            valid: false,
            emailRules: [
                v => !v || (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v))
            ]
        }),
        mounted() {
            this.loadData()
        },
        methods: {
            getPhoneFormat(strPhone) {
                if (strPhone) {
                    strPhone.replace('+','')
                    let countryCode = strPhone.substring(0, 3);
                    let code = strPhone.substring(3, 5);
                    let shortNumberStart = strPhone.substring(5, 8);
                    let shortNumberCenter = strPhone.substring(8, 10);
                    let shortNumberEnd = strPhone.substring(10, 12);
                    return '+' + countryCode + ' ' + code + ' ' + shortNumberStart + ' ' + shortNumberCenter + ' ' + shortNumberEnd
                } else return ''
            },
            async logout() {
                console.log('logout')
                // eslint-disable-next-line no-unused-vars
                await this.$store.dispatch('LOGOUT').then(res => {
                    this.$router.push('/')
                    localStorage.setItem('msg_logout', 'true')
                });

            },
            async loadData() {
                if (this.getDbUser) {
                    this.user = Object.assign({}, this.getDbUser)
                } else {
                    await this.getUserFromDbAndStore()
                }
            },
            updateProfile() {
                let postParams = JSON.stringify({
                    id: this.getDbUser.id,
                    firstName: this.user.first_name,
                    lastName: this.user.last_name,
                    email: this.user.email
                })
                axios.post('user/protected/updateProfile', postParams)
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('Profile updated')
                            this.getUserFromDbAndStore()
                            this.$toast.success(this.$t("notification.saved"))
                        } else {
                            console.log(res.data.error)
                            // console.log('--051')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--051')
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })

            },
            async getUserFromDbAndStore() {
                await this.$store.dispatch('GET_USER_BY_EXT_ID', this.getExtUser.id).then(async dbUser => {
                    if (dbUser) {
                        this.user = Object.assign({}, dbUser)
                        await this.$store.dispatch('SET_DB_USER', Object.assign({}, dbUser))
                    }
                }, error => {
                    console.log('GET_USER_BY_EXT_ID -- ERROR : ' + error)
                    console.error("Got nothing from server. Prompt user to check internet connection and try again")
                })
            },
            clear() {
                this.user = Object.assign({}, this.getDbUser)
            },
            back() {
                this.$router.go(-1)
            },
        },
        computed: {
            // смешиваем результат mapGetters с внешним объектом computed
            ...mapGetters([
                'getExtUser',
                'getDbUser'
            ])
        }
    }
</script>

<style scoped>
  div.v-text-field--outlined .v-text-field__prefix {
    padding-right: 1px !important;
  }
</style>

