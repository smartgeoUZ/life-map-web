// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: '#00c853',
                secondary: '#1976d2',
                accent: '#8c9eff',
                error: '#b71c1c',
                textGrey: '#425346',
            },
        },
    },
}

export default new Vuetify(opts)
