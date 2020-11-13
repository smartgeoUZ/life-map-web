export default {
    state: {
        isMobile: false,
        isLoading: false,
        appLang: localStorage.getItem('cur_lang')
    },
    getters: {
        isMobile(state) {
            return state.isMobile
        },
        isLoading(state) {
            return state.isLoading
        },
        appLang(state) {
            return state.appLang
        }
    },
    actions: {
        SET_IS_MOBILE(context, value) {
            // console.log('ACTION SET_IS_MOBILE: ' + value)
            context.commit('SET_IS_MOBILE', value)
        },
        SET_IS_LOADING(context, value) {
            // console.log('ACTION SET_IS_MOBILE: ' + value)
            context.commit('SET_IS_LOADING', value)
        },
        APP_LANG(context, value) {
            // console.log('APP_LANG: ' + value)
            context.commit('APP_LANG', value)
        }
    },
    mutations: {
        SET_IS_MOBILE(state, value) {
            // console.log('MUTATION SET_IS_MOBILE: ' + value)
            state.isMobile = value
        },
        SET_IS_LOADING(state, value) {
            // console.log('MUTATION SET_IS_LOADING: ' + value)
            state.isLoading = value
        },
        APP_LANG(state, value) {
            // console.log('MUTATION APP_LANG: ' + value)
            state.appLang = value
        }
    }
}