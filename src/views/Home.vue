<template>
  <div>
    <loader v-if="loading"></loader>
    <Map>
    </Map>

  </div>

</template>

<script>
    import msgs from "../utils/messages";
    import Loader from "../components/Loader"
    import Map from '../views/Map'

    export default {
        name: 'home',
        components: {
            Loader, Map
        },
        data() {
            return {
                users: [],
                info: null,
                loading: false,
                errored: false
            };
        },
        created() {
            this.subscribeToLoader()
            let eventId = this.$route.params.id
            // console.log(this.$route.query)
            if (eventId) {
                this.$store.dispatch('SET_EVENT_ID_FROM_PATH', eventId)
            }


        },
        mounted() {
            // this.watchLoader()
            if (msgs[this.$route.query.message]) {
                this.$message(msgs[this.$route.query.message])
            }
            //
            // console.log(this.$axios)
            // console.log(axios)
            // console.log(this.$http)
            // console.log(this.$api)


            // console.log(new Date())
            // console.log(new Date().toUTCString())
            // console.log(new Date().toISOString())
            // console.log(new Date().toLocaleString())
        },
        methods: {
            subscribeToLoader() {
                this.unsubscribe = this.$store.subscribe((mutation) => {
                    if (mutation.type === 'SET_IS_LOADING') {
                        this.loading = mutation.payload
                    }
                });
            },
        },
        beforeDestroy() {
            // console.log('beforeDestroy')
            this.unsubscribe();
        },
    }
</script>
