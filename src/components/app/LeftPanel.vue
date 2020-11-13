<template>
    <v-navigation-drawer v-model="drawer"
                         width="400px"
                         :clipped="true"
                         mobile-break-point="860px"
                         app>
        <add-edit-event v-show="showAddEditEventComponent"></add-edit-event>
        <event-list v-show="showListEventComponent"></event-list>
    </v-navigation-drawer>

</template>

<script>
    import {CONSTANTS} from "../../utils/constants";
    import EventList from "../app/EventList.vue";
    import AddEditEvent from "../app/AddEditEvent.vue";
    import {mapGetters} from "vuex";

    export default {
        props: {
            isDrawer: Boolean
        },
        name: "LeftPanel",
        components: {
            EventList,
            AddEditEvent
        },
        data() {
            return {
                showAddEditEventComponent: false,
                showListEventComponent: false,
                interval: null,
            }
        },
        async created() {
            // console.log('LEFT PANEL created')
            this.subscribeToAppStateChanged()
        },
        mounted() {
            this.stateProcessing(CONSTANTS.APP_STATE.DEFAULT)
        },
        methods: {

            subscribeToAppStateChanged() {
                this.unsubscribe = this.$store.subscribe((mutation, state) => {
                    switch (mutation.type) {
                        case 'STATE_CHANGED':
                            this.stateProcessing(state.appStates.currentState)
                            break;
                        case 'SET_IS_LEFT_PANEL_OPEN':
                            // this.leftPanelStateProcessing(state.elementStates.isLeftPanelOpen)
                            break;
                    }
                });
            },
            stateProcessing(appState) {
                switch (appState) {
                    case CONSTANTS.APP_STATE.DEFAULT:
                        this.defaultState();
                        break;
                    case CONSTANTS.APP_STATE.ADD_EVENT:
                        this.addEventState();
                        break;
                    case CONSTANTS.APP_STATE.EDIT_EVENT:
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
                // this.$toast.success('defaultState')
                let isMobile = this.$store.getters.isMobile
                if (isMobile) {
                    this.$store.dispatch('SET_IS_LEFT_PANEL_OPEN', false)
                }
                this.showListEventComponent = true
                this.showAddEditEventComponent = false
            },
            addEventState() {
                this.showListEventComponent = false
                this.showAddEditEventComponent = true
            },
            editEventState() {
                // this.$toast.warning('editEventState')
                this.showListEventComponent = false
                this.showAddEditEventComponent = true
            },
            cancelAddEventState() {
                // this.$toast.warning('cancelAddEventState')
                this.showListEventComponent = true
                this.showAddEditEventComponent = false
            },
            cancelEditEventState() {
                // this.$toast.warning('cancelAddEventState')
                this.showListEventComponent = true
                this.showAddEditEventComponent = false
            },

            cancelAdding() {
                // console.log('CURRENT APP state: ' + this.getCurrentState)
                this.$store.dispatch("STATE_CHANGED", CONSTANTS.APP_STATE.CANCEL_ADD_EVENT)
            },

        },
        computed: {
            // смешиваем результат mapGetters с внешним объектом computed
            ...mapGetters([
                'getIsLeftPanelOpen'
            ]),
            drawer: {
                get() {
                    return this.getIsLeftPanelOpen
                },
                set(value) {
                    if (!value) {
                        this.$store.dispatch('SET_IS_LEFT_PANEL_OPEN', value)
                    }
                }
            }
        },
        beforeDestroy() {
            // console.log('beforeDestroy')
            this.unsubscribe();
            clearInterval(this.interval);
        },

    }
</script>

<style scoped>

</style>
