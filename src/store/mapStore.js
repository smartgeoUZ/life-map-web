import axios from "../plugins/api-axios";

export default {
    state: {
        editedPointFeature: null,
        editedPointFeatureAddress: null,
        userLocationAddress: null,
        editedEvent: null,
        originalEditedFeature: null,
        events: null,
        addComplete: null,
        updateComplete: null,
        addressSearchResults: null,
        deleteComplete: null,
        blockComplete: null,
        selectedFeature: null
        // eventsNeedHelp: null,
        // eventsReadyAssist: null,
        // eventsWater: null,
        // eventsFood: null
    },
    getters: {
        getEditedPointFeature(state) {
            return state.editedPointFeature
        },
        getEditedPointFeatureAddress(state) {
            return state.editedPointFeatureAddress
        },
        getUserLocationAddress(state) {
            return state.userLocationAddress
        },
        getEditedEvent(state) {
            return state.editedEvent
        },
        getEvents(state) {
            return state.events
        },
        getOriginalEditedFeature(state) {
            return state.originalEditedFeature
        },
        getAddressSearchResults(state) {
            return state.addressSearchResults
        },
        getSelectedFeature(state) {
            return state.selectedFeature
        },
        // getNeedHelpEvents(state) {
        //     return state.eventsNeedHelp
        // },
        // getReadyAssistEvents(state) {
        //     return state.eventsReadyAssist
        // },
        // getWaterEvents(state) {
        //     return state.eventsWater
        // },
        // getFoodEvents(state) {
        //     return state.eventsFood
        // }
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        GET_EVENTS(context, payload) {
            // console.log('ACTION GET_EVENTS STARTED')
            try {
                let eventsUrl = ''

                // console.log(payload)

                let userId = payload.userId
                let categoryId = payload.categoryId
                let roleId = payload.roleId
                let filterStatusId = payload.filterStatusId
                let startDate = payload.startDate
                let endDate = payload.endDate
                let userRegionId = payload.userRegionId
                let searchText = payload.searchText

                let postParams = {}

                if(searchText !== ''){
                    postParams = JSON.stringify({
                        user_id: userId,
                        search_text: searchText
                    })
                }else{
                    postParams = JSON.stringify({
                        user_id: userId,
                        role_id: roleId,
                        category_id: categoryId,
                        filter_status_id: filterStatusId,
                        start_date: startDate,
                        end_date: endDate,
                        user_region_id: userRegionId,
                    })
                }

                if (roleId > 0) {
                    if (!axios.defaults.headers.common['Authorization']) {
                        // console.log('EMPTY AUTH HEADER DATA')
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getExtUser.hash
                    }
                    eventsUrl = 'event/protected/getEvents'
                } else {
                    eventsUrl = 'event/getEvents'
                }

                axios.post(eventsUrl, postParams)
                    .then(res => {
                        // console.log(res)
                        if (res.data.result) {
                            context.commit('SET_EVENTS', res.data.result)
                        } else {
                            // console.log(res)
                            // console.log(res.data.error)
                            // console.log('--038')
                            context.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--039')
                        context.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            } catch (e) {
                console.log(e)
                // console.log('--040')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },

        GET_EVENT_BY_ID(context, eventId) {
            // console.log('ACTION GET_EVENTS STARTED')
            try {
                let eventsUrl = ''

               /* if (roleId > 0) {
                    if (!axios.defaults.headers.common['Authorization']) {
                        // console.log('EMPTY AUTH HEADER DATA')
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.getters.getExtUser.hash
                    }*/
                    eventsUrl = 'event/protected/getById/' + eventId
               /* } else {
                    eventsUrl = 'event/getEvents'
                }*/

                axios.get(eventsUrl)
                    .then(res => {
                        // console.log(res)
                        let event = res.data.result
                        if (res.data.result) {
                            context.commit('SET_EVENTS', [event])

                        } else {
                            // console.log(res)
                            // console.log(res.data.error)
                            // console.log('--038')
                            context.dispatch('SET_ERROR', res.data.error)
                        }
                    })
                    .catch(e => {
                        // console.log('--039')
                        context.dispatch('SET_ERROR', e)
                        console.log('error- ' + e)
                    })
            } catch (e) {
                console.log(e)
                // console.log('--040')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
        SET_EDITED_POINT_FEATURE(context, value) {
            // console.log('ACTION SET_EDITED_POINT_FEATURE: ' + value)

            if (context.getters.getEditedPointFeature !== value) {
                // console.log('SET_EDITED_POINT_FEATURE')
                context.commit('SET_EDITED_POINT_FEATURE', value)
            } else {
                // console.log('getEditedPointFeature ARE SAME!!!!!!')
            }
        },
        SET_EDITED_POINT_FEATURE_ADDRESS(context, value) {
            // console.log('ACTION SET_EDITED_POINT_FEATURE_ADDRESS: ' + value)

            if (context.getters.getEditedPointFeatureAddress !== value) {
                context.commit('SET_EDITED_POINT_FEATURE_ADDRESS', value)
            } else {
                console.log('EditedPointFeatureAddress ARE SAME!!!!!!')
            }
        },
        SET_USER_LOCATION_ADDRESS(context, value) {
            // console.log('ACTION SET_USER_LOCATION_ADDRESS: ' + value)

            if (context.getters.getUserLocationAddress !== value) {
                context.commit('SET_USER_LOCATION_ADDRESS', value)
            } else {
                console.log('getUserLocationAddress ARE SAME!!!!!!')
            }
        },
        SET_EDITED_EVENT(context, event) {
            // console.log('ACTION SET_EDITED_EVENT')
            // console.log(event)

            if (context.getters.getEditedEvent !== event) {
                context.commit('SET_EDITED_EVENT', event)
            } else {
                console.log('EDITED_EVENT ARE SAME!!!!!!')
            }
        },
        SET_ORIGINAL_EDITED_FEATURE(context, feature) {
            // console.log('ACTION SET_EDITED_EVENT')
            // console.log(payload)

            if (context.getters.getOriginalEditedFeature !== feature) {
                context.commit('SET_ORIGINAL_EDITED_FEATURE', feature)
            } else {
                console.log('ORIGINAL_EDITED_FEATURE ARE SAME!!!!!!')
            }
        },
        CLEAR_EDITED_POINT_FEATURE(context) {
            context.commit('CLEAR_EDITED_POINT_FEATURE')
        },
        CLEAR_EDITED_POINT_FEATURE_ADDRESS(context) {
            context.commit('CLEAR_EDITED_POINT_FEATURE_ADDRESS')
        },
        CLEAR_EDITED_EVENT(context) {
            context.commit('CLEAR_EDITED_EVENT')
        },
        CLEAR_ORIGINAL_EDITED_FEATURE(context) {
            context.commit('CLEAR_ORIGINAL_EDITED_FEATURE')
        },
        ADD_COMPLETE(context, newEvent) {
            // console.log('ACTION ADD_COMPLETE')
            // console.log(newEvent)

            // let payload = {'events': newEvent, 'categoryId': newEvent.categoryId}
            let events

            events = context.getters.getEvents
            events.push(newEvent)

            context.commit('UPDATE_EVENTS', events)
            context.commit('ADD_COMPLETE', newEvent)
        },
        UPDATE_COMPLETE(context, updatedEvent) {
            // console.log('ACTION UPDATE_COMPLETE')
            //  console.log(updatedEvent)

            // let payload = {'events': newEvent, 'categoryId': newEvent.categoryId}
            let events

            events = context.getters.getEvents

            let oldEvent = events.filter(event => {
                return event.id === updatedEvent.id
            })
            // console.log('oldEvent')
            // console.log(oldEvent)

            let oldIndex = events.indexOf(oldEvent[0]);

            // events.splice(oldIndex, 1, updatedEvent);

            events[oldIndex] = updatedEvent;

            // // console.log(index)
            // if (index > -1) {
            //     events.splice(index, 1);
            // }
            //
            // events.push(updatedEvent)

            // console.log(updatedEvent)
            context.commit('UPDATE_EVENTS', events)
            context.commit('UPDATE_COMPLETE', updatedEvent)
        },
        DELETE_COMPLETE(context, deletedEvent) {
            // console.log('ACTION UPDATE_COMPLETE')
            //  console.log(deletedEvent)

            // let payload = {'events': newEvent, 'categoryId': newEvent.categoryId}
            let events

            events = context.getters.getEvents

            // console.log(events)

            events = events.filter(event => {
                return event.id !== deletedEvent.eventId
            })

            // console.log(events)

            context.commit('UPDATE_EVENTS', events)
            context.commit('DELETE_COMPLETE', deletedEvent)
        },
        SET_ADDRESS_SEARCH_RESULT(context, value) {
            // console.log('ACTION SET_ADDRESS_SEARCH_RESULT: ' + value)

            if (context.getters.getAddressSearchResults !== value) {
                // console.log('SET_EDITED_POINT_FEATURE')
                context.commit('SET_ADDRESS_SEARCH_RESULT', value)
            } else {
                // console.log('getEditedPointFeature ARE SAME!!!!!!')
            }
        },
        SET_SELECTED_FEATURE(context, value) {
            // console.log('ACTION SET_SELECTED_FEATURE: ' + value)

            if (context.getters.getSelectedFeature !== value) {
                context.commit('SET_SELECTED_FEATURE', value)
            }
        },
        REMOVE_EVENTS(context) {
            try {
                // console.log('REMOVE_EVENTS')
                context.commit('REMOVE_EVENTS')
            } catch (e) {
                console.log(e)
                console.log('--041')
                context.dispatch('SET_ERROR', e)
                throw e
            }
        },
    },
    mutations: {
        SET_EDITED_POINT_FEATURE(state, value) {
            // console.log('MUTATION SET_EDITED_POINT_FEATURE: ' + value)
            state.editedPointFeature = value
        },
        SET_EDITED_POINT_FEATURE_ADDRESS(state, value) {
            // console.log('MUTATION SET_EDITED_POINT_FEATURE_ADDRESS: ' + value)
            state.editedPointFeatureAddress = value
        },
        SET_USER_LOCATION_ADDRESS(state, value) {
            // console.log('MUTATION SET_USER_LOCATION_ADDRESS: ' + value)
            state.userLocationAddress = value
        },
        SET_EDITED_EVENT(state, event) {
            // console.log('MUTATION SET_EDITED_EVENT')
            // console.log(event)
            state.editedEvent = event
        },
        SET_ORIGINAL_EDITED_FEATURE(state, feature) {
            // console.log('SET_EVENTS-1')
            // console.log(feature)
            state.originalEditedFeature = feature
        },
        CLEAR_EDITED_POINT_FEATURE(state) {
            // console.log('CLEAR_EDITED_POINT_FEATURE')
            state.editedPointFeature = null
        },
        CLEAR_EDITED_POINT_FEATURE_ADDRESS(state) {
            // console.log('CLEAR_EDITED_POINT_FEATURE')
            state.editedPointFeatureAddress = null
        },
        CLEAR_EDITED_EVENT(state) {
            // console.log('CLEAR_EDITED_EVENT')
            state.editedEvent = null
        },
        CLEAR_ORIGINAL_EDITED_FEATURE(state) {
            // console.log('CLEAR_EDITED_EVENT')
            state.originalEditedFeature = null
        },
        SET_EVENTS(state, events) {
            // console.log(events)
            state.events = events
        },
        UPDATE_EVENTS(state, events) {
            // console.log('MUTATION UPDATE_EVENTS: ' + value)
            state.events = events
            // console.log(state.events)
        },
        ADD_COMPLETE(state, newEvent) {
            // console.log('MUTATION ADD_COMPLETE: ' + value)
            state.addComplete = newEvent
        },
        UPDATE_COMPLETE(state, updatedEvent) {
            // console.log('MUTATION UPDATE_COMPLETE: ' + value)
            state.updateComplete = updatedEvent
        },
        DELETE_COMPLETE(state, deletedEvent) {
            // console.log('MUTATION DELETE_COMPLETE: ' + value)
            state.deleteComplete = deletedEvent
        },
        SET_ADDRESS_SEARCH_RESULT(state, value) {
            // console.log('MUTATION SET_ADDRESS_SEARCH_RESULT: ' + value)
            state.addressSearchResults = value
        },
        SET_SELECTED_FEATURE(state, value) {
            // console.log('MUTATION SET_SELECTED_FEATURE: ' + value)
            state.selectedFeature = value
        },
        REMOVE_EVENTS(state) {
            // console.log('MUTATION REMOVE_EVENTS')
            state.events = null
        },
    }
}
