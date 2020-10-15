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
    return cohortsProxy
      .all()
      .then((response) => {
        context.commit('setCohorts', response.data)
      })
  },
  loadTimespans (context) {
    return timespansProxy
      .all()
      .then((response) => {
        context.commit('setTimespans', response.data)
      })
  },
  loadCohortComparisons (context) {
    return cohortsComparisonsProxy
      .all()
      .then((response) => {
        context.commit('setCohortsComparisonsData', response.data)
        context.dispatch('processCohortsComparisons')
      })
  },
  reloadComparison (context) {
    context.commit('setComparisonData', false)

    let matched = _.find(state.cohortsComparisons, (cohortsComparison) => {
      return cohortsComparison.attributes.cohort_a_id === _.toInteger(state.cohort_a) &&
             cohortsComparison.attributes.cohort_b_id === _.toInteger(state.cohort_b) &&
             cohortsComparison.attributes.timespan_a_id === _.toInteger(state.timespan_a) &&
             cohortsComparison.attributes.timespan_b_id === _.toInteger(state.timespan_b)
    })

    let cohortAId = state.cohort_a
    let cohortBId = state.cohort_b
    let timespanAId = state.timespan_a
    let timespanBId = state.timespan_b
    if (!matched) {
      // Reverse call attributes
      cohortAId = state.cohort_b
      cohortBId = state.cohort_a
      timespanAId = state.timespan_b
      timespanBId = state.timespan_a
    }

    cohortsProxy
      .comparison({
        cohort_a_id: cohortAId,
        cohort_b_id: cohortBId,
        timespan_a_id: timespanAId,
        timespan_b_id: timespanBId
      })
      .then((response) => {
        if (!matched) {
          // Reverse results
          let tmpBCohortId = response.data.attributes.cohort_b_id
          let tmpBTimespanId = response.data.attributes.timespan_b_id
          let tmpBSummary = response.data.attributes.results.summary_b
          let tmpBScores = response.data.attributes.results.f1_scores.most_characteristic_b
          response.data.attributes.cohort_b_id = response.data.attributes.cohort_a_id
          response.data.attributes.timespan_b_id = response.data.attributes.timespan_a_id
          response.data.attributes.results.summary_b = response.data.attributes.results.summary_a
          response.data.attributes.results.f1_scores.most_characteristic_b = response.data.attributes.results.f1_scores.most_characteristic_a
          response.data.attributes.cohort_a_id = tmpBCohortId
          response.data.attributes.timespan_a_id = tmpBTimespanId
          response.data.attributes.results.summary_a = tmpBSummary
          response.data.attributes.results.f1_scores.most_characteristic_a = tmpBScores
        }

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
        ],
        [
          cohortsComparison.attributes.cohort_b_id,
          cohortsComparison.attributes.cohort_a_id,
          cohortsComparison.attributes.timespan_b_id,
          cohortsComparison.attributes.timespan_a_id
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
