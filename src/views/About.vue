<template>
  <div class="ma-0 pa-0" v-resize="onResize">
    <v-img :src="require('../../src/assets/images/heart-leaf-in-hands.jpg')"
           dark
           height="380"
           position="center">
      <!--    <div  :style="{backgroundImage: 'url(' + imageFirst + ')'}">-->


      <v-row class="text-center mx-6 pt-10 pb-16">
        <v-col class="mt-10 mb-16">
          <div class="display-2 font-weight-bold mb-3">
            {{$t('about.titleLifeMap')}}
          </div>

          <div :class="isXSmallScreen ? 'body-1' : 'text-h5'">
            {{$t('about.subtitleLifeMap')}}
          </div>
        </v-col>
      </v-row>
      <!--    </div>-->
    </v-img>

    <v-row class="text-center mx-6" justify="center">
      <v-col :class="isXSmallScreen ? 'my-10' : 'my-16'">
        <div :class="(isXSmallScreen ? 'body-1' : 'text-h5') + ' textGrey--text font-weight-medium mb-3'"
             style=" line-height: inherit;">
          {{$t('about.textWithoutImage1')}}
          <br>
          {{$t('about.textWithoutImage2')}}
          <br>
          {{$t('about.textWithoutImage3')}}
          <br>
          <i18n path="about.textWithoutImage4">
            <a href="https://t.me/lifemapuz" place="url" target="_blank">@lifemapuz</a>
          </i18n>
        </div>
      </v-col>
    </v-row>
    <v-parallax
            :src="require('../../src/assets/images/background4.jpg')"
            :height="textLicenseHeight + 360">

      <v-row class="text-center mx-8">

        <v-col class="my-12" cols="12">
          <div :class="(isXSmallScreen ? 'text-h5' : 'display-2') + ' font-weight-bold mb-4'">
            {{$t('about.titleLicense')}}

          </div>

          <div :class="isXSmallScreen ? 'subheading' : 'text-h6'" id="text-license">
            <i18n path="about.textLicense">
              <a href="https://www.apache.org/licenses/LICENSE-2.0" place="urlApache" target="_blank">Apache 2.0</a>
            </i18n>

          </div>
          <v-img
                  :src="require('../assets/images/open_source_logo.png')"
                  class="mt-3"
                  contain
                  height="160"
          />
        </v-col>
      </v-row>
    </v-parallax>
    <v-row class="text-center pt-12 pb-8 mx-6">
      <v-col>
        <div :class="(isXSmallScreen ? 'text-h5' : 'display-1') + ' textGrey--text font-weight-bold mb-3'">
          {{$t('about.titleSteps')}}
        </div>
      </v-col>
    </v-row>
    <v-row class="text-center pb-12 mx-6" justify="center">
      <v-col class="pr-6" cols="12" md="8" sm="10">
        <v-timeline :dense="isXSmallScreen" :reverse="reverse">
          <v-timeline-item
                  v-for="step in steps"
                  :key="step.id"
                  small
                  v-show="step.image">
            <v-card slot="opposite">
              <v-card-title class="py-2 primary justify-center">
                <div :class="(isSmallScreen ? 'body-1' : 'text-h5') + ' white--text font-weight-medium'">
                  {{step.num + '. ' + step.header}}
                </div>
              </v-card-title>
            </v-card>
            <v-card>
              <v-card-title class="py-2 primary justify-center" dark v-show="isXSmallScreen">
                <div :class="(isSmallScreen ? 'body-2' : 'text-h5') + ' white--text font-weight-medium'">
                  {{step.num + '. ' + step.header}}
                </div>
              </v-card-title>
              <v-container>
                <v-img :src="step.image" width="auto"></v-img>
              </v-container>
            </v-card>
          </v-timeline-item>
          <v-timeline-item small>
            <v-card slot="opposite">
              <v-card-title class="py-2 primary justify-center">
                <div :class="(isSmallScreen ? 'body-2' : 'text-h5') + ' white--text font-weight-medium'">
                  {{$t('about.step7')}}
                </div>
              </v-card-title>
            </v-card>
            <v-card>
              <v-card-title class="py-2 primary justify-center" v-show="isXSmallScreen">
                <div :class="(isSmallScreen ? 'body-2' : 'text-h5') + ' white--text font-weight-medium'">
                  {{$t('about.step7')}}
                </div>
              </v-card-title>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>

    </v-row>
    <!--  <v-row class="my-12 text-center" justify="space-around">
        <v-col cols="10">
          <span class="text-h5 secondary&#45;&#45;text font-weight-bold"> {{$t('about.titleAfterSteps')}}</span>
        </v-col>
      </v-row>-->
    <v-row class="my-12 mx-8" style="height: 5px;background-color: #00c853"></v-row>

    <v-row align="center" class="my-12 text-center mx-6">
      <v-col cols="12">
        <div :class="(isXSmallScreen ? 'text-h5' : 'display-1') + ' textGrey--text font-weight-bold mb-3'">
          {{$t('about.titleOrganizers')}}
        </div>
      </v-col>
    </v-row>
    <!-- <v-sheet
             :class="isXSmallScreen ? 'mx-auto px-6' : 'mx-auto px-16' "
             elevation="0"
             :max-width="windowSize.x">
       <v-slide-group
             v-model="model"
             class="pa-4">
       <v-slide-item
               v-for="item in organization"
               :key="item.id"
               v-show="item.image"
               v-slot:default="{ active, toggle }">
         <v-card elevation="0"
                 class="ma-4 px-6"
                 :height="item.width"
                 @click="toggle"
         >
           <img :src="item.image"
                :height="item.width"
                @click="goto(item.url)"
                position="center"
                v-if="item.image">
         </v-card>


       </v-slide-item>
     </v-slide-group>
     </v-sheet>-->
    <v-row :justify="windowSize.x <= 240 ? 'space-between' : 'center'" class="ma-0 px-5">
      <v-col :key="item.id"
             @click="goto(item.url)"
             align="center"
             align-self="center"
             class="mx-5"
             cols="12"
             :md="item.id > 5 ? 3 : 2" sm="5" v-for="item in organization"
             v-show="item.image">
        <img :height="item.width + (isMobile ? 0 : 50)"
             :src="item.image"
             class="in-hover-img"
             style="cursor: pointer"
             v-if="item.image">
        <!--        <span class="white--text text-h2" v-else>{{item.alt}}</span>-->
        <!--      <div class="my-4 mb-12 headline text-center">{{appLang === 'ru' ? member.nameRu : member.nameEn}}</div>-->
      </v-col>
      <!-- <v-img :src="require('../../src/assets/images/organizers.png')"
              height="auto"
              position="center">
       </v-img>-->
    </v-row>
    <v-row class="my-12 mx-8" style="height: 5px;background-color: #00c853"></v-row>
    <v-row class="mx-6 my-8 text-center" justify="center">
      <v-col cols="12">
        <div :class="(isXSmallScreen ? 'text-h5' : 'display-1') + ' textGrey--text font-weight-bold mb-3'">
          {{$t('about.titleOurTeam')}}
        </div>
      </v-col>
    </v-row>

    <v-row :justify="windowSize.x <= 240 ? 'space-between' : 'center'" align="center" class="ma-0">
      <v-col v-for="member in teamMembers"
             :key="member.id"
             align="center"
             class="mx-6 my-4"
             cols="12"
             md="3" sm="5">
        <v-avatar :size="windowSize.x < 250 ? windowSize.x-60 : '220'" color="blue-grey lighten-2">
          <img :alt="member.alt" :src="member.image" v-if="member.image">
          <span v-else class="white--text text-h1">{{member.alt}}</span>
        </v-avatar>
        <div class="my-4 mb-12 headline text-center">{{appLang === 'ru' ? member.nameRu : member.nameEn}}</div>
      </v-col>
    </v-row>

  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    // eslint-disable-next-line no-unused-vars
    let self
    let localLang = localStorage.getItem('cur_lang')

    export default {
        name: 'About',
        data: function () {
            self = this
            return {
                model: null,
                windowSize: {
                    x: 0,
                    y: 0,
                },
                textLicenseHeight: 0,
                reverse: false,
                imageFirst: require('../../src/assets/images/heart-leaf-in-hands.jpg'),
                steps: [
                    {
                        id: 1,
                        num: '1',
                        header: this.$t('about.step1'),
                        image: require('../assets/images/' + localLang + '/1.png')
                    },
                    {
                        id: 2,
                        num: '1.1',
                        header: this.$t('about.step1_1'),
                        image: require('../assets/images/' + localLang + '/1_1.png')
                    },
                    {
                        id: 3,
                        num: '1.2',
                        header: this.$t('about.step1_2'),
                        image: require('../assets/images/' + localLang + '/1_2.png')
                    },
                    {
                        id: 4,
                        num: '1.3',
                        header: this.$t('about.step1_3'),
                        image: require('../assets/images/' + localLang + '/1_3.png')
                    },
                    {
                        id: 5,
                        num: '1.4',
                        header: this.$t('about.step1_4'),
                        image: require('../assets/images/' + localLang + '/1_4.png')
                    },
                    {
                        id: 6,
                        num: '2',
                        header: this.$t('about.step3'),
                        image: require('../assets/images/' + localLang + '/2.png')
                    },
                    {
                        id: 7,
                        num: '3',
                        header: this.$t('about.step4'),
                        image: require('../assets/images/' + localLang + '/3.png')
                    },
                    {
                        id: 8,
                        num: '4',
                        header: this.$t('about.step5'),
                        image: require('../assets/images/' + localLang + '/4.png')
                    },
                    {
                        id: 9,
                        num: '5',
                        header: this.$t('about.step6'),
                        image: require('../assets/images/' + localLang + '/5.png')
                    },
                    {
                        id: 10,
                        num: '6',
                        header: this.$t('about.step7'),
                        image: ''
                    },
                ],
                organization: [

                    {
                        id: 2,
                        url: 'https://it-park.uz',
                        image: require('../assets/images/organizations/it_park.png'),
                        width: 150
                    },
                    {
                        id: 3,
                        url: 'https://yoshlarakademiyasi.uz',
                        image: require('../assets/images/organizations/yoshlar_akademiyasi.png'),
                        width: 100
                    },
                    {
                        id: 5,
                        url: 'http://yoshlarkelajagimiz.uz/',
                        image: require('../assets/images/organizations/YKJ.svg'),
                        width: 150
                    },
                    {
                        id: 4,
                        url: 'https://yoshlarittifoqi.uz',
                        image: require('../assets/images/organizations/yiuz.png'),
                        width: 220
                    },
                    {
                        id: 1,
                        url: 'https://www.uz.undp.org/content/uzbekistan/ru/home/presscenter/pressreleases/2020/05/_-_--covid-19-challenge-2020-----.html',
                        image: require('../assets/images/organizations/undp.svg'),
                        width: 120
                    },
                    {
                        id: 13,
                        url: 'https://mininnovation.uz',
                        image: require('../assets/images/organizations/mininnovation.png'),
                        textLogo: 'Министерство Инновационного развития Республики Узбекистан',
                        width: 150
                    },
                    {
                        id: 7,
                        url: 'https://www.minzdrav.uz',
                        image: require('../assets/images/organizations/minzdrav.png'),
                        textLogo: 'Министерство здравоохранения\n Республики Узбекистан',
                        width: 150
                    },
                    {
                        id: 8,
                        url: 'https://www.edu.uz',
                        image: require('../assets/images/organizations/edu.png'),
                        textLogo: 'Министерство высшего, \nсреднего и специального \nобразования',
                        width: 150
                    },
                    {
                        id: 6,
                        url: 'https://mehnat.uz',
                        image: require('../assets/images/organizations/mehnat.svg'),
                        width: 60
                    },
                    {
                        id: 9,
                        url: 'http://www.chamber.uz',
                        image: require('../assets/images/organizations/chamber.png'),
                        textLogo: '',
                        width: 50
                    },
                    {
                        id: 10,
                        url: 'https://digitaltrust.fund',
                        image: require('../assets/images/organizations/digital_trust.png'),
                        textLogo: '',
                        width: 50
                    },
                    {
                        id: 11,
                        url: 'https://www.worldbank.org',
                        image: require('../assets/images/organizations/world_bank.png'),
                        textLogo: '',
                        width: 50
                    },
                    {
                        id: 12,
                        url: 'https://www.osce.org/project-coordinator-in-uzbekistan',
                        image: require('../assets/images/organizations/osce.png'),
                        textLogo: '',
                        width: 50
                    },
                ],
                teamMembers: [
                    {
                        id: 1,
                        nameEn: 'Ulugbek Baydadaev',
                        nameRu: 'Улугбек Байдадаев',
                        alt: 'UB',
                        image: require('../assets/images/bek_ant.jpg')
                    },
                    {
                        id: 2,
                        nameEn: 'Stanislav Malinovskiy',
                        nameRu: 'Станислав Малиновский',
                        alt: 'SM',
                        image: require('../assets/images/stanislav.jpg')
                    },
                    {
                        id: 3,
                        nameEn: 'Mirshahid Djamilov',
                        nameRu: 'Миршахид Джамилов',
                        alt: 'MD',
                        image: require('../assets/images/mirshaxid.jpg')
                    },
                    {
                        id: 4,
                        nameEn: 'Abdurahmon Aliev',
                        nameRu: 'Абдурахмон Алиев',
                        alt: 'AA',
                        image: require('../assets/images/abdurahmon_.jpg')
                    },
                    {
                        id: 5,
                        nameEn: 'Timur Baydadaev',
                        nameRu: 'Тимур Байдадаев',
                        alt: 'TB',
                        image: require('../assets/images/AvatarTimur.png')
                    },
                ]
            }
        },
        created() {
            this.subscribeToEventsLoad()
        },
        mounted() {
            this.onResize()
            // screen.orientation.onchange = function (){
            //     // logs 'portrait' or 'landscape'
            //     self.onResize()
            // };
        },
        methods: {
            onResize() {
                // console.log('on resize')
                this.textLicenseHeight = document.getElementById('text-license').offsetHeight;
                // console.log(this.textLicenseHeight)
                this.windowSize = {x: window.innerWidth, y: window.innerHeight}
            },
            onChangeLang: function () {
                // console.log('onChangeLanguage');
                // Change array Locale

                let appLang = this.appLang

                //categoriesForLang
                this.steps =  [
                    {
                        id: 1,
                        num: '1',
                        header: this.$t('about.step1'),
                        image: require('../assets/images/' + this.appLang + '/1.png')
                    },
                    {
                        id: 2,
                        num: '1.1',
                        header: this.$t('about.step1_1'),
                        image: require('../assets/images/' + appLang + '/1_1.png')
                    },
                    {
                        id: 3,
                        num: '1.2',
                        header: this.$t('about.step1_2'),
                        image: require('../assets/images/' + appLang + '/1_2.png')
                    },
                    {
                        id: 4,
                        num: '1.3',
                        header: this.$t('about.step1_3'),
                        image: require('../assets/images/' + appLang + '/1_3.png')
                    },
                    {
                        id: 5,
                        num: '1.4',
                        header: this.$t('about.step1_4'),
                        image: require('../assets/images/' + appLang + '/1_4.png')
                    },
                    {
                        id: 6,
                        num: '2',
                        header: this.$t('about.step3'),
                        image: require('../assets/images/' + appLang + '/2.png')
                    },
                    {
                        id: 7,
                        num: '3',
                        header: this.$t('about.step4'),
                        image: require('../assets/images/' + appLang + '/3.png')
                    },
                    {
                        id: 8,
                        num: '4',
                        header: this.$t('about.step5'),
                        image: require('../assets/images/' + appLang + '/4.png')
                    },
                    {
                        id: 9,
                        num: '5',
                        header: this.$t('about.step6'),
                        image: require('../assets/images/' + appLang + '/5.png')
                    },
                    {
                        id: 10,
                        num: '6',
                        header: this.$t('about.step7'),
                        image: ''
                    },
                ]
            },
            subscribeToEventsLoad() {
                // eslint-disable-next-line no-unused-vars
                this.unsubscribe = this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'APP_LANG':
                            // console.log('APP_LANG')
                            this.onChangeLang()
                            break;
                    }
                });
            },
            goto(url) {
                window.open(url);
            },
        },
        computed: {
            // смешиваем результат mapGetters с внешним объектом computed
            ...mapGetters([
                'isMobile',
                'appLang',
                'getCurrentState',
                'getDbUser',
            ]),
            isXSmallScreen() {
                return this.windowSize.x < 700
            },
            isSmallScreen() {
                return this.windowSize.x < 960
            },
            // isNormalScreen() {
            //     return this.windowSize.x < 940 <this.windowSize.x < 1460
            // }
        },
    }
</script>
<style>
  .v-card__title {
    word-break: break-word;
  }

  .v-slide-group.v-item-group > .v-slide-group__next, .v-slide-group.v-item-group > .v-slide-group__prev {
    background-color: rgba(0, 200, 83, 0.21);
  }

  .in-hover-img:hover {
    opacity: 0.5;
  }
</style>
