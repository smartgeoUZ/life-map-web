import axios from "axios";
// import app from '../main' // import the instance
import store from '../store/index';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
})

// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getExtUser.hash
let conf = null
// let ignore = false

instance.interceptors.request.use(config => {

    // console.log('interceptors request <--')
    // console.log(config)
    // console.log(axios.defaults.headers.common['Authorization'])
    conf = config

    // let hash = JSON.parse(localStorage.getItem('ext_user')).hash
    // console.log(hash)
    //
    // if (!axios.defaults.headers.common['Authorization'] &Vue.prototype.$http = Axios;& hash) {
    //     console.log('EMPTY AUTH HEADER DATA')
    //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + hash
    //     console.log(axios.defaults.headers.common['Authorization'])
    // }

    // eslint-disable-next-line no-undef
    // console.log(store)

    store.dispatch('SET_IS_LOADING', true)

    return config
})

instance.interceptors.response.use(response => {
    // console.log('interceptors response <--')

    if (conf != null) {
        // console.log(conf.url.split('api/').pop())
        // console.log('interceptors -->aaaa')
        store.dispatch('SET_IS_LOADING', false)
    }

    // console.log(response)
    return response
})

export default instance // export axios instace to be imported in your app
