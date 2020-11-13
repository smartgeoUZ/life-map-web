<template>
    <div id="map-container" class="map" ref="map">
        <div id="map" class="map">
            <div id="popup"></div>
        </div>
        <v-toolbar class="search-on-map"
                   dense
                   floating
                   light>
            <!--      <v-text-field-->
            <!--              hide-details-->
            <!--              prepend-icon="search"-->
            <!--              single-line-->
            <!--      ></v-text-field>-->
            <v-autocomplete v-if="showHeaderSearch"
                            id="input-search-address"
                            :placeholder="$t('message.searchAddress')"
                            :items="places"
                            :loaduser_blockeding="isLoading"
                            :search-input.sync="searchAddress"
                            class="mx-2"
                            :style="isMobile ? {width: '190px'} : {}"
                            :menu-props="{ closeOnClick: false}"
                            @keyup.enter="getAddressesByTextSearch(searchAddress)"
                            color="green accent-4"
                            dense
                            flat
                            clearable
                            hide-details
                            hide-no-data
                            item-text="addressName"
                            item-value="place_id"
                            return-object
                            no-filter
                            v-model="foundAddressModel">
            </v-autocomplete>

            <v-btn small id="btn-search-address" icon @click="getAddressesByTextSearch(searchAddress)">
                <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon @click="this.getUserLocation">
                <v-icon color="primary">my_location</v-icon>
            </v-btn>

        </v-toolbar>
        <v-speed-dial :direction="direction"
                      :transition="transition"
                      class="banner-about"
                      v-model="fab"
        >
            <template v-slot:activator>
                <v-btn class="px-1"
                       color="white"
                       dark
                       height="30"
                       min-width="30"
                       small
                       v-model="fab"
                >
                    <v-icon color="primary" v-if="fab">mdi-chevron-double-right</v-icon>
                    <v-icon color="primary" v-else>mdi-chevron-double-left</v-icon>
                </v-btn>
            </template>
            <v-card class="mx-auto pt-4 px-2"
                    min-width="350">
                <v-card-text>
                    <div class="text-lg-subtitle-1 text--primary">
                        Life Map is a non profit and open source project of humans mutual assistance.
                    </div>
                    <br/>
                    <div>With the support of:</div>
                </v-card-text>
                <div>

                    <div class="d-flex flex-no-wrap justify-space-around px-2 pl-8 " style="align-items: center;">
                        <img :class="'in-hover-img' + ' mr-' + org.padding"
                             :height="org.width"
                             :key="org.id"
                             :src="org.image"
                             @click="goto(org.url)"
                             v-for="org in organization"
                             style="cursor: pointer">


                        <!--<img :height="organization[1].width"
                             :src="organization[1].image"
                             @click="goto(organization[1].url)"
                             class="in-hover-img"
                             style="cursor: pointer">

                        <img :height="organization[2].width"
                             :src="organization[2].image"
                             @click="goto(organization[2].url)"
                             class="in-hover-img"
                             style="cursor: pointer">-->
                    </div>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" href="#/about" target="_blank" text>
                        Learn More
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-speed-dial>
    </div>
</template>

<script>
/* eslint-disable no-unused-vars */

import 'ol/ol.css'
// import '../../node_modules/ol-layerswitcher/src/ol-layerswitcher.css';
import {CONSTANTS} from "../utils/constants";
import axios from "../plugins/api-axios";
import {mapGetters} from 'vuex';
import * as mapStyles from '../../src/utils/map-styles'
import * as mapUtils from "../utils/map-utils";
import {fromLonLat, toLonLat} from 'ol/proj'
import Feature from 'ol/Feature';
import * as Control from 'ol/control'
import {Attribution, defaults as defaultControls} from 'ol/control'
import Popup from 'ol-popup'
import {easeOut} from 'ol/easing';
import {getVectorContext} from 'ol/render';
import {unByKey} from 'ol/Observable';
import {defaults as defaultInteractions, Pointer as PointerInteraction} from 'ol/interaction';

import {circular} from 'ol/geom/Polygon';
import XYZSource from 'ol/source/XYZ'

import GeoJSON from 'ol/format/GeoJSON'

import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import ClusterSource from 'ol/source/Cluster'
import SourceCluster from 'ol/source/Cluster'

import ScaleLine from 'ol/control/ScaleLine'
import FullScreen from 'ol/control/FullScreen'

import ZoomSlider from 'ol/control/ZoomSlider'

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'

import Projection from 'ol/proj/Projection'
import {Point} from 'ol/geom';

import OSM from 'ol/source/OSM'
import messages from "../utils/messages";
// import Layerswitcher from 'ol-layerswitcher'

let map

let vectorSourceNeedHelp
let vectorSourceReadyAssist
let vectorSourceWater
let vectorSourceFood
let vectorSourceHealthCareCenter
let vectorSourceDoctor
let vectorSourceBloodCenter
let vectorSourceBloodDonor
let vectorSourceCharity
let vectorSourceAttention
let vectorSourceDriver
let vectorSourceVet

let vectorSourceNeedHelpCluster
let vectorSourceReadyAssistCluster
let vectorSourceWaterCluster
let vectorSourceFoodCluster
let vectorSourceHealthCareCenterCluster
let vectorSourceDoctorCluster
let vectorSourceBloodCenterCluster
let vectorSourceBloodDonorCluster
let vectorSourceCharityCluster
let vectorSourceAttentionCluster
let vectorSourceDriverCluster
let vectorSourceVetCluster

let vectorLayerNeedHelp
let vectorLayerReadyAssist
let vectorLayerWater
let vectorLayerFood
let vectorLayerHealthCareCenter
let vectorLayerDoctor
let vectorLayerBloodCenter
let vectorLayerBloodDonor
let vectorLayerCharity
let vectorLayerAttention
let vectorLayerDriver
let vectorLayerVet

let vectorSourceCommon
let vectorSourceAddress
let vectorSourceDraw
let vectorSourceRoute

// eslint-disable-next-line no-unused-vars

let vectorLayerCommon
let vectorLayerAddress
let vectorLayerDraw
let vectorLayerRoute

// eslint-disable-next-line no-unused-vars
let OSMLocalLayer = null
let OSMLayer

// eslint-disable-next-line no-unused-vars
// let currentResolution = null
// let isPoiClustering = true
// const maxZoomForClustering = 13
// let zoom = 10
let animationDuration = 3000;

// eslint-disable-next-line no-unused-vars
const mapProjection = new Projection({code: 'EPSG:3857'})
// const dbProjection = new Projection({code: 'EPSG:4326'})

let geoJsonWriter = new GeoJSON({featureProjection: mapProjection.getCode()})
// let geoJsonReader = new GeoJSON({defaultDataProjection: dbProjection.getCode()})
let geoJsonReader = new GeoJSON()

let locate
let centerPinControl

let centeredPin

// let OSMSource
let Drag

let editedPointFeature
let foundAddressCoordinates

let popup
let self

