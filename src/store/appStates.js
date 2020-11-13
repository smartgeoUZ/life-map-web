import {CONSTANTS} from "../utils/constants";

export default {
    state: {
        currentState: CONSTANTS.APP_STATE.DEFAULT
    },
    getters: {
        getCurrentState(state) {
            return state.currentState
        }
    },
    actions: {
        STATE_CHANGED(context, value) {
            // console.log('ACTION STATE_CHANGED: ' + value)

            if (context.getters.getCurrentState !== value) {
                context.commit('STATE_CHANGED', value)
            }

        }
    },
    mutations: {
        STATE_CHANGED(state, value) {
            // console.log('MUTATION STATE_CHANGED: ' + value)
            state.currentState = value
        }
    }
}