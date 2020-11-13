<template>
  <v-container>
    <TemplateEn v-show="appLang=='en'"></TemplateEn>
    <TemplateRu v-show="appLang=='ru'"></TemplateRu>
    <TemplateUz v-show="appLang=='uz'"></TemplateUz>
  </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    import TemplateEn from "./TemplateEn";
    import TemplateRu from "./TemplateRu";
    import TemplateUz from "./TemplateUz";


    export default {
        name: "MainTermsPage",
        components: {
            TemplateEn,
            TemplateRu,
            TemplateUz
        },
        computed: {
            ...mapGetters([
                'isMobile',
                'appLang',
                'getDbUser',
            ]),
        },
    }
</script>

<style scoped>

</style>