export default {
    name: 'Map',
    // components: {
    //     Locate
    // },
    data: function () {
        // console.log('data')
        return {
            organization: [
                {
                    id: 1,
                    url: 'https://www.uz.undp.org/content/uzbekistan/ru/home/presscenter/pressreleases/2020/05/_-_--covid-19-challenge-2020-----.html',
                    image: require('../assets/images/organizations/undp.svg'),
                    width: 100,
                    padding: 5
                },
                {
                    id: 2,
                    url: 'https://it-park.uz',
                    image: require('../assets/images/organizations/it_park.png'),
                    width: 130
                },
                {
                    id: 3,
                    url: 'https://www.facebook.com/SmarGeoUZ',
                    image: require('../assets/images/organizations/smartgeo_logo.png'),
                    width: 120
                },
            ],
            direction: 'left',
            fab: false,
            transition: 'slide-x-reverse-transition',
            dragThis: null,
            userCoordinates: [69.2076427, 41.27954],
            userPinCoordinates: null,
            navigatorPermissionsGeo: null,
            entries: [],
            isLoading: false,
            foundAddressModel: '',
            searchAddress: '',
            showHeaderSearch: true,
            canEditEventCoordinates: null,
        };
    },
    created() {
        self = this
        this.initEvents()
        this.getNavigationPermission()
        this.getUserLocation()
        this.subscribeToAppStateChanged()
        // console.log(' created created')
        // window.addEventListener("resize", this.windowResizeHandler);

        window.setInterval(this.randomFeatureForAnimate, 2000);
    },
    mounted() {
        this.$nextTick(function () {
            this.initMapComponents()
            this.initMap()
            this.initPopup()
            this.initMapEvents()
            this.stateProcessing(CONSTANTS.APP_STATE.DEFAULT)

            this.showBanner()


        });
    },
    methods: {
        showBanner() {
            // console.log('loginTime')
            let now = Date.now()
            let loginTime = localStorage.getItem('loginTime')
            let isFirst = (parseInt(loginTime) + 10000) > now
            if (isFirst) {
                self.fab = true

                setTimeout(function () {
                    self.fab = false
                }, 10000);
            }
        },
        goto(url) {
            window.open(url);
        },
        setUserPermissions() {
            if (this.getEditedEvent.user_id === this.getDbUser.id) {
                // console.log('---own event')
                this.canEditEventCoordinates = true
            } else {
                // console.log('---not own event')
                this.canEditEventCoordinates = this.$getPermission(CONSTANTS.PERMISSION.EDIT_EVENT_COORDINATES)
            }
        },
        async popupClickAssist(responsedEvent) {
            // console.log(eventFeature)

            if (this.getDbUser) {
                this.$toast.info(this.$t('message.sendResponse'))
                this.saveEventResponse(responsedEvent)
                this.saveEventActionUserResponsed(responsedEvent)
            } else {
                await this.$store.dispatch('LOGOUT').then(res => {
                    this.$router.push('/login')
                    this.$message(messages['logout'])
                });
            }
        },
        async popupSendMessage(event) {
            // console.log('popupSendMessage')
            // console.log(event)

            if (this.getDbUser) {
                this.notifyTelegramBotAboutUserCommunication(event)
                this.saveEventActionUserWantCommunication(event)
            } else {
                await this.$store.dispatch('LOGOUT').then(res => {
                    this.$router.push('/login')
                    this.$notification(this.$t('notification.youNeedRegister'))
                });
            }
        },
        async popupComplaintToEvent(event) {
            // console.log('popupComplaintToEvent')

            if (this.getDbUser) {
                this.notifyTelegramBotAboutComplaintToEvent(event)
            } else {
                await this.$store.dispatch('LOGOUT').then(res => {
                    this.$router.push('/login')
                    this.$notification(this.$t('notification.youNeedRegister'))
                });
            }
        },


        popupCreateRouteToEvent(event) {
            // console.log('popupCreateRouteToEvent')
            this.createRouteToEvent(event)
        },

        stateProcessing(appState) {
            // console.log('stateProcessing: ' + appState)
            switch (appState) {
                case CONSTANTS.APP_STATE.DEFAULT:
                    this.defaultState();
                    break;
                case CONSTANTS.APP_STATE.ADD_EVENT:
                    this.addEventState();
                    break;
                case CONSTANTS.APP_STATE.EDIT_EVENT:
                    this.setUserPermissions()
                    this.editEventState()
                    break;
                case CONSTANTS.APP_STATE.CANCEL_ADD_EVENT:
                    this.cancelAddEventState()
                    break;
                case CONSTANTS.APP_STATE.CANCEL_EDIT_EVENT:
                    this.cancelEditEventState()
                    break;
            }
        },
        defaultState() {
            // console.log(this.isMobile)
            // this.$toast.success('MAP defaultState')
            this.clearData()
            foundAddressCoordinates = null
            vectorSourceAddress.clear()

            this.changeLayersOpacity(1)

            // Load after navigation from other lifemap events
            if (this.getExtUser) {
                if (this.getDbUser) {
                    if (this.getEvents) {
                        this.addEventsToVectorSources()
                        this.checkLayersVisibility()
                    }
                }
            }
        },
        addEventState() {
            // this.$toast.success('MAP addEventState')

            // this.clearData()
            this.changeLayersOpacity(0.6)

            let coordinateOnAdding

            if (foundAddressCoordinates) {
                coordinateOnAdding = foundAddressCoordinates
            } else {
                coordinateOnAdding = fromLonLat(this.userCoordinates)
            }

            if (this.isMobile === false) {
                this.setPinToLocation(vectorSourceDraw, coordinateOnAdding)
            } else {

                centerPinControl = new Control.Control({
                    element: this.createCenteredPin(0)
                })
                map.addControl(centerPinControl);

                // this.centerMapByCoordinates(toLonLat(foundAddressCoordinates), true)
                this.createEditedPointFeature(coordinateOnAdding, CONSTANTS.DRAWING_FEATURE_ID)
            }

            this.centerMapByCoordinates(toLonLat(coordinateOnAdding), true)

            this.endModifyFeature(coordinateOnAdding)
        },
        editEventState() {
            // console.log('editEventState')
            let editedEvent = this.getEditedEvent
            // console.log(editedEvent.address)

            if (editedEvent) {
                this.clearData()
                this.changeLayersOpacity(0.6)

                // console.log(editedEvent)
                editedPointFeature = this.getFeatureById(editedEvent.id, editedEvent.category_id)
                // console.log(editedPointFeature)
                let oEditedFeature = editedPointFeature.clone()

                oEditedFeature.setId(editedPointFeature.getId())
                this.$store.dispatch('SET_ORIGINAL_EDITED_FEATURE', oEditedFeature)

                this.setEditedPointFeature()

                this.setEditedPointAddress(JSON.parse(editedEvent.address))

                editedPointFeature.set('id', editedEvent.id)

                if (this.isMobile === true) {

                    if (this.getCurrentState === CONSTANTS.APP_STATE.ADD_EVENT) {
                        centerPinControl = new Control.Control({
                            element: this.createCenteredPin(editedEvent.category_id)
                        })
                        map.addControl(centerPinControl);
                    } else if (this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT && this.canEditEventCoordinates) {
                        centerPinControl = new Control.Control({
                            element: this.createCenteredPin(editedEvent.category_id)
                        })
                        map.addControl(centerPinControl);
                    }

                } else {
                    switch (editedEvent.category_id) {
                        case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                            vectorSourceNeedHelp.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.needHelpStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                            vectorSourceReadyAssist.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.readyAssistStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.WATER:
                            vectorSourceWater.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.waterStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.FOOD:
                            vectorSourceFood.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.foodStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                            vectorSourceHealthCareCenter.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.healthCareCenterStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                            vectorSourceDoctor.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.doctorStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                            vectorSourceBloodCenter.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.bloodCenterStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                            vectorSourceBloodDonor.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.bloodDonorStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.CHARITY:
                            vectorSourceCharity.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.charityStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                            vectorSourceAttention.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.attentionStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.DRIVER:
                            vectorSourceDriver.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.driverStyleBase)
                            break;
                        case CONSTANTS.EVENT_CATEGORY.VET:
                            vectorSourceVet.removeFeature(editedPointFeature)
                            editedPointFeature.setStyle(mapStyles.vetStyleBase)
                            break;
                    }
                    vectorSourceDraw.addFeature(editedPointFeature);
                }

                this.centerMapByCoordinates(toLonLat(editedPointFeature.getGeometry().getCoordinates()), true)
            }
        },
        cancelAddEventState() {
            // this.$toast.warning('MAP cancelAddEventState')
            this.clearData()
            foundAddressCoordinates = null
            vectorSourceAddress.clear()

            this.changeLayersOpacity(1)
        },
        cancelEditEventState() {
            // console.log('-----cancelEditEventState-----')
            let originalEvent = this.$store.getters.getOriginalEditedFeature
            // console.log(originalEvent)

            switch (originalEvent.get('category_id')) {
                case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                    // this.addEventToVectorSource(vectorSourceNeedHelp, originalEvent)
                    vectorSourceNeedHelp.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                    // this.addEventToVectorSource(vectorSourceReadyAssist, originalEvent)
                    vectorSourceReadyAssist.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.WATER:
                    vectorSourceWater.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.FOOD:
                    vectorSourceFood.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                    vectorSourceHealthCareCenter.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                    vectorSourceDoctor.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                    vectorSourceBloodCenter.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                    vectorSourceBloodDonor.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.CHARITY:
                    vectorSourceCharity.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                    vectorSourceAttention.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.DRIVER:
                    vectorSourceDriver.addFeature(originalEvent)
                    break;
                case CONSTANTS.EVENT_CATEGORY.VET:
                    vectorSourceVet.addFeature(originalEvent)
                    break;
            }

            this.clearData()
            foundAddressCoordinates = null
            vectorSourceAddress.clear()

            this.changeLayersOpacity(1)
        },
        leftPanelStateProcessing(leftPanelState) {
            // console.log('leftPanelStateProcessing')
            this.resizeMap(leftPanelState);
        },
        initMap() {
            const localOSMSource = new XYZSource({
                url: 'https://smartgeo-osm.uz/osm_tiles/{z}/{x}/{y}.png', // tile server url
                visibility: true
            })

            const OSMSource = new OSM({
                crossOrigin: null,
                visibility: false
            })

            // let count = 1000;
            // let features = new Array(count);
            // let e = 4500000;
            // for (let i = 0; i < count; ++i) {
            //     let coordinates = [3 * e * Math.random() - e, 3 * e * Math.random() - e];
            //     features[i] = new Feature(new Point(coordinates));
            // }

            OSMLocalLayer = new TileLayer({
                type: 'base',
                title: 'Local OSM',
                source: localOSMSource,
                visible: false,
                updateWhileAnimating: true,
                updateWhileInteracting: true
            })

            OSMLayer = new TileLayer({
                type: 'base',
                title: 'OpenStreetMap',
                source: OSMSource,
                visible: true,
                // updateWhileAnimating: true,
                // updateWhileInteracting: true
            })

            vectorSourceDraw = new VectorSource({wrapX: false})
            vectorLayerDraw = new VectorLayer({
                zIndex: 4,
                // name: 'vectorLayerDraw',
                // title: 'vectorLayerDraw',
                layerName: 'vectorLayerDraw',
                source: vectorSourceDraw,
                // updateWhileAnimating: true,
                // updateWhileInteracting: true
            })

            vectorSourceCommon = new VectorSource({wrapX: false})
            vectorLayerCommon = new VectorLayer({
                // title: 'vectorLayerCommon',
                source: vectorSourceCommon,
                zIndex: 1,
                updateWhileAnimating: true,
                updateWhileInteracting: true
                // style: mapStyles.pinSquareStyle
            })

            vectorSourceAddress = new VectorSource({wrapX: false})
            vectorLayerAddress = new VectorLayer({
                title: 'Address Layer',
                layerName: 'vectorLayerAddress',
                source: vectorSourceAddress,
                zIndex: 1,
                // updateWhileAnimating: true,
                // updateWhileInteracting: true,
                style: mapStyles.addressStyle
            })

            vectorSourceRoute = new VectorSource({wrapX: false})
            vectorLayerRoute = new VectorLayer({
                title: 'Route Layer',
                layerName: 'vectorLayerRoute',
                source: vectorSourceRoute,
                zIndex: 100,
                style: mapStyles.routeStyle
            })

            vectorSourceNeedHelp = new VectorSource({
                wrapX: false,
                // updateWhileAnimating: true,
                // updateWhileInteracting: true
            })

            vectorSourceReadyAssist = new VectorSource({wrapX: false})
            vectorSourceWater = new VectorSource({wrapX: false})
            vectorSourceFood = new VectorSource({wrapX: false})
            vectorSourceHealthCareCenter = new VectorSource({wrapX: false})
            vectorSourceDoctor = new VectorSource({wrapX: false})
            vectorSourceBloodCenter = new VectorSource({wrapX: false})
            vectorSourceBloodDonor = new VectorSource({wrapX: false})
            vectorSourceCharity = new VectorSource({wrapX: false})
            vectorSourceAttention = new VectorSource({wrapX: false})
            vectorSourceDriver = new VectorSource({wrapX: false})
            vectorSourceVet = new VectorSource({wrapX: false})

            vectorSourceNeedHelpCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceNeedHelp,
                geometryFunction: this.geometryForCluster
            })

            vectorSourceReadyAssistCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceReadyAssist
            })

            vectorSourceWaterCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceWater
            })

            vectorSourceFoodCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceFood
            })

            vectorSourceHealthCareCenterCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceHealthCareCenter
            })

            vectorSourceDoctorCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceDoctor
            })

            vectorSourceBloodCenterCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceBloodCenter
            })

            vectorSourceBloodDonorCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceBloodDonor
            })

            vectorSourceCharityCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceCharity
            })

            vectorSourceAttentionCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceAttention
            })

            vectorSourceDriverCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceDriver
            })

            vectorSourceVetCluster = new ClusterSource({
                distance: 10,
                source: vectorSourceVet
            })

            vectorLayerNeedHelp = new VectorLayer({
                title: 'Need Help Layer',
                layerName: 'vectorLayerNeedHelp',
                zIndex: 99,
                updateWhileAnimating: true,
                updateWhileInteracting: true,
                // source: vectorSourceNeedHelpCluster,
                source: vectorSourceNeedHelpCluster,
                // style: this.poiStyleBase
                // style: mapStyles.pinSquareStyle
                // style: mapStyles.poiClusterStyle
                style: mapStyles.needHelpStyleBase
                // style: mapStyles.defaultClusterStyle
            })

            vectorLayerReadyAssist = new VectorLayer({
                title: 'Ready to Assist Layer',
                layerName: 'vectorLayerReadyAssist',
                zIndex: 98,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceReadyAssistCluster,
                style: mapStyles.readyAssistStyleBase
            })

            vectorLayerWater = new VectorLayer({
                title: 'Water Layer',
                layerName: 'vectorLayerWater',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceWaterCluster,
                style: mapStyles.waterStyleBase
            })

            vectorLayerFood = new VectorLayer({
                title: 'Food Layer',
                layerName: 'vectorLayerFood',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceFoodCluster,
                style: mapStyles.foodStyleBase
            })

            vectorLayerHealthCareCenter = new VectorLayer({
                title: 'Health care center Layer',
                layerName: 'vectorLayerHealthCareCenter',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceHealthCareCenterCluster,
                style: mapStyles.healthCareCenterStyleBase
            })

            vectorLayerDoctor = new VectorLayer({
                title: 'I am a doctor Layer',
                layerName: 'vectorLayerDoctor',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceDoctorCluster,
                style: mapStyles.doctorStyleBase
            })

            vectorLayerBloodCenter = new VectorLayer({
                title: 'Blood collection center Layer',
                layerName: 'vectorLayerBloodCenter',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceBloodCenterCluster,
                style: mapStyles.bloodCenterStyleBase
            })

            vectorLayerBloodDonor = new VectorLayer({
                title: 'I am a blood donor Layer',
                layerName: 'vectorLayerBloodDonor',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceBloodDonorCluster,
                style: mapStyles.bloodDonorStyleBase
            })

            vectorLayerCharity = new VectorLayer({
                title: 'Charity events Layer',
                layerName: 'vectorLayerCharity',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceCharityCluster,
                style: mapStyles.charityStyleBase
            })

            vectorLayerAttention = new VectorLayer({
                title: 'Attention Layer',
                layerName: 'vectorLayerAttention',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceAttentionCluster,
                style: mapStyles.attentionStyleBase
            })

            vectorLayerDriver = new VectorLayer({
                title: 'Driver Layer',
                layerName: 'vectorLayerDriver',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceDriverCluster,
                style: mapStyles.driverStyleBase
            })

            vectorLayerVet = new VectorLayer({
                title: 'I am a vet Layer',
                layerName: 'vectorLayerVet',
                zIndex: 2,
                updateWhileAnimating: false,
                updateWhileInteracting: false,
                source: vectorSourceVetCluster,
                style: mapStyles.vetStyleBase
            })

            let attribution = new Attribution({collapsible: false});

            map = new Map({
                interactions: ((!this.isMobile) ? (defaultInteractions().extend([new Drag()])) : null),
                controls: defaultControls({attribution: false}).extend([attribution]),
                target: 'map-container',
                layers: [OSMLocalLayer, OSMLayer, vectorLayerCommon, vectorLayerAddress, vectorLayerDraw,
                    vectorLayerRoute,
                    vectorLayerNeedHelp, vectorLayerReadyAssist, vectorLayerWater, vectorLayerFood,
                    vectorLayerHealthCareCenter, vectorLayerDoctor, vectorLayerBloodCenter,
                    vectorLayerBloodDonor, vectorLayerCharity, vectorLayerAttention,
                    vectorLayerDriver, vectorLayerVet
                ],
                view: new View({
                    projection: mapProjection.getCode(),
                    displayProjection: new Projection("EPSG: 4326"),
                    // center: fromLonLat([67.1233, 41]),
                    center: fromLonLat([69.2076427, 41.27954]),
                    // minZoom: 5,
                    maxZoom: 18,
                    zoom: 5
                })
            })

            // // Create a LayerSwitcher instance and add it to the map
            // let layerSwitcher = new Layerswitcher();
            // map.addControl(layerSwitcher);

            map.getControls().extend([
                new ScaleLine({
                    units: 'metric',
                    minWidth: 100
                }),
                new FullScreen(),
                new ZoomSlider(),
            ])

            // this.$nextTick(function () {
            //     // console.log('next TICK 1')
            //     // map.render()
            //     // map.refresh
            // });

        },
        initPopup() {
            // let element = document.getElementById('popup');
            //
            //   popup = new Overlay({
            //     element: element,
            //     positioning: 'bottom-center',
            //     stopEvent: false,
            //     offset: [0, -50]
            // });
            // map.addOverlay(popup);
            popup = new Popup();
            map.addOverlay(popup);
        },
        initMapEvents() {
            if (this.isMobile) {
                // map.on("click", this.mapClickEvent);
                // map.on("pointermove", this.mapPointerMoveEvent);
                map.on("pointerup", this.mapPointerUpEvent);
            }

            map.on("click", this.mapClickEvent);

            map.getView().on('change:resolution', this.changeResolutionEvent);
        },
        initEvents() {
            this.$root.$on('eventSelected', (coordinates, eventId, categoryId) => {
                // console.log('event eventSelected DONE')

                this.popupOnClick(eventId, categoryId)
                this.centerMapByCoordinates(coordinates, true, 16)
            })

            this.$root.$on('categoryChecked', (categoryId, isVisible) => {
                this.changeLayersVisibility(categoryId, isVisible)
            })

            this.$root.$on('updateSources', () => {
                // console.log('---updateSources---')
                // console.log(vectorSourceNeedHelp.getFeatures().length)
                //
                // console.log(vectorSourceNeedHelp.getFeatures().length)
                // this.$nextTick(() => this.doStuffWithImgs());
            })
        }
        ,
        initMapComponents() {
            if (this.isMobile === false) {
                Drag = /*@__PURE__*/(function (PointerInteraction) {
                    function Drag() {
                        self.dragThis = this;

                        PointerInteraction.call(this, {
                            // handleDownEvent: handleDownEvent,
                            // handleDragEvent: handleDragEvent,
                            // handleMoveEvent: handleMoveEvent,
                            // handleUpEvent: handleUpEvent
                            handleDownEvent: self.dragDownEvent,
                            handleDragEvent: self.dragDragEvent,
                            handleMoveEvent: self.dragMoveEvent,
                            handleUpEvent: self.dragUpEvent
                        });

                        /**
                         * @type {import("../src/ol/coordinate.js").Coordinate}
                         * @private
                         */
                        this.coordinate_ = null;

                        /**
                         * @type {string|undefined}
                         * @private
                         */
                        this.cursor_ = 'pointer';

                        /**
                         * @type {Feature}
                         * @private
                         */
                        this.feature_ = null;

                        /**
                         * @type {string|undefined}
                         * @private
                         */
                        this.previousCursor_ = undefined;
                    }

                    if (PointerInteraction) Drag.__proto__ = PointerInteraction;
                    Drag.prototype = Object.create(PointerInteraction && PointerInteraction.prototype);
                    Drag.prototype.constructor = Drag;

                    return Drag;
                }(PointerInteraction));
                this.resizeMap(this.getIsLeftPanelOpen);
            }
        }
        ,

        popupOnClick(eventId, categoryId) {
            let feature = this.getFeatureById(eventId, categoryId)

            this.showPopup(feature)
        }
        ,
        async showPopup(feature) {
            // console.log(feature)
            if (feature) {
                // console.log(feature)
                let geometry;
                let eventFeature;

                if (feature.get('features')) {
                    geometry = feature.get('features')[0].getGeometry();
                    eventFeature = feature.get('features')[0];
                } else {
                    geometry = feature.getGeometry();
                    eventFeature = feature;
                }

                let coords = geometry.getCoordinates();
                let roleId;
                // console.log(featureOriginal)

                if (this.getDbUser) {
                    roleId = this.getDbUser.role_id
                }

                let eventData = {}
                eventData.userEmail = eventFeature.get('user_email') || ''
                eventData.userExtId = eventFeature.get('user_ext_user_id') || ''
                eventData.userFirstName = eventFeature.get('user_first_name') || ''
                eventData.userLastName = eventFeature.get('user_last_name') || ''
                eventData.userLogin = eventFeature.get('user_login') || ''
                eventData.userId = eventFeature.get('user_id') || ''
                eventData.userPhoneMobile = eventFeature.get('user_phone_mobile') || ''
                eventData.userPhotoUrl = eventFeature.get('user_photo_url') || ''
                eventData.categoryId = eventFeature.get('category_id') || 0
                eventData.address = JSON.parse(eventFeature.get('address')).display_name || ''
                eventData.showNameForAnonym = eventFeature.get('show_name_for_anonym')
                eventData.showDescriptionForAnonym = eventFeature.get('show_description_for_anonym')
                eventData.isModerated = eventFeature.get('is_moderated')
                eventData.calcStatus = eventFeature.get('calc_status')

                // console.log(eventData.isModerated)
                //  console.log(eventFeature.get('user_login'))

                if (this.getDbUser) {
                    eventData.responsedUserId = this.getDbUser.id || ''
                    eventData.responsedUserFirstName = this.getDbUser.first_name || ''
                    eventData.responsedUserLastName = this.getDbUser.last_name || ''
                    eventData.responsedUserLogin = this.getDbUser.login || ''
                    eventData.responsedUserMobileNumber = this.getDbUser.phone_mobile || ''
                    eventData.responsedUserEmail = this.getDbUser.email || ''
                }

                eventData.responsedDate = new Date().toISOString()
                eventData.startDate = eventFeature.get('start_date') || ''
                eventData.endDate = eventFeature.get('end_date') || ''
                eventData.regDate = eventFeature.get('reg_date') || ''

                eventData.eventId = eventFeature.getId()
                eventData.name = eventFeature.get('name') || ''
                eventData.message = eventFeature.get('description') || ''

                eventData.coordinates = toLonLat(eventFeature.getGeometry().getCoordinates())

                // console.log(eventData.coordinates)

                let messages = {}
                messages.readyToHelpText = this.$t('message.readyToHelp')
                messages.eventComplaintTitle = this.$t('message.eventComplaintTitle')
                messages.createRouteToEvent = this.$t('message.createRouteToEvent')

                // console.log(eventData)

                let content = mapUtils.getPopupContent(eventData, roleId, messages, self)
                popup.show(coords, content);

                document.getElementById("event-response").addEventListener("click", function () {
                    self.popupClickAssist(eventData)
                });
                /* document.getElementById("btn_response_link").addEventListener("click", function () {
                     console.log('btn_response_link')
                     location.href  = 'https://t.me/';
                 });*/
                document.getElementById("popup-user-info").addEventListener("click", function () {
                    self.goToLogin()
                });

                document.getElementById("popup-send-message").addEventListener("click", function () {
                    self.popupSendMessage(eventData)
                });

                document.getElementById("popup-complaint-to-event").addEventListener("click", function () {
                    self.popupComplaintToEvent(eventData)
                });

                document.getElementById("popup-create-route-to-event").addEventListener("click", function () {
                    self.popupCreateRouteToEvent(eventData)
                });

            } else {
                popup.hide();
            }
        }
        ,
        goToLogin(path) {
            if (!this.getDbUser) {
                this.$router.push('/login')
            }
        },
        popupClickLink(roleId) {
            if (roleId == 4) {
                console.log('popupClickLink');
            }
        },
        mapClickEvent(evt) {
            // console.log('mapClickEvent: ' + evt.coordinate)
            let feature = this.getFeatureOnEventsByAppState(evt, this.getCurrentState)
            let featureOriginal;

            if (feature) {
                if (feature.get('features')) {
                    featureOriginal = feature.get('features')[0]
                }

                this.$store.dispatch('SET_SELECTED_FEATURE', featureOriginal)
            }

            this.showPopup(featureOriginal)
        },
        changeResolutionEvent(evt) {
            let view = evt.target;

            map.getLayers().getArray().map(function (layer) {
                let source = layer.getSource();
                if (source instanceof SourceCluster) {
                    let distance = source.getDistance();

                    // console.log('distance: ' + distance)
                    // console.log('zoom: ' + view.getZoom())
                    if (view.getZoom() >= 16 && distance > 0) {
                        source.setDistance(0);
                    } else if (view.getZoom() < 16 && distance === 0) {
                        source.setDistance(10);
                    }
                }
            });
        },
