<template>
  <v-footer app color="primary" fixed>
    <v-row class="ma-0 my-1" justify="center">
      <span class="white--text">&copy; {{ new Date().getFullYear() }} — <strong>SMARTGEO LLC.</strong> All rights reserved.</span>
    </v-row>
  </v-footer>
</template>

<script>
    export default {
        name: "Footer.vue",
        data() {
            return{

            }
        }
    }
</script>

<style scoped>

</style>
