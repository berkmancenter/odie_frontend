import Vuex from 'vuex'
import mediaSources from './modules/media-sources'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    mediaSources
  },
  strict: debug
})