// mapPointerMoveEvent(evt) {
//     // console.log('mapPointerMoveEvent: ' + evt.coordinate)
//     // this.setMarkerByCoordinates(vectorSourceDraw, evt.coordinate)
//
//     if (evt.dragging) {
//         // console.log('dragging')
//         // Use for mobile devices
//         // this.setPinToCenterMap(vectorSourceDraw)
//     } else {
//         // console.log('moving')
//         // // Use for big screens???
//         // this.setPinOnCursor(vectorSourceDraw, evt)
//     }
// },
        mapPointerUpEvent(evt) {
            // console.log('mapPointerUpEvent')

            if (this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT && !this.canEditEventCoordinates) {
                return
            }

            if (this.isMobile && (this.getCurrentState === CONSTANTS.APP_STATE.ADD_EVENT ||
                this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT)) {
                // console.log(map.getView().getCenter())
                // console.log(evt)
                this.createEditedPointFeature(map.getView().getCenter(), CONSTANTS.DRAWING_FEATURE_ID)

                this.endModifyFeature(map.getView().getCenter())
                // this.mapPointerDragEvent(evt)
            }
        }
        ,
        dragDownEvent(evt) {
            // console.log('dragDownEvent')

            if (this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT && !this.canEditEventCoordinates) {
                return
            }

            // console.log(this.$store.getters.getExtUser.first_name)
            let map = evt.map;

            let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature;
            }, {
                layerFilter: function (layer) {
                    return layer.get('layerName') === 'vectorLayerDraw';
                }
            });

            if (feature) {
                this.dragThis.coordinate_ = evt.coordinate;
                this.dragThis.feature_ = feature;
            }

            return !!feature;

        }
        ,
        dragDragEvent(evt) {
            // console.log('dragDragEvent')

            if (this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT && !this.canEditEventCoordinates) {
                return
            }

            let deltaX = evt.coordinate[0] - this.dragThis.coordinate_[0];
            let deltaY = evt.coordinate[1] - this.dragThis.coordinate_[1];

            let geometry = this.dragThis.feature_.getGeometry();
            geometry.translate(deltaX, deltaY);

            this.dragThis.coordinate_[0] = evt.coordinate[0];
            this.dragThis.coordinate_[1] = evt.coordinate[1];
        }
        ,
        dragMoveEvent(evt) {
            // console.log('dragMoveEvent')
            // console.log(this.getCurrentState)

            if (this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT && !this.canEditEventCoordinates) {
                return
            }

            if (this.dragThis.cursor_) {
                let feature = this.getFeatureOnEventsByAppState(evt, this.getCurrentState)

                // console.log(feature)
                let element = evt.map.getTargetElement();
                if (feature) {
                    if (element.style.cursor != this.dragThis.cursor_) {
                        this.dragThis.previousCursor_ = element.style.cursor;
                        element.style.cursor = this.dragThis.cursor_;
                    }
                } else if (this.dragThis.previousCursor_ !== undefined) {
                    element.style.cursor = this.dragThis.previousCursor_;
                    this.dragThis.previousCursor_ = undefined;
                }

                // if (this.getCurrentState === CONSTANTS.APP_STATE.DEFAULT) {
                //     console.log('111111')
                //     this.showPopup(feature)
                // }
            }

        }
        ,
        dragUpEvent(e) {
            // console.log('---dragUpEvent---')

            if (this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT && !this.canEditEventCoordinates) {
                return
            }

            this.endModifyFeature(e.coordinate)

            this.dragThis.coordinate_ = null;
            this.dragThis.feature_ = null;
            return false;
        }
        ,
        endModifyFeature(coordinates) {
            if (this.getCurrentState === CONSTANTS.APP_STATE.ADD_EVENT ||
                this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT) {

                let lon = toLonLat(coordinates)[0]
                let lat = toLonLat(coordinates)[1]
                this.getAddressByCoordinates(lon, lat)
                    .then(address => {
                        // console.log(country_code)
                        this.setAddress(address)
                    })
                    .catch(e => {
                        this.setAddress('not detected')
                        console.log('--042')
                        this.$store.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
                    .finally(e => {
                        // console.log(editedPointFeature)
                        // let ftr = editedPointFeature.getGeometry().clone().transform(mapProjection.getCode(), dbProjection.getCode())
                        // console.log(ftr)

                        if (editedPointFeature) {
                            this.clearFeatureProperties(editedPointFeature)

                            let geoJsonFeature = geoJsonWriter.writeFeature(editedPointFeature)
                            // console.log(geoJsonFeature)

                            editedPointFeature.set('geoJsonFeature', geoJsonFeature);

                            this.$store.dispatch('SET_EDITED_POINT_FEATURE', editedPointFeature)

                            if (this.getCurrentState === CONSTANTS.APP_STATE.DEFAULT) {
                                this.$store.dispatch('STATE_CHANGED', CONSTANTS.APP_STATE.ADD)
                            }
                        } else {
                            console.log('editedPointFeature is null, WHY')
                        }

                    })
            }
        }
        ,
        setEditedPointFeature() {
            this.clearFeatureProperties(editedPointFeature)

            let geoJsonFeature = geoJsonWriter.writeFeature(editedPointFeature)

            editedPointFeature.set('geoJsonFeature', geoJsonFeature);

            // console.log('setEditedPointFeature')
            this.$store.dispatch('SET_EDITED_POINT_FEATURE', editedPointFeature)

        }
        ,
        setEditedPointAddress(p_address) {
            // console.log(p_address)
            // console.log(p_address.display_name)
            // console.log(p_address.country_code)
            // console.log(p_address.lat)
            // console.log(p_address.lon)

            let address = {}
            address.display_name = p_address.display_name
            address.country_code = p_address.country_code
            address.lat = p_address.lat
            address.lon = p_address.lon
            this.setAddress(address)
        }
        ,
        getFeatureOnEventsByAppState(evt, currentState) {
            // console.log('getFeatureOnEventsByAppState')
            // console.log(currentState)

            let map = evt.map;

            let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature;
            }, {
                layerFilter: function (layer) {
                    // console.log(layer)
                    switch (currentState) {

                        case CONSTANTS.APP_STATE.DEFAULT:
                            return layer.get('layerName') === 'vectorLayerNeedHelp' ||
                                layer.get('layerName') === 'vectorLayerReadyAssist' ||
                                layer.get('layerName') === 'vectorLayerWater' ||
                                layer.get('layerName') === 'vectorLayerFood' ||
                                layer.get('layerName') === 'vectorLayerHealthCareCenter' ||
                                layer.get('layerName') === 'vectorLayerDoctor' ||
                                layer.get('layerName') === 'vectorLayerBloodCenter' ||
                                layer.get('layerName') === 'vectorLayerBloodDonor' ||
                                layer.get('layerName') === 'vectorLayerCharity' ||
                                layer.get('layerName') === 'vectorLayerAttention' ||
                                layer.get('layerName') === 'vectorLayerDriver' ||
                                layer.get('layerName') === 'vectorLayerVet'
                        case CONSTANTS.APP_STATE.CANCEL_ADD_EVENT:
                            return layer.get('layerName') === 'vectorLayerNeedHelp' ||
                                layer.get('layerName') === 'vectorLayerReadyAssist' ||
                                layer.get('layerName') === 'vectorLayerWater' ||
                                layer.get('layerName') === 'vectorLayerFood' ||
                                layer.get('layerName') === 'vectorLayerHealthCareCenter' ||
                                layer.get('layerName') === 'vectorLayerDoctor' ||
                                layer.get('layerName') === 'vectorLayerBloodCenter' ||
                                layer.get('layerName') === 'vectorLayerBloodDonor' ||
                                layer.get('layerName') === 'vectorLayerCharity' ||
                                layer.get('layerName') === 'vectorLayerAttention' ||
                                layer.get('layerName') === 'vectorLayerDriver' ||
                                layer.get('layerName') === 'vectorLayerVet'
                        case CONSTANTS.APP_STATE.CANCEL_EDIT_EVENT:
                            return layer.get('layerName') === 'vectorLayerNeedHelp' ||
                                layer.get('layerName') === 'vectorLayerReadyAssist' ||
                                layer.get('layerName') === 'vectorLayerWater' ||
                                layer.get('layerName') === 'vectorLayerFood' ||
                                layer.get('layerName') === 'vectorLayerHealthCareCenter' ||
                                layer.get('layerName') === 'vectorLayerDoctor' ||
                                layer.get('layerName') === 'vectorLayerBloodCenter' ||
                                layer.get('layerName') === 'vectorLayerBloodDonor' ||
                                layer.get('layerName') === 'vectorLayerCharity' ||
                                layer.get('layerName') === 'vectorLayerAttention' ||
                                layer.get('layerName') === 'vectorLayerDriver' ||
                                layer.get('layerName') === 'vectorLayerVet'
                        case CONSTANTS.APP_STATE.ADD_EVENT:
                            return layer.get('layerName') === 'vectorLayerDraw';
                        case CONSTANTS.APP_STATE.EDIT_EVENT:
                            return layer.get('layerName') === 'vectorLayerDraw';
                    }
                }

            });
            return feature
        }
        ,
        getAddressByCoordinates(lon, lat) {
            // console.log(lat)
            // console.log(lon)
            let lang = localStorage.getItem('cur_lang')
            return axios.get(CONSTANTS.NOMINATIM_SEARCH_ADDRESS_BY_COORDS_URL + '?format=json&zoom=18&lat=' + lat + '&lon=' + lon + '&accept-language=' + lang)
                .then(res => {
                    let address = {}

                    if (res.data.display_name) {
                        address.display_name = res.data.display_name
                        address.country_code = res.data.address.country_code
                        address.lat = res.data.lat
                        address.lon = res.data.lon
                        return address
                    } else {
                        console.log(res.data.error)
                        console.log('--043')
                        this.$store.dispatch('SET_ERROR', res.data.error)
                    }
                })
                .catch(e => {

                    this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })
        }
        ,
        setAddress(address) {
            // console.log(address)
            // console.log(toLonLat(editedPointFeature.getGeometry().getCoordinates()))

            this.$store.dispatch('SET_EDITED_POINT_FEATURE_ADDRESS', address)

            // console.log(vectorSourceDraw.getFeatureById(CONSTANTS.DRAWING_FEATURE_ID))
            // console.log(editedPointFeature)
        }
        ,
        async getNavigationPermission() {
            this.navigatorPermissionsGeo = await navigator.permissions.query({name: 'geolocation'})
        }
        ,
        saveEventResponse(responsedEvent) {
            if (!axios.defaults.headers.common['Authorization']) {
                // console.log('EMPTY AUTH HEADER DATA')
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
            }

            let postParams = JSON.stringify({
                eventId: responsedEvent.eventId || '',
                responsedUserId: responsedEvent.responsedUserId,
                name: responsedEvent.name || '',
                message: responsedEvent.message || '',
                responsedDate: responsedEvent.responsedDate,
                startDate: responsedEvent.startDate,
            })

            axios.post('eventResponse/protected/saveEventResponse', postParams)
                .then(res => {
                    // console.log(res)
                    if (res.data.result) {
                        this.notifyTelegramBotAboutUserResponse(responsedEvent)
                    } else {
                        console.log(res.data.error)
                        console.log('--045')
                        this.$store.dispatch('SET_ERROR', res.data.error)
                    }
                })
                .catch(e => {
                    console.log('--046')
                    this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })
        }
        ,
        saveEventActionUserWantCommunication(event) {
            if (!axios.defaults.headers.common['Authorization']) {
                // console.log('EMPTY AUTH HEADER DATA')
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
            }

            let postParams = JSON.stringify({
                eventId: event.eventId || '',
                responsedUserId: event.responsedUserId,
                actionTypeId: CONSTANTS.EVENT_ACTION_TYPE.USER_WANT_COMMUNICATION,
            })

            this.saveEventAction(postParams)
        }
        ,
        saveEventActionUserResponsed(event) {
            if (!axios.defaults.headers.common['Authorization']) {
                // console.log('EMPTY AUTH HEADER DATA')
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
            }

            let postParams = JSON.stringify({
                eventId: event.eventId || '',
                responsedUserId: event.responsedUserId,
                actionTypeId: CONSTANTS.EVENT_ACTION_TYPE.USER_RESPONSED,
            })

            this.saveEventAction(postParams)
        }
        ,
        saveEventAction(postParams) {
            axios.post('event/protected/saveEventAction', postParams)
                .then(res => {
                    // console.log(res)
                    if (res.data.result) {
                        console.log('saveEventAction OK')
                    } else {
                        console.log(res.data.error)
                        this.$store.dispatch('SET_ERROR', res.data.error)
                    }
                })
                .catch(e => {
                    console.log('--046')
                    this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })
        }
        ,
        notifyTelegramBotAboutUserResponse(responsedEvent) {
            // console.log(responsedEvent)

            let postParams = JSON.stringify(responsedEvent)

            // let postParams3 = JSON.stringify(JSON.parse(responsedEvent))

            // console.log(postParams)
            // console.log(postParams3)

            axios.post(process.env.VUE_APP_BOT_API_URL + '/eventResponsed/', postParams)
                .then(res => {
                    // console.log(res)
                    // console.log(res.data)

                    if (res.data.result) {
                        // console.log('notifyTelegramBotAboutNewEvent DONE ' + res.data.result.id)
                    } else {
                        // console.log(res.data.error)
                        console.log('--047')
                        this.$store.dispatch('SET_ERROR', res.data.error)
                    }
                })
                .catch(e => {
                    console.log('--048')
                    this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })

        }
        ,
        notifyTelegramBotAboutUserCommunication(responsedEvent) {
            // console.log(responsedEvent)

            let postParams = JSON.stringify(responsedEvent)

            // let postParams3 = JSON.stringify(JSON.parse(responsedEvent))

            // console.log(postParams)
            // console.log(postParams3)

            axios.post(process.env.VUE_APP_BOT_API_URL + '/userWantCommunication/', postParams)
                .then(res => {
                    // console.log(res)
                    // console.log(res.data)

                    if (res.data.result) {
                        // console.log(res)
                        this.$toast.success(this.$t('message.requestToCommunicateDone'))
                    } else {
                        console.log(res.data.error)
                        // console.log(res.data.error)
                        // console.log('--047')
                        // this.$toast.warning(this.$t('message.requestToCommunicateDone'))
                        this.$store.dispatch('SET_ERROR', res.data.error)
                    }
                })
                .catch(e => {
                    console.log('--048')
                    this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })

        }
        ,
        notifyTelegramBotAboutComplaintToEvent(responsedEvent) {
            // console.log(responsedEvent)

            let postParams = JSON.stringify(responsedEvent)

            axios.post(process.env.VUE_APP_BOT_API_URL + '/complaintToEvent/', postParams)
                .then(res => {
                    // console.log(res)
                    // console.log(res.data)

                    if (res.data.result) {
                        console.log(res)
                        this.$toast.success(this.$t('message.requestToEventComplaintDone'))
                    } else {
                        this.$toast.error(this.$t('message.requestToEventComplaintFailed'))
                        console.log(res.data.error)
                        // console.log(res.data.error)
                        // console.log('--047')
                        // this.$toast.warning(this.$t('message.requestToCommunicateDone'))
                        // this.$store.dispatch('SET_ERROR', res.data.error)
                    }
                })
                .catch(e => {
                    this.$toast.error(this.$t('message.requestToEventComplaintFailed'))
                    // console.log('--048')
                    // this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })

        }
        ,

        async createRouteToEvent(event) {
            vectorSourceRoute.clear()

            // console.log(this.userCoordinates)
            // console.log(event.coordinates)

            let routeGeom = await this.getRouteByCoordinates(this.userCoordinates, event.coordinates)

            if (routeGeom && routeGeom.coordinates.length > 0) {

                let routeFeature = geoJsonReader.readFeature(routeGeom, {featureProjection: mapProjection.getCode()})
                vectorSourceRoute.addFeature(routeFeature);

                this.createStartRoutePoint(fromLonLat(this.userCoordinates))
                this.createFinishRoutePoint(fromLonLat(routeGeom.coordinates[routeGeom.coordinates.length - 1]))

                this.centerMapByFeatureExtent(routeFeature.getGeometry().getExtent())
            }
        }
        ,
        createStartRoutePoint(coordinates) {
            let startRoutePointFeature = new Feature(new Point(coordinates));
            startRoutePointFeature.setStyle(mapStyles.routeIconStyle(CONSTANTS.ICON.START_ROUTE_POINT))
            vectorSourceRoute.addFeature(startRoutePointFeature);
        }
        ,
        createFinishRoutePoint(coordinates) {
            let finishRoutePointFeature = new Feature(new Point(coordinates));
            finishRoutePointFeature.setStyle(mapStyles.routeIconStyle(CONSTANTS.ICON.FINISH_ROUTE_POINT))
            vectorSourceRoute.addFeature(finishRoutePointFeature);
        }
        ,
        getRouteByCoordinates(fromCoords, toCoords) {
            let lang = localStorage.getItem('cur_lang')

            let postParams = JSON.stringify({
                // coordinates: [[8.681495,49.41461],[8.687872,49.420318]],
                coordinates: [fromCoords, toCoords],
                geometry_simplify: "false",
                language: lang
            })

            // console.log(postParams)
            axios.defaults.headers.common['Authorization'] = CONSTANTS.ROUTE_SEARCH_BY_COORDS_KEY
            // console.log(axios.defaults.headers.common['Authorization'])

            return axios.post(CONSTANTS.ROUTE_SEARCH_BY_COORDS_URL, postParams, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    console.log(res)
                    if (res.data.features[0].geometry) {

                        // console.log(axios.defaults.headers.common['Authorization'])
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.getExtUser.hash
                        // console.log(axios.defaults.headers.common['Authorization'])

                        return res.data.features[0].geometry
                    } else {
                        console.log(res.data.error)
                        this.$store.dispatch('SET_ERROR', res.data.error)
                    }
                })
                .catch(e => {
                    this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })

        }
        ,

        clearData() {
            // console.log('clearData')
            vectorSourceDraw.clear()

            editedPointFeature = null
            this.$store.dispatch('CLEAR_EDITED_POINT_FEATURE')
            this.$store.dispatch('CLEAR_EDITED_POINT_FEATURE_ADDRESS')
            this.$store.dispatch('CLEAR_EDITED_EVENT')
            this.$store.dispatch('CLEAR_ORIGINAL_EDITED_FEATURE')

            if (this.isMobile) {
                // console.log('clearDrawSource removeControl')
                map.removeControl(centerPinControl);
            }

        }
        ,
        clearVectorSources() {
            // console.log('clearALLVectorSources')
            vectorSourceNeedHelp.clear()
            vectorSourceNeedHelpCluster.clear()
            vectorSourceReadyAssist.clear()
            vectorSourceReadyAssistCluster.clear()
            vectorSourceWater.clear()
            vectorSourceWaterCluster.clear()
            vectorSourceFood.clear()
            vectorSourceFoodCluster.clear()
            vectorSourceHealthCareCenter.clear()
            vectorSourceHealthCareCenterCluster.clear()
            vectorSourceDoctor.clear()
            vectorSourceDoctorCluster.clear()
            vectorSourceBloodCenter.clear()
            vectorSourceBloodCenterCluster.clear()
            vectorSourceBloodDonor.clear()
            vectorSourceBloodDonorCluster.clear()
            vectorSourceCharity.clear()
            vectorSourceCharityCluster.clear()
            vectorSourceAttention.clear()
            vectorSourceAttentionCluster.clear()
            vectorSourceDriver.clear()
            vectorSourceDriverCluster.clear()
            vectorSourceVet.clear()
            vectorSourceVetCluster.clear()
        }
        ,
        geometryForCluster(feature) {
            let geom = feature.getGeometry()

            if (geom.getType() === 'Point') {
                return geom
            } else if (geom.getType() === 'Polygon') {
                return geom.getInteriorPoint()
            } else if (geom.getType() === 'LineString') {
                let linePoint = new Point(geom.getLastCoordinate())
                return linePoint
            } else if (geom.getType() === 'Circle') {
                let circleGeom = new Point(geom.getLastCoordinate())
                return circleGeom
            }

            //    console.log('geometryForCluster is null')
            return null
        }
        ,
// poiStyleBase(feature) {
//     let size = 0
//
//     // if (resolution !== currentResolution) {
//     //     currentResolution = resolution
//     // }
//
//     if (zoom <= maxZoomForClustering && isPoiClustering === true) {
//         size = feature.get('features').length
//     }
//
//     return mapStyles.poiStyleBase(feature, size, isPoiClustering)
// },
        checkNavigatorPermissions() {
            // console.log('this.navigatorPermissionsGeo.state:' + this.navigatorPermissionsGeo.state)

            if (this.navigatorPermissionsGeo.state === 'granted') {
                // this.addFileLocationControl()
                // this.getUserLocation()
            } else if (this.navigatorPermissionsGeo.state === 'prompt') {
                // this.addFileLocationControl()
            } else if (this.navigatorPermissionsGeo.state === 'denied') {
                console.log('location denied')
            }
            this.navigatorPermissionsGeo.onchange = function () {
                console.log('onchange geolocation')
            }
        }
        ,
        changeLayersVisibility(categoryId, isVisible) {
            // console.log('changeLayersVisibility')
            switch (categoryId) {
                case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                    vectorLayerNeedHelp.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                    vectorLayerReadyAssist.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.WATER:
                    vectorLayerWater.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.FOOD:
                    vectorLayerFood.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                    vectorLayerHealthCareCenter.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                    vectorLayerDoctor.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                    vectorLayerBloodCenter.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                    vectorLayerBloodDonor.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.CHARITY:
                    vectorLayerCharity.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                    vectorLayerAttention.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.DRIVER:
                    vectorLayerDriver.setVisible(isVisible)
                    break;
                case CONSTANTS.EVENT_CATEGORY.VET:
                    vectorLayerVet.setVisible(isVisible)
                    break;
            }
        }
        ,
        checkLayersVisibility() {
            let categories = this.$store.getters.getCategories

            for (let category of categories) {
                switch (category.id) {
                    case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                        vectorLayerNeedHelp.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                        vectorLayerReadyAssist.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.WATER:
                        vectorLayerWater.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.FOOD:
                        vectorLayerFood.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                        vectorLayerHealthCareCenter.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                        vectorLayerDoctor.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                        vectorLayerBloodCenter.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                        vectorLayerBloodDonor.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.CHARITY:
                        vectorLayerCharity.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                        vectorLayerAttention.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.DRIVER:
                        vectorLayerDriver.setVisible(category.is_visible)
                        break;
                    case CONSTANTS.EVENT_CATEGORY.VET:
                        vectorLayerVet.setVisible(category.is_visible)
                        break;
                }
            }
        }
        ,
// addFileLocationControl() {
//     map.addControl(new Control.Control({
//         element: this.createFindLocationControl()
//     }));
//     this.addFindLocationListener()
// },
// createFindLocationControl() {
//     // console.log('createFindLocationControl')
//     locate = document.createElement('div');
//     locate.className = 'ol-control locate';
//     locate.style = 'left: .5em; top: 17.5em;';
//     locate.innerHTML = '<button title="Locate me">◎</button>';
//     return locate
// },
        createCenteredPin(categoryId) {
            // console.log('createCenteredPin')
            centeredPin = document.createElement('div');

            switch (categoryId) {
                case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                    centeredPin.className = 'center-pin-sos .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                    centeredPin.className = 'center-pin-ready-assist .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.WATER:
                    centeredPin.className = 'center-pin-water .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.FOOD:
                    centeredPin.className = 'center-pin-food .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                    centeredPin.className = 'center-pin-hospital .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                    centeredPin.className = 'center-pin-doctor .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                    centeredPin.className = 'center-pin-blood-center .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                    centeredPin.className = 'center-pin-blood-donor .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.CHARITY:
                    centeredPin.className = 'center-pin-charity .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                    centeredPin.className = 'center-pin-attention .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.DRIVER:
                    centeredPin.className = 'center-pin-level .ol-unselectable';
                    break;
                case CONSTANTS.EVENT_CATEGORY.VET:
                    centeredPin.className = 'center-pin-vet .ol-unselectable';
                    break;
                default:
                    centeredPin.className = 'center-pin .ol-unselectable';
                    break;
            }

            centeredPin.innerHTML = '<div></div>';
            return centeredPin
        }
        ,
//
// addFindLocationListener() {
//     // locate.addEventListener('click', this.getUserLocation)
//     // popup.addEventListener('click', this.getUserLocation)
// },
        getUserLocation() {
            // console.log('getUserLocation')
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showUserLocation);

                if (this.$store.getters.getUserLocationAddress) {
                    this.searchAddress = this.$store.getters.getUserLocationAddress.display_name
                }
            }
        }
        ,
        showUserLocation(position) {
            this.userCoordinates = [position.coords.longitude, position.coords.latitude]
            // console.log(this.userCoordinates)

            if (!vectorSourceCommon.getFeatureById(CONSTANTS.USER_LOCATION_FEATURE_ID)) {
                this.createUserLocationPoint(this.userCoordinates, position)
            }

            // map.getView().setCenter(fromLonLat(this.userCoordinates));
            // map.getView().setZoom(16);
            this.centerMapByCoordinates(this.userCoordinates, true)
        }
        ,
        createUserLocationPoint(coords, pos) {
            // console.log('createUserLocationPoint')

            let positionFeature = new Feature();
            positionFeature.setId(CONSTANTS.USER_LOCATION_FEATURE_ID)
            positionFeature.set('featureStyle', 'locationPoint')
            positionFeature.setStyle(mapStyles.pinSquareStyle(positionFeature));
            positionFeature.setGeometry(new Point(fromLonLat(coords)))

            vectorSourceCommon.addFeature(positionFeature);

            this.getAddressByCoordinates(coords[0], coords[1])
                .then(address => {
                    // this.searchAddress = address.display_name
                    this.$store.dispatch('SET_USER_LOCATION_ADDRESS', address)
                })
            const accuracy = circular(coords, pos.coords.accuracy);
            vectorSourceCommon.addFeature(new Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())));
        }
        ,
