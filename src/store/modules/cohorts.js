import CohortsProxy from './../../proxies/CohortsProxy'

let cohortsProxy = new CohortsProxy()

// initial state
const state = {
  cohorts: [],
  aggregatedCohort: [],
  activeCohort: false,
  timespans: [
    'Today',
    'Yesterday',
    'Last 3 days',
    'Last week',
    'Last month'
  ]
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
  loadDummyCohorts (context) {
    let cohorts = [
      {
        id: 1,
        name: 'Cohort A',
        n_accounts: '345',
        n_tweets: '34654',
        top_unigrams: [
          'vanilla ice cream colored sprinkles',
          'vanilla ice cream chocolate sprinkles',
          'vanilla ice cream syrup',
          'vanilla ice cream whipped cream',
          'vanilla cakes colored sprinkles',
          'vanilla cakes chocolate sprinkles',
          'vanilla cakes syrup',
          'vanilla cakes whipped cream',
          'vanilla candy colored sprinkles',
          'vanilla candy chocolate sprinkles',
          'vanilla candy syrup',
          'vanilla candy whipped cream',
          'vanilla ices colored sprinkles',
          'vanilla ices chocolate sprinkles',
          'vanilla ices syrup',
          'vanilla ices whipped cream'
        ]
      },
      {
        id: 2,
        name: 'Cohort B',
        n_accounts: '8854',
        n_tweets: '10654',
        top_unigrams: [
          'chocolate chip ice cream colored sprinkles',
          'chocolate chip ice cream chocolate sprinkles',
          'chocolate chip ice cream syrup',
          'chocolate chip ice cream whipped cream',
          'chocolate chip cakes colored sprinkles',
          'chocolate chip cakes chocolate sprinkles',
          'chocolate chip cakes syrup',
          'chocolate chip cakes whipped cream',
          'chocolate chip candy colored sprinkles',
          'chocolate chip candy chocolate sprinkles',
          'chocolate chip candy syrup',
          'chocolate chip candy whipped cream',
          'chocolate chip ices colored sprinkles',
          'chocolate chip ices chocolate sprinkles',
          'chocolate chip ices syrup',
          'chocolate chip ices whipped cream'
        ]
      },
      {
        id: 3,
        name: 'Cohort C',
        n_accounts: '97893',
        n_tweets: '35646',
        top_unigrams: [
          'strawberry ice cream colored sprinkles',
          'strawberry ice cream chocolate sprinkles',
          'strawberry ice cream syrup',
          'strawberry ice cream whipped cream',
          'strawberry cakes colored sprinkles',
          'strawberry cakes chocolate sprinkles',
          'strawberry cakes syrup',
          'strawberry cakes whipped cream',
          'strawberry candy colored sprinkles',
          'strawberry candy chocolate sprinkles',
          'strawberry candy syrup',
          'strawberry candy whipped cream',
          'strawberry ices colored sprinkles',
          'strawberry ices chocolate sprinkles',
          'strawberry ices syrup',
          'strawberry ices whipped cream'
        ]
      }
    ]

    context.commit('setCohorts', cohorts)
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
