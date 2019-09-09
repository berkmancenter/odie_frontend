import MediaSourcesProxy from './../../proxies/MediaSourcesProxy'

let mediaSourcesProxy = new MediaSourcesProxy()

// initial state
const state = {
  mediaSources: [],
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
