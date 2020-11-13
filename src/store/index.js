import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import elementStates from './elementStates'
import app from './app'
import appStates from './appStates'
import mapStore from './mapStore'
import eventStore from './eventStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        error: null
    },

    getters: {
        error: s => s.error
    },
    actions: {
        SET_ERROR(context, e) {
            // context.commit('clearError')
            context.dispatch('SET_IS_LOADING', false)
            context.commit('SET_ERROR', e)
        },
    },
    mutations: {
        SET_ERROR(state, error) {
            // console.log('MUTATION SET_ERROR')
            // console.log(error)
            // console.log(state.error)
            state.error = error
        },
        clearError(state) {
            // console.log('clearError')
            state.error = null
        }
    },
    modules: {
        auth,
        elementStates,
        app,
        appStates,
        mapStore,
        eventStore
    }
})
