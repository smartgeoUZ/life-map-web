import axios from "../plugins/api-axios";
import {CONSTANTS} from '../utils/constants'
// eslint-disable-next-line no-unused-vars
// import messages from "../utils/messages";

export default {
    state: {
        dbUser: null,
        extUser: localStorage.getItem('ext_user') || null,
        userPermissions: null
    },
    getters: {
        loggedIn(state) {
            if (state.extUser) {
                return JSON.parse(state.extUser).hash !== null
            } else {
                return false
            }
        },
        getExtUser(state) {
            return JSON.parse(state.extUser)
        },
        getDbUser(state) {
            // console.log(state.dbUser)
            return state.dbUser
        },
        getUserPermissions(state) {
            return state.userPermissions
        },
    },
    actions: {
        async GET_USER_BY_EXT_ID(context, extUserId) {
            // console.log('ACTION GET_USER_BY_EXT_ID STARTED: ' + extUserId)
            try {
                let postParams = JSON.stringify({extId: extUserId, authType: CONSTANTS.AUTH_TYPE.TELEGRAM})
                let hash = context.getters.getExtUser.hash;

                // console.log(hash)

                if (!axios.defaults.headers.common['Authorization']) {
                    // console.log('EMPTY AUTH HEADER DATA')
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + hash
                }

                return axios.post('user/protected/getByExtId', postParams)
                    .then(res => {
                        if (res.data.result) {
                            return res.data.result
                        } else {
                            console.log(res.data.error)
                            // context.dispatch('LOGOUT')
                            // console.log('--021')
                            context.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--022')
                        context.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            } catch (e) {
                console.log(e)
                // console.log('--023')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        GET_USER_BY_ID_AND_UPDATE(context, userData) {
            try {
                let getUserParams = JSON.stringify({extId: userData.id, authType: 1})

                if (!axios.defaults.headers.common['Authorization']) {
                    // console.log('EMPTY AUTH HEADER DATA')
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userData.hash
                }

                // console.log('user/protected/getUserByExtIdAndUpdate')
                return axios.post('user/protected/getUserByExtIdAndUpdate', getUserParams)
                    .then(res => {
                        // console.log(res.data.result)
                        return res
                    })
                    .catch(e => {
                        // console.log('--024')
                        context.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            } catch (e) {
                console.log(e)
                // console.log('--025')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        async GET_USER_PERMISSIONS(context, userId) {
            // console.log('ACTION GET_USER_PERMISSIONS STARTED: ' + userId)
            try {
                let postParams = JSON.stringify({userId: userId})

                if (!axios.defaults.headers.common['Authorization']) {
                    // console.log('EMPTY AUTH HEADER DATA')
                    let hash = context.getters.getExtUser.hash;
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + hash
                }

                return axios.post('rp/protected/getRolePermissionsByUserId', postParams)
                    .then(res => {
                        if (res.data.result) {
                            // console.log(res.data.result)
                            context.dispatch('SET_USER_PERMISSIONS', res.data.result)
                        } else {
                            console.log(res.data.error)
                            // console.log('--026')
                            context.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--027')
                        context.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            } catch (e) {
                console.log(e)
                // console.log('--028')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        async SAVE_DB_USER(context, userData) {
            // console.log('ACTION SAVE_DB_USER STARTED')
            try {
                if (!axios.defaults.headers.common['Authorization']) {
                    // console.log('EMPTY AUTH HEADER DATA')
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userData.hash
                }

                let postParams = JSON.stringify({
                    login: userData.username || '',
                    first_name: userData.first_name,
                    last_name: userData.last_name || '',
                    ext_user_id: userData.id,
                    auth_type_id: CONSTANTS.AUTH_TYPE.TELEGRAM,
                    photo_url: userData.photo_url || ''
                })

                return axios.post('user/protected/save', postParams)
                    .then(async res => {

                        if (res.data.result) {
                            console.log('USER SAVED TO DB ' + res.data.result.id)

                            return res.data.result
                        } else {
                            console.log(res.data.error)
                            // console.log('--029')
                            context.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--030')
                        context.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            } catch (e) {
                console.log(e)
                // console.log('--031')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        SET_EXT_USER(context, userData) {
            // console.log('ACTION SET_EXT_USER STARTED')
            try {
                // console.log(userData)

                context.commit('SET_EXT_USER', JSON.stringify(userData))

                // const clonedUserData = Object.assign({}, userData);
                // delete clonedUserData.id;
                localStorage.setItem('ext_user', JSON.stringify(userData))
            } catch (e) {
                console.log(e)
                // console.log('--032')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        SET_DB_USER(context, dbUser) {
            // console.log(dbUser)
            context.commit('SET_DB_USER', dbUser)
        },
        SET_USER_PERMISSIONS(context, userPermissions) {
            // console.log('ACTION SET_USER_PERMISSIONS')
            context.commit('SET_USER_PERMISSIONS', userPermissions)
        },
        async LOGOUT(context) {
            // console.log('LOGOUT')
            context.dispatch('REMOVE_EXT_USER')
            context.dispatch('REMOVE_DB_USER')
            context.dispatch('REMOVE_USER_PERMISSIONS')
            localStorage.removeItem('loggedIn')
            localStorage.removeItem('loggedTime')
        },
        REMOVE_EXT_USER(context) {
            try {
                // console.log('REMOVE_EXT_USER')
                delete axios.defaults.headers.common['Authorization']

                localStorage.removeItem('ext_user')
                localStorage.removeItem('db_user')

                localStorage.removeItem('userFullName')
                localStorage.removeItem('userPhotoUrl')
                context.commit('REMOVE_EXT_USER')
            } catch (e) {
                console.log(e)
                // console.log('--033')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        REMOVE_DB_USER(context) {
            try {
                // console.log('REMOVE_DB_USER')
                context.commit('REMOVE_DB_USER')
            } catch (e) {
                console.log(e)
                // console.log('--034')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        REMOVE_USER_PERMISSIONS(context) {
            try {
                // console.log('REMOVE_USER_PERMISSIONS')
                context.commit('REMOVE_USER_PERMISSIONS')
            } catch (e) {
                console.log(e)
                // console.log('--035')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
    },
    mutations: {
        SET_EXT_USER(state, extUser) {
            // console.log('MUTATION SET_EXT_USER')
            state.extUser = extUser
        },
        REMOVE_EXT_USER(state) {
            // console.log('MUTATION REMOVE_EXT_USER')
            state.extUser = null
        },
        SET_DB_USER(state, dbUser) {
            state.dbUser = dbUser
            // console.log('MUTATION END')
            // console.log(state.dbUser)
        },
        REMOVE_DB_USER(state) {
            // console.log('MUTATION REMOVE_DB_USER')
            state.dbUser = null
        },
        REMOVE_USER_PERMISSIONS(state) {
            // console.log('MUTATION REMOVE_USER_PERMISSIONS')
            state.userPermissions = null
        },

        SET_USER_PERMISSIONS(state, userPermissions) {
            // console.log('MUTATION SET_USER_PERMISSIONS')
            state.userPermissions = userPermissions
        },
    }
}
