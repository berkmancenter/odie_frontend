import Vuex from 'vuex'
import cohorts from './modules/cohorts'

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    cohorts
  },
  strict: debug
})
