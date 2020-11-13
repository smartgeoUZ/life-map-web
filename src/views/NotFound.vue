<template>
  <div class="NotFound">
    <!--<v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-3 mt-5">Page not found.</div>
            <div class="grey&#45;&#45;text lighten-5">
              The page you are trying to get to never existed in this reality,
              or has migrated to a parallel universe.
            </div>
            <div class="paragraph-text mt-2">
              <br />
              <br />Try going back to home page and repeating your action. Or,
              <a href="/">Click here..</a>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>-->
    <!--<v-container class="fill-height"
                 fluid>
      <v-row align="center"
             justify="center">
        <v-col cols="12"
               md="4"
               sm="8">
          <v-card class="elevation-6">
            <v-toolbar color="green accent-4"
                       dark
                       flat>
              <v-toolbar-title>{{ $t("notFound.title") }}</v-toolbar-title>
              <v-spacer></v-spacer>

            </v-toolbar>
            <v-card-text class="px-8 ">
              <p class="font-weight-medium">
                {{ $t("notFound.message") }}
              </p>
              <p  class="font-weight-medium">
                {{ $t("notFound.messageWithUrl") }}
              </p>
              <p  class="font-weight-medium">

               &lt;!&ndash; <i18n path="login.text3">
                  <a href="https://telegram.me/lifemap_bot" place="url" target="_blank">lifemap.uz</a>
                </i18n>&ndash;&gt;

                &lt;!&ndash;              {{ $t("login.text3", {url:('')}) }}&ndash;&gt;
              </p>
            </v-card-text>
            <v-card-actions class="pa-5 pt-2">
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>-->
    <v-container
            class="text-center"
            fill-height
            style="height: calc(90vh - 58px);"
    >
      <v-row align="center">
        <v-col>
          <h1 class="display-2 primary--text">{{$t('notFound.whoops')}}, 404</h1>

          <p>{{$t('notFound.messageText')}}</p>

          <v-btn
                  color="primary"
                  outlined
                  to="/"
          >
            {{$t('notFound.btnText')}}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
    export default {
        name: "NotFound"
    }
</script>

<style scoped>

</style>
