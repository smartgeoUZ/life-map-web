// import {CONSTANTS} from "../utils/constants";

import axios from "../plugins/api-axios";

export default {
    state: {
        categories: null,
        filterParams: null,
        selectedEvent: null,
        eventIdFromPath: null
    },
    getters: {
        getCategories(state) {
            return state.categories
        },
        getFilterParams(state) {
            return state.filterParams
        },
        getSelectedEvent(state) {
            return state.selectedEvent
        },
        getEventIdFromPath(state) {
            return state.eventIdFromPath
        }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        GET_CATEGORIES(context) {
            // console.log('ACTION GET_CATEGORIES STARTED')
            try {
                let roleId = 0;

                // console.log(context.getters.getDbUser)
                if (context.getters.getDbUser) {
                    roleId = context.getters.getDbUser.role_id
                }

                let postParams = JSON.stringify({
                    roleId: roleId
                })

                // console.log(postParams)

                return axios.post('eventCategory/getEventCategories', postParams)
                    .then(res => {
                        if (res.data.result) {
                            // console.log(res.data.result)
                            context.commit('SET_CATEGORIES', res.data.result)
                        } else {
                            console.log(res.data.error)
                            // console.log('--001')
                            context.dispatch('SET_ERROR', res.data.error)
                        }

                    })
                    .catch(e => {
                        console.log('--036')
                        context.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            } catch (e) {
                console.log(e)
                console.log('--037')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        SET_CATEGORIES(context, value) {
            context.commit('SET_CATEGORIES', value)
        },
        SET_SELECTED_EVENT(context, value) {
            context.commit('SET_SELECTED_EVENT', value)
        },
        SET_EVENT_ID_FROM_PATH(context, value) {
            context.commit('SET_EVENT_ID_FROM_PATH', value)
        },
        SET_FILTER_PARAMS(context, value) {
            // console.log('SET_FILTER_PARAMS: ' + value)
            context.commit('SET_FILTER_PARAMS', value)
        }
    },
    mutations: {
        SET_CATEGORIES(state, value) {
            // console.log('MUTATION SET_CATEGORIES: ' + value)
            state.categories = value
        },
        SET_FILTER_PARAMS(state, value) {
            // console.log('MUTATION APP_LANG: ' + value)
            state.filterParams = value
        },
        SET_SELECTED_EVENT(state, value) {
            // console.log('MUTATION APP_LANG: ' + value)
            state.selectedEvent = value
        },
        SET_EVENT_ID_FROM_PATH(state, value) {
            // console.log('MUTATION SET_EVENT_ID_FROM_PATH: ' + value)
            state.eventIdFromPath = value
        }
    }
}