// setPinToCenterMap(source) {
//     console.log('setPinToCenterMap')
//     // console.log(map.getView().getCenter())
//     this.setMarkerByCoordinates(source, map.getView().getCenter())
// },
        setPinToLocation(source, coordinates) {
            // console.log('setPinToLocation')
            this.setMarkerByCoordinates(source, coordinates, CONSTANTS.DRAWING_FEATURE_ID)
        }
        ,
        setEditedPinToLocation(source, coordinates, id) {
            // console.log('setEditedPinToLocation')
            this.setMarkerByCoordinates(source, coordinates, id)
        }
        ,
// setPinOnCursor(source, evt) {
//     console.log('setPinOnCursor')
//     // console.log(map.getView().getCenter())
//     this.setMarkerByCoordinates(source, evt.coordinate)
// },
        setMarkerByCoordinates(source, coordinates, id) {
            // console.log('setMarkerByCoordinates')
            // check editedPointFeature

            // console.log(coordinates)
            // editedPointFeature = source.getFeatureById(id)

            if (editedPointFeature) {
                editedPointFeature.getGeometry().setCoordinates(coordinates)
                map.render()
            } else {
                // console.log('setMarkerByCoordinates MOBILE')
                editedPointFeature = new Feature(new Point(coordinates));
                editedPointFeature.setId(id)
                editedPointFeature.setStyle(mapStyles.defaultMarkerStyle)
                source.addFeature(editedPointFeature);
            }
        }
        ,
        createEditedPointFeature(coordinates, id) {
            // console.log('createEditedPointFeature: ' + id)
            if (editedPointFeature) {
                editedPointFeature.setStyle(mapStyles.hiddenStyle())
                editedPointFeature.getGeometry().setCoordinates(coordinates)
                // map.render()
            } else {
                editedPointFeature = new Feature(new Point(coordinates));
                editedPointFeature.setId(id)
                editedPointFeature.setStyle(mapStyles.defaultMarkerStyle)
            }

            // console.log(editedPointFeature)
        }
        ,
        randomFeatureForAnimate() {
            if (vectorLayerCommon.getVisible()) {
                if (vectorSourceCommon.getFeatures().length > 0) {
                    this.flash(vectorSourceCommon.getFeatureById(CONSTANTS.USER_LOCATION_FEATURE_ID))
                }
            }
        }
        ,
        centerMapByCoordinates(coords, needZoom, pzoom) {
            // console.log(coords)

            map.getView().setCenter(fromLonLat(coords));
            let zoom = 16
            if (pzoom && pzoom >= 10 && pzoom <= 18) {
                zoom = pzoom
            }

            if (needZoom) {
                map.getView().setZoom(zoom);
            }

        }
        ,
        centerMapByFeatureExtent(extent) {
            map.getView().fit(extent, map.getSize());
        }
        ,
        flash(feature) {
            let start = new Date().getTime();
            let listenerKey = OSMLocalLayer.on('postrender', function animate(event) {
                let vectorContext = getVectorContext(event);
                let frameState = event.frameState;
                let flashGeom = feature.getGeometry().clone();
                let elapsed = frameState.time - start;
                let elapsedRatio = elapsed / animationDuration;
                // radius will be 5 at start and 30 at end.
                let radius = easeOut(elapsedRatio) * 25 + 5;
                let opacity = easeOut(1 - elapsedRatio);

                vectorContext.setStyle(mapStyles.featureAnimationStyle(radius, opacity));
                vectorContext.drawGeometry(flashGeom);
                if (elapsed > animationDuration) {
                    unByKey(listenerKey);
                    return;
                }
                // tell OpenLayers to continue postrender animation
                map.render();
            });
        }
        ,
        addFoundAddress() {
            console.log('addFoundAddress')
            vectorSourceAddress.clear()
            // console.log(this.$store.getters.getAddressSearchResults)
            let addressSearchResult = this.$store.getters.getAddressSearchResults

            let foundFeature = geoJsonReader.readFeature(addressSearchResult.geojson, {featureProjection: mapProjection.getCode()})
            // console.log(foundFeature)
            // let positionFeature = new Feature();
            // // positionFeature.setId(CONSTANTS.USER_LOCATION_FEATURE_ID)
            // positionFeature.setId(-2000)

            foundFeature.set('name', addressSearchResult.display_name);
            foundFeature.setStyle(mapStyles.addressStyle(foundFeature));

            // console.log(addressSearchResult.display_name)
            vectorSourceAddress.addFeature(foundFeature);

            foundAddressCoordinates = fromLonLat([addressSearchResult.lon, addressSearchResult.lat])

            // this.centerMapByCoordinates(foundAddressCoordinates, true))

            if (this.isMobile) {
                this.centerMapByCoordinates(toLonLat(foundAddressCoordinates), true)

                this.createEditedPointFeature(map.getView().getCenter(), CONSTANTS.DRAWING_FEATURE_ID)

            } else {
                // console.log(this.getCurrentState)
                if (this.getCurrentState === CONSTANTS.APP_STATE.ADD_EVENT ||
                    this.getCurrentState === CONSTANTS.APP_STATE.EDIT_EVENT) {

                    editedPointFeature.getGeometry().setCoordinates(foundAddressCoordinates)
                }
                this.centerMapByFeatureExtent(foundFeature.getGeometry().getExtent())
            }

            this.endModifyFeature(foundAddressCoordinates)
        }
        ,
        subscribeToAppStateChanged() {
            this.unsubscribe = this.$store.subscribe((mutation, state, payload) => {

                switch (mutation.type) {
                    case 'STATE_CHANGED':
                        this.stateProcessing(state.appStates.currentState)
                        break;
                    case 'SET_IS_LEFT_PANEL_OPEN':
                        this.leftPanelStateProcessing(state.elementStates.isLeftPanelOpen)
                        break;
                    case 'SET_EVENTS':
                        this.addEventsToVectorSources()
                        break
                    // case 'ADD_COMPLETE':
                    //     // console.log('ADD_COMPLETE')
                    //     // console.log(mutation)
                    //
                    //     switch (mutation.payload.category_id) {
                    //         case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                    //             this.addEventToVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                    //             this.addEventToVectorSource(vectorSourceReadyAssist, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.WATER:
                    //             // this.addEventToVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.FOOD:
                    //
                    //             // this.addEventToVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //     }
                    //     break;
                    // case 'UPDATE_COMPLETE':
                    //     // console.log('UPDATE_COMPLETE')
                    //     // console.log(mutation)
                    //     switch (mutation.payload.category_id) {
                    //         case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                    //             this.addEventToVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                    //             this.addEventToVectorSource(vectorSourceReadyAssist, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.WATER:
                    //             // this.addEventToVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.FOOD:
                    //
                    //             // this.addEventToVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //     }
                    //     break;
                    // case 'DELETE_COMPLETE':
                    //     // console.log(mutation)
                    //     switch (mutation.payload.category_id) {
                    //         case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                    //             this.deleteEventFromVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                    //             this.deleteEventFromVectorSource(vectorSourceReadyAssist, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.WATER:
                    //             // this.deleteEventFromVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //         case CONSTANTS.EVENT_CATEGORY.FOOD:
                    //             // this.deleteEventFromVectorSource(vectorSourceNeedHelp, mutation.payload)
                    //             break;
                    //     }
                    //     break;
                }
            });
        }
        ,
        clearFeatureProperties(editedPointFeature) {
            // console.log('clearFeatureProperties')

            if (editedPointFeature) {
                editedPointFeature.set('geoJsonFeature', null);
                editedPointFeature.set('address', null);
                editedPointFeature.set('user_id', null);
                editedPointFeature.set('category_id', null);
                editedPointFeature.set('name', null);
                editedPointFeature.set('description', null);
                editedPointFeature.set('country_code', null);
                editedPointFeature.set('start_date', null);
                editedPointFeature.set('end_date', null);
                editedPointFeature.set('reg_date', null);
                editedPointFeature.set('user_email', null)
                editedPointFeature.set('user_ext_user_id', null)
                editedPointFeature.set('user_first_name', null)
                editedPointFeature.set('user_last_name', null)
                editedPointFeature.set('user_login', null)
                editedPointFeature.set('user_phone_mobile', null)
                editedPointFeature.set('user_photo_url', null)
                editedPointFeature.set('show_name_for_anonym', null)
                editedPointFeature.set('show_description_for_anonym', null)
                editedPointFeature.set('is_moderated', null)
                editedPointFeature.set('calc_status', null)
            }
        }
        ,
        resizeMap(isOpen) {
            // console.log('openOrClose');
            let elmMap = document.getElementById('map-container')
            if (isOpen && window.innerWidth > 1264) {
                elmMap.style.width = 'calc(100% - 400px)'
            } else {
                elmMap.style.width = '100%'
            }
        }
        ,
        addEventsToVectorSources() {
            // console.log('----------addEventsToVectorSources----------')
            let events = this.$store.getters.getEvents

            this.clearVectorSources()

            if (events) {
                for (let event of events) {
                    // console.log(event)
                    if (event && event.geojson) {
                        switch (event.category_id) {
                            case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                                // console.log('NEED_HELP EVENT ADD START')
                                this.addEventToVectorSource(vectorSourceNeedHelp, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                                this.addEventToVectorSource(vectorSourceReadyAssist, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.WATER:
                                this.addEventToVectorSource(vectorSourceWater, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.FOOD:
                                this.addEventToVectorSource(vectorSourceFood, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                                this.addEventToVectorSource(vectorSourceHealthCareCenter, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                                this.addEventToVectorSource(vectorSourceDoctor, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                                this.addEventToVectorSource(vectorSourceBloodCenter, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                                this.addEventToVectorSource(vectorSourceBloodDonor, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.CHARITY:
                                this.addEventToVectorSource(vectorSourceCharity, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                                this.addEventToVectorSource(vectorSourceAttention, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.DRIVER:
                                this.addEventToVectorSource(vectorSourceDriver, event)
                                break;
                            case CONSTANTS.EVENT_CATEGORY.VET:
                                this.addEventToVectorSource(vectorSourceVet, event)
                                break;
                        }
                    }
                }
                // this.fitMapBySource(vectorSourceNeedHelp)
            }
            if (this.getEventIdFromPath) {
                setTimeout(function () {
                    let coordinates = JSON.parse(events[0].geojson).geometry.coordinates
                    // console.log(fromLonLat(coordinates))
                    let feature = self.getFeatureById(events[0].id, events[0].category_id)

                    self.showPopup(feature)
                    self.centerMapByCoordinates(coordinates, true, 16)
                    self.$store.dispatch('SET_SELECTED_FEATURE', feature)
                }, 500)
            }
        }
        ,

// addNeedHelpEventsToVectorSource() {
//     let needHelpEvents = this.$store.getters.getNeedHelpEvents
//
//     if (needHelpEvents.length) {
//         // console.log(needHelpEvents)
//
//         for (let event of needHelpEvents) {
//             // console.log(event)
//             if (event && event.geojson) {
//                 this.addEventToVectorSource(vectorSourceNeedHelp, event)
//             }
//         }
//         // this.fitMapBySource(vectorSourceNeedHelp)
//     }
// },
// addReadyToAssistEventsVectorSource() {
//     let readyAssistEvents = this.$store.getters.getReadyAssistEvents
//
//     if (readyAssistEvents.length) {
//         // console.log(needHelpEvents)
//
//         for (let event of readyAssistEvents) {
//             // console.log(event)
//             if (event && event.geojson) {
//                 this.addEventToVectorSource(vectorSourceReadyAssist, event)
//             }
//         }
//         // this.fitMapBySource(vectorSourceReadyAssist)
//     }
//
// },
// addWaterEventsToVectorSource() {
//     let waterEvents = this.$store.getters.getWaterEvents
//
//     if (waterEvents.length) {
//         console.log(waterEvents)
//     }
//
// },
// addFoodEventsToVectorSource() {
//     let foodEvents = this.$store.getters.getFoodEvents
//
//
//     if (foodEvents.length) {
//         console.log(foodEvents)
//     }
// },
        addEventToVectorSource(source, event) {
            // console.log('addEventToVectorSource')
            // console.log(event)
            let feature = geoJsonReader.readFeature(event.geojson, {featureProjection: mapProjection.getCode()})
            // console.log(feature.getGeometry().getCoordinates())

            feature.setId(event.id)
            feature.set('category_id', event.category_id)
            feature.set('country_code', event.country_code)
            feature.set('name', event.name)
            feature.set('address', event.address)
            feature.set('description', event.description)
            feature.set('start_date', event.start_date)
            feature.set('end_date', event.end_date)
            feature.set('reg_date', event.reg_date)
            feature.set('is_active', event.is_active)
            feature.set('user_id', event.user_id)
            feature.set('show_name_for_anonym', event.show_name_for_anonym)
            feature.set('show_description_for_anonym', event.show_description_for_anonym)
            feature.set('is_moderated', event.is_moderated)
            feature.set('calc_status', event.calc_status)

            feature.set('user_email', event.user_email)
            feature.set('user_ext_user_id', event.user_ext_user_id)
            feature.set('user_first_name', event.user_first_name)
            feature.set('user_last_name', event.user_last_name)
            feature.set('user_login', event.user_login)
            feature.set('user_phone_mobile', event.user_phone_mobile)
            feature.set('user_photo_url', event.user_photo_url)

            // feature.setStyle(mapStyles.defaultMarkerStyle())

            // console.log(feature)
            source.addFeature(feature)

            // let test = feature.clone()
            // test.setId(undefined)
            // test.setStyle(mapStyles.defaultMarkerStyle)
            // vectorSourceDraw.addFeature(test)
            //
            // vectorSourceDraw.addFeature(feature)
        }
        ,
        deleteEventFromVectorSource(source, event) {
            // console.log(event)
            let deletingFeature = source.getFeatureById(event.eventId);
            // console.log(deletingFeature)
            // console.log(source.getFeatures())
            source.removeFeature(deletingFeature);
        }
        ,
        fitMapBySource(source) {
            // console.log('fitMapBySource')
            map.getView().fit(source.getExtent(), map.getSize())
            // map.render()
        }
        ,
        getFeatureById(featureId, categoryId) {
            switch (categoryId) {
                case CONSTANTS.EVENT_CATEGORY.NEED_HELP:
                    return vectorSourceNeedHelp.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.READY_ASSIST:
                    return vectorSourceReadyAssist.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.WATER:
                    return vectorSourceWater.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.FOOD:
                    return vectorSourceFood.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.HEALTH_CARE_CENTER:
                    return vectorSourceHealthCareCenter.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.DOCTOR:
                    return vectorSourceDoctor.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.BLOOD_CENTER:
                    return vectorSourceBloodCenter.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.BLOOD_DONOR:
                    return vectorSourceBloodDonor.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.CHARITY:
                    return vectorSourceCharity.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.ATTENTION:
                    return vectorSourceAttention.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.DRIVER:
                    return vectorSourceDriver.getFeatureById(featureId)
                case CONSTANTS.EVENT_CATEGORY.VET:
                    return vectorSourceVet.getFeatureById(featureId)
            }
        }
        ,
        changeLayersOpacity(opacity) {
            map.getLayers().forEach(function (layer) {
                // console.log(layer.get('layerName'))
                if (layer instanceof VectorLayer) {
                    // console.log(layer.getOpacity())
                    if (layer.get('layerName') !== 'vectorLayerDraw' &&
                        layer.get('layerName') !== 'vectorLayerAddress') {
                        if (layer.getOpacity() !== opacity) {
                            layer.setOpacity(opacity)
                        }
                    }
                }
            });
        }
        ,
        getAddressesByTextSearch(searchText) {
            // searchText = 'tashkent'

            // console.log(this.searchAddress)
            let lang = localStorage.getItem('cur_lang')

            // console.log(searchText)
            return axios.get(CONSTANTS.NOMINATIM_SEARCH_ADDRESS_BY_TEXT_URL + '?polygon_geojson=1&viewbox=&format=json' + '&accept-language=' + lang + '&q=' + searchText)
                // axios.get('https://nominatim.openstreetmap.org/search.php?q=' + searchText)
                .then(res => {
                    // console.log(res)
                    if (res.data) {
                        document.getElementById("input-search-address").select();
                        this.searchAddress = searchText
                        console.log(res.data)
                        this.entries = res.data
                        return res.data
                    } else {
                        console.log('--049')
                        this.$store.dispatch('SET_ERROR', res.data)
                        return res.data
                    }
                })
                .catch(e => {
                    console.log('--050')
                    this.$store.dispatch('SET_ERROR', e)
                    console.log('error- ' + e)
                })
        }
    },
    computed: {
        // смешиваем результат mapGetters с внешним объектом computed
        ...
            mapGetters([
                'getEventsByCategory',
                'isMobile',
                'getIsLeftPanelOpen',
                'getCurrentState',
                'getExtUser',
                'getDbUser',
                'getEvents',
                'getEditedEvent',
                'getEventIdFromPath'
            ]),
        places() {
            return this.entries.map(entry => {
                const addressName = entry.display_name.length > 100
                    ? entry.display_name.slice(0, 100) + '...'
                    : entry.display_name
                return Object.assign({}, entry, {addressName})
            })
        }

    }
    ,
    watch: {
        navigatorPermissionsGeo() {
            this.checkNavigatorPermissions()
        }
        ,
        async foundAddressModel(searchResult) {
            if (searchResult && searchResult.geojson) {
                await this.$store.dispatch('SET_ADDRESS_SEARCH_RESULT', searchResult)
                this.addFoundAddress()
            }
        }
        ,
        /*  async searchAddress() {
              // Items have already been loaded

              if (!this.searchAddress) return
              if (this.searchAddress.length < 4) return

              this.isLoading = true


              console.log(this.searchAddress)
              await this.getAddressesByTextSearch(this.searchAddress)
                      .then(searchResult => {
                      this.entries = searchResult
                  })
                  .catch(e => {
                      this.$store.dispatch('SET_ERROR', e)
                      console.log('error- ' + e)
                  })
                  .finally(() => (this.isLoading = false))
          }*/
    }
    ,
    beforeDestroy() {
        // console.log('beforeDestroy')
        this.unsubscribe();
    }
    ,
}

//region Help Functions

//endregion

</script>

<style>

.in-hover-img:hover {
    opacity: 0.5;
}

div.banner-about {
    position: absolute;
    right: 12px;
    bottom: 30px;
}

div.banner-about > div.v-speed-dial__list {
    align-items: flex-end;
    padding: 0 6px
}

.theme--light.v-toolbar.v-sheet.search-on-map {
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 10;
    /*background-color: #ffffffb5;*/
}

#map-container {
    width: calc(100% - 400px);
    height: calc(100% - 48px);
    position: fixed;
    /*position: fixed;*/
    margin: 0;
    padding: 0;
}

.ol-attribution {
    padding: 0;
    right: 40px;
}

.ol-popup-content {
    max-width: 260px;
}

.ol-attribution li {
    font-size: 12px;
}

.ol-full-screen {
    right: .7em;
    top: .9em;
    display: inline-table;
}

.ol-zoom {
    all: unset;
    position: absolute;
    pointer-events: auto;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    padding: 2px;
    right: .7em;
    bottom: 17.5em;
}

.ol-rotate {
    all: unset;
    position: absolute;
    pointer-events: auto;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    padding: 2px;
    top: 3.2em;
    right: .7em;
}

.ol-zoomslider {
    all: unset;
    position: absolute;
    pointer-events: auto;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    padding: 2px;
    right: .7em;
    bottom: 4.5em;
    height: 200px;
}

@media only screen and (max-width: 959px) {
    .ol-zoomslider {
        all: unset;
        display: none;
    }

    .ol-full-screen {
        display: none;
    }
}

div.center-pin > div {
    position: absolute;
    width: 64px;
    height: 64px;
    left: calc(50% - 26px);
    top: calc(50% - 64px);
    /*left: -12px;*/
    /*top: -12px;*/
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/pin_icon.png");
}

div.center-pin-sos > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/sos.png");
}

div.center-pin-ready-assist > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/ready_assist.png");
}

div.center-pin-water > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/water.png");
}

div.center-pin-food > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/food.png");
}

div.center-pin-hospital > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/hospital.png");
}

div.center-pin-doctor > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/doctor.png");
}

div.center-pin-blood-center > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/blood_center.png");
}

div.center-pin-blood-donor > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/blood_donor.png");
}

div.center-pin-charity > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/charity.png");
}

div.center-pin-attention > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/attention.png");
}

div.center-pin-blood-level > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/level.png");
}

div.center-pin-blood-vet > div {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
    /*noinspection CssUnknownTarget*/
    background-image: url("../assets/icons/vet.png");
}

</style>
