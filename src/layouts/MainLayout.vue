<template>
    <div>

        <cus-header  :btn-left-panel-show="false"></cus-header>

<!--        <left-panel></left-panel>-->


        <v-main class="app-content">
            <div class="app-page">
                <router-view/>
            </div>
        </v-main>
        <Footer></Footer>
    </div>
</template>

<script>
    import CusHeader from '../components/app/Header.vue'
    import Footer from '../components/app/Footer.vue'
    import messages from "../utils/messages";
    import * as authUtils from "../utils/auth-utils";
    import {mapGetters} from "vuex";
    // eslint-disable-next-line no-unused-vars
    export default {
        name: 'main-layout',
        data() {
            return {
            }
        },
        created() {
            // console.log('created');
            this.loadData()
        },
        methods: {
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
        mounted() {
            this.interval = setInterval(() => {
                this.date = new Date()
            }, 1000)
            // console.log(this.getDbUser)
        },

        beforeDestroy() {
            // console.log('beforeDestroy')
            clearInterval(this.interval)
            if (this.dropdown && this.dropdown.destroy) {
                this.dropdown.destroy()
            }
        },
        components: {
            CusHeader,
            Footer
        },
        computed: {
            ...mapGetters([
                'loggedIn',
                'isMobile',
                'getCurrentState',
                'getUserPermissions',
                'getDbUser',
                'getExtUser',
            ]),
            drawer() {
                return this.$store.getters.getIsLeftPanelOpen
            },
            isTyping() {
                return this.searchText.length > 0 ? 'display: block' : 'display: none'
            },
            error() {
                return this.$store.getters.error
            }
        },
        watch: {
            error(error) {
                // console.log('------watch------')
                // this.$error(messages[error.code] || 'Something went wrong')
                this.$error(error)
            }
        }
    }
</script>
