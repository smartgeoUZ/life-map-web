<template>
  <v-container class="px-5" v-resize="onResize">
    <v-row class="mx-2">
      <v-col>
        <div class="text-h4 textGrey--text">
          {{$t('menu.layers')}}
        </div>
        <!--        <v-btn @click="getPerWithRp(permissions.slice(), rp)">Load data</v-btn>-->
      </v-col>
    </v-row>

    <div class="px-sm-0 px-md-4">
      <v-card class="px-2"
              max-width="550"
              tile
              v-if="layers != null">
        <v-list>
          <v-subheader class="ml-16 mr-2">Category name
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            Status
            <v-spacer></v-spacer>
            Actual Days
          </v-subheader>
          <v-list-item :key="layer.id" style="height: 56px" v-for="(layer, i) in layers">
            <v-list-item-icon class="ml-0 mr-4">
              <img :src="iconsUrl[i+1]" height="32" width="32">
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{layer.description}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="mr-1">
                <v-icon :color="layer.is_active ? 'primary' : 'grey'" >
                  {{ layer.is_active ? 'mdi-eye-outline' : 'mdi-eye-off-outline' }}
                </v-icon>
            </v-list-item-action>
            <v-list-item-action class="mr-2">
              <v-checkbox :input-value="layer.is_active" @click.native="updateLayerActive(layer)"
                          hide-details></v-checkbox>
            </v-list-item-action>
            <v-list-item-action>
           <!--   <v-chip
                      class="ma-2"
                      close
                      filter
                      filter-icon="mdi-minus"
                      close-icon="mdi-plus">

                {{layer.duration_min / (60*24)}}
              </v-chip>-->
              <v-btn color="primary" depressed outlined rounded style="width: 90px">
                <v-icon @click="minusDurationMin(layer, i)" left>mdi-minus</v-icon>
                <v-spacer></v-spacer>
                {{layer.duration_min / (60*24)}}
                <v-spacer></v-spacer>
                <v-icon @click="plusDurationMin(layer, i)" right>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <!-- <div class="text-center pt-4">
       <v-pagination :length="pageCount" total-visible="7" v-model="page"></v-pagination>
     </div>-->

  </v-container>
</template>

<script>
    import axios from "../../plugins/api-axios";
    import {mapGetters} from "vuex";
    import {CONSTANTS} from "../../utils/constants";

    // eslint-disable-next-line no-unused-vars
    let self = null

    export default {
        name: "Layer",
        data() {
            self = this
            return {
                windowSize: {
                    x: 0,
                    y: 0,
                },
                iconsUrl: CONSTANTS.ICONS_URL,
                layers: null,
            }
        },
        components: {},
        methods: {
            subscribeToAppStateChanged() {
                this.unsubscribe = this.$store.subscribe((mutation) => {
                    switch (mutation.type) {
                        case 'APP_LANG':
                            // console.log('APP_LANG')
                            this.onChangeLang()
                            break;
                    }
                });
            },
            onChangeLang: function () {
                // Change array Locale

            },
            onResize() {
                // this.filterPanelHeight = document.getElementById('filter-panel').offsetHeight;
                this.windowSize = {x: window.innerWidth, y: window.innerHeight}
            },

            getDataFromDB() {
                axios.get('eventCategory/getList')
                    .then(res => {
                        if (res.data.result) {
                            // this.$toast.success('getEvents')

                            this.layers = res.data.result

                        } else {
                            console.log(res.data.error)
                            // console.log('--007')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--008')
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })


            },
            goto(item) {
                window.open('https://t.me/' + item.login)
            },

            minusDurationMin(layer, i) {
                this.layers[i].duration_min = layer.duration_min - (60*24)
                this.updateDurationMin(this.layers[i])
            },
            plusDurationMin(layer, i) {
                this.layers[i].duration_min = layer.duration_min + (60*24)
                this.updateDurationMin(this.layers[i])
            },

            updateLayerActive(layer) {
                let postParams = JSON.stringify({
                    id: layer.id, // Id разрешения роли
                    isActive: !(layer.is_active)
                })
                axios.post('eventCategory/updateIsActive', postParams)
                    .then(res => {
                        if (res.data.result) {
                            this.$toast.success('saved')
                            this.getDataFromDB()
                        } else {
                            console.log(res.data.error)
                            // console.log('--007')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--008')
                        this.$store.dispatch('SET_ERROR', e)

                        console.log('error- ' + e)
                    })
            },

            updateDurationMin(layer) {
                let durationMin = layer.duration_min
                let postParams = JSON.stringify({
                    id: layer.id, // Id разрешения роли
                    durationMin: durationMin
                })
                axios.post('eventCategory/updateDurationMin', postParams)
                    .then(res => {
                        if (res.data.result) {
                            this.$toast.success('saved')
                            this.getDataFromDB()
                        } else {
                            console.log(res.data.error)
                            // console.log('--007')
                            this.$store.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--008')
                        this.$store.dispatch('SET_ERROR', e)

                        console.log('error- ' + e)
                    })
            },
        },
        computed: {
            ...mapGetters([
                'appLang',
            ])
        },
        watch: {},
        created() {
            this.getDataFromDB()
            this.subscribeToAppStateChanged()
        },
        mounted() {
            this.onResize()
        },

    }

</script>

<style scoped>
  .date-picker-border {
    border: 1px solid #9e9e9e !important;
    border-radius: 5px;
    padding: 7px 12px !important;
    width: 100%;
  }

  #users-table > .v-data-table__wrapper > table > thead > tr > th {
    font-size: 15px !important;
  }
</style>

