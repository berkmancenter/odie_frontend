import CohortsProxy from './../../proxies/CohortsProxy'
import TimespansProxy from './../../proxies/TimespansProxy'

let cohortsProxy = new CohortsProxy()
let timespansProxy = new TimespansProxy()

// initial state
const state = {
  cohorts: [],
  aggregatedCohort: [],
  activeCohort: false,
  timespans: [],
  cohort_a: false,
  cohort_b: false,
  timespan_a: false,
  timespan_b: false,
  comparisonData: false
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
  loadAggregatedCohort (context, ids) {
    cohortsProxy
      .aggregated({
        ids: ids
      })
      .then((response) => {
        context.commit('setAggregatedCohort', response)
      })
  },
  loadCohort (context, id) {
    cohortsProxy
      .find(id)
      .then((response) => {
        context.commit('setActiveCohort', response)
      })
  },
  reloadComparision (context) {
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
  setAggregatedCohort (state, cohort) {
    state.aggregatedCohort = cohort
  },
  setActiveCohort (state, cohort) {
    state.activeCohort = cohort
  },
  setComparisonData (state, data) {
    state.comparisonData = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
