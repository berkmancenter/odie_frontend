import MediaSourcesProxy from './../../proxies/MediaSourcesProxy'

let mediaSourcesProxy = new MediaSourcesProxy()

// initial state
const state = {
  mediaSources: [],
  aggregatedMediaSource: [],
  activeMediaSource: false
}

// getters
const getters = {}

// actions
const actions = {
  loadMediaSources (context) {
    mediaSourcesProxy
      .all()
      .then((response) => {
        context.commit('setMediaSources', response)
      })
  },
  loadAggregatedMediaSource (context, ids) {
    mediaSourcesProxy
      .aggregated({
        ids: ids
      })
      .then((response) => {
        context.commit('setAggregaedMediaSource', response)
      })
  },
  loadMediaSource (context, id) {
    mediaSourcesProxy
      .find(id)
      .then((response) => {
        context.commit('setActiveMediaSource', response)
      })
  }
}

// mutations
const mutations = {
  setMediaSources (state, mediaSources) {
    state.mediaSources = mediaSources
  },
  setAggregaedMediaSource (state, mediaSource) {
    state.aggregatedMediaSource = mediaSource
  },
  setActiveMediaSource (state, mediaSource) {
    state.activeMediaSource = mediaSource
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
