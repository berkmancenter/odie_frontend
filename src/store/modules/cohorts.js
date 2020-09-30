import CohortsProxy from './../../proxies/CohortsProxy'
import TimespansProxy from './../../proxies/TimespansProxy'
import CohortsComparisonsProxy from './../../proxies/CohortsComparisonsProxy'
import _ from 'lodash'

let cohortsProxy = new CohortsProxy()
let timespansProxy = new TimespansProxy()
let cohortsComparisonsProxy = new CohortsComparisonsProxy()

// initial state
const state = {
  cohorts: [],
  activeCohort: false,
  timespans: [],
  cohort_a: false,
  cohort_b: false,
  timespan_a: false,
  timespan_b: false,
  comparisonData: false,
  cohortsComparisons: [],
  processedCohortsComparisons: []
}

// getters
const getters = {}

// actions
const actions = {
  loadCohorts (context) {
    cohortsProxy
      .all()
      .then((response) => {
        context.commit('setCohorts', response.data)
      })
  },
  loadTimespans (context) {
    timespansProxy
      .all()
      .then((response) => {
        context.commit('setTimespans', response.data)
      })
  },
  loadCohortComparisons (context) {
    cohortsComparisonsProxy
      .all()
      .then((response) => {
        context.commit('setCohortsComparisonsData', response.data)
        context.dispatch('processCohortsComparisons')
      })
  },
  loadCohort (context, id) {
    cohortsProxy
      .find(id)
      .then((response) => {
        context.commit('setActiveCohort', response)
      })
  },
  reloadComparison (context) {
    context.commit('setComparisonData', false)

    cohortsProxy
      .comparison({
        cohort_a_id: state.cohort_a,
        cohort_b_id: state.cohort_b,
        timespan_a_id: state.timespan_a,
        timespan_b_id: state.timespan_b
      })
      .then((response) => {
        context.commit('setComparisonData', response.data)
      })
  },
  processCohortsComparisons (context) {
    let processed = []

    _.each(state.cohortsComparisons, (cohortsComparison) => {
      processed.push(
        [
          cohortsComparison.attributes.cohort_a_id,
          cohortsComparison.attributes.cohort_b_id,
          cohortsComparison.attributes.timespan_a_id,
          cohortsComparison.attributes.timespan_b_id
        ]
      )
    })

    context.commit('setProcessedCohortsComparisons', processed)
  }
}

// mutations
const mutations = {
  setCohorts (state, cohorts) {
    state.cohorts = cohorts
  },
  setTimespans (state, timespans) {
    state.timespans = timespans
  },
  setCohortA (state, cohort) {
    state.cohort_a = cohort
  },
  setCohortB (state, cohort) {
    state.cohort_b = cohort
  },
  setTimespanA (state, timespan) {
    state.timespan_a = timespan
  },
  setTimespanB (state, timespan) {
    state.timespan_b = timespan
  },
  setActiveCohort (state, cohort) {
    state.activeCohort = cohort
  },
  setComparisonData (state, data) {
    state.comparisonData = data
  },
  setCohortsComparisonsData (state, data) {
    state.cohortsComparisons = data
  },
  setProcessedCohortsComparisons (state, data) {
    state.processedCohortsComparisons = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
