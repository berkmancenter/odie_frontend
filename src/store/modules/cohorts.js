import CohortsProxy from './../../proxies/CohortsProxy'

let cohortsProxy = new CohortsProxy()

// initial state
const state = {
  cohorts: [],
  aggregatedCohort: [],
  activeCohort: false
}

// getters
const getters = {}

// actions
const actions = {
  loadCohorts (context) {
    cohortsProxy
      .all()
      .then((response) => {
        context.commit('setCohorts', response)
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
  }
}

// mutations
const mutations = {
  setCohorts (state, cohorts) {
    state.cohorts = cohorts
  },
  setAggregatedCohort (state, cohort) {
    state.aggregatedCohort = cohort
  },
  setActiveCohort (state, cohort) {
    state.activeCohort = cohort
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
