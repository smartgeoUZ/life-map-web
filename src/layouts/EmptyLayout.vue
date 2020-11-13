<template>
  <v-main class="app-content">
      <router-view/>
  </v-main>
</template>

<script>
  import messages from "../utils/messages";

    export default {
        computed: {
            error() {
                return this.$store.getters.error
            }
        },
        watch: {
            error(fbError) {
                // console.log('------watch------')
                // console.log(fbError)
                this.$error(messages[fbError.code] || 'Something went wrong')
            }
        }
    }
</script>
