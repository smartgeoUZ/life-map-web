export default {
    state: {
        isLeftPanelOpen: true,
        isAdminLeftPanelOpen: true
    },
    getters: {
        getIsLeftPanelOpen(state){
            return state.isLeftPanelOpen
        },
        getIsAdminLeftPanelOpen(state){
            return state.isAdminLeftPanelOpen
        }
    },
    actions: {
        SET_IS_LEFT_PANEL_OPEN(context, value){
            context.commit('SET_IS_LEFT_PANEL_OPEN', value)
        },
        SET_IS_ADMIN_LEFT_PANEL_OPEN(context, value){
            context.commit('SET_IS_ADMIN_LEFT_PANEL_OPEN', value)
        }
    },
    mutations: {
        SET_IS_LEFT_PANEL_OPEN(state, value){
            // console.log('SET_IS_LEFT_PANEL_OPEN MUTATION: ' + value)
            state.isLeftPanelOpen = value
        },
        SET_IS_ADMIN_LEFT_PANEL_OPEN(state, value){
            state.isAdminLeftPanelOpen = value
        }
    }
}
