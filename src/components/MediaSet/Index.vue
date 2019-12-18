<template>
  <div class="media-set-view">
    <div class="container noselect">
      <h1>{{ mediaSetName }}</h1>

      <div class="media-set-view-social">
        <vue-goodshare></vue-goodshare>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Media Sources
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="buttons">
              <b-button
                tag="router-link"
                :to="'/media-source/' + mediaSource.id"
                v-for="mediaSource in mediaSources()"
                v-bind:key="mediaSource.id"
              >
                {{ mediaSource.attributes.name }}
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <MediaSourceData v-if="$store.state.mediaSources.aggregatedMediaSource.aggregate_data" :data="$store.state.mediaSources.aggregatedMediaSource.aggregate_data"></MediaSourceData>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import MediaSourceData from '../MediaSource/MediaSourceData'
  import VueGoodshare from 'vue-goodshare'

  export default {
    name: 'media-set-index',
    props: [],
    components: {
      MediaSourceData,
      VueGoodshare
    },
    data () {
      return {
        mediaSetName: this.$route.query.name
      }
    },
    created () {
      this.$store.dispatch('mediaSources/loadMediaSources')
      this.$store.dispatch('mediaSources/loadAggregatedMediaSource', this.$route.query.mediaSets.split(','))
    },
    methods: {
      mediaSources () {
        if (this.$store.state.mediaSources.mediaSources.data) {
          let mediaSetsIds = this.$route.query.mediaSets.split(',')

          return this.$store.state.mediaSources.mediaSources.data.filter((mediaSource) => {
            if (_.indexOf(mediaSetsIds, mediaSource.id) !== -1) {
              return true
            }

            return false
          })
        }

        return []
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/MediaSet/index.scss'
</style>
