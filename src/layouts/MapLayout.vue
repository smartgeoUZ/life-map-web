<template>
  <div>

    <cus-header :btn-left-panel-show="true"></cus-header>

    <!--        <bottom-panel v-if="isMobile"></bottom-panel>-->
    <left-panel></left-panel>

    <v-main>
      <v-container align="center"
                   class="pa-0"
                   fluid
                   justify="center">
        <router-view></router-view>


      </v-container>

    </v-main>
  </div>
</template>

<script>
    import LeftPanel from '../components/app/LeftPanel.vue'
    // import BottomPanel from "../components/app/BottomPanel";
    import CusHeader from '../components/app/Header.vue'
    // eslint-disable-next-line no-unused-vars
    export default {
        name: 'map-layout',
        data() {
            return {
                direction: 'left',
                fab: false,
                transition: 'slide-x-reverse-transition',
            }
        },
        methods: {},
        mounted() {

            this.interval = setInterval(() => {
                this.date = new Date()
            }, 1000)

        },
        created() {
            let now = Date.now()
            let loginTime = localStorage.getItem('loginTime')
            if (!loginTime) {
                localStorage.setItem('loginTime', now)
            }
        },
        beforeDestroy() {
            // console.log('beforeDestroy')
            clearInterval(this.interval)
            if (this.dropdown && this.dropdown.destroy) {
                this.dropdown.destroy()
            }
        },
        components: {
            LeftPanel, CusHeader,
            // BottomPanel
        },
        computed: {
            isMobile() {
                return this.$store.getters.isMobile
            },
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
                // console.log(error)
                // this.$error(messages[error.code] || 'Something went wrong')
                this.$error(error)
            }
        }
    }
</script>
