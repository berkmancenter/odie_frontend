<template>
  <div class="media-source-view" v-if="$store.state.mediaSources.activeMediaSource">
    <div class="container noselect">
      <h1>{{ $store.state.mediaSources.activeMediaSource.data.attributes.name }}
        <span class="is-size-6"><span class="has-text-weight-bold"></span> <a :href="'http://' + $store.state.mediaSources.activeMediaSource.data.attributes.url" target="_blank">{{ $store.state.mediaSources.activeMediaSource.data.attributes.url }}</a></span>
      </h1>

      <vue-goodshare></vue-goodshare>

      <MediaSourceData :data="$store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes"></MediaSourceData>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import MediaSourceData from './MediaSourceData'
  import VueGoodshare from 'vue-goodshare'

  export default {
    name: 'media-source-index',
    props: ['media_source_id'],
    components: {
      MediaSourceData,
      VueGoodshare
    },
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('mediaSources/loadMediaSource', this.$props.media_source_id)
    },
    methods: {
      sortedSomething (what, howMany = 10) {
        let asInt = {}

        let limitedObjects = Object.keys(what).slice(0, howMany - 1).reduce((result, key) => {
          result[key] = what[key]
          return result
        }, {})

        _.forEach(limitedObjects, (count, item) => {
          asInt[item] = parseInt(count)
        })

        return _(asInt)
                 .toPairs()
                 .orderBy([1], ['desc'])
                 .fromPairs()
                 .value()
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/MediaSource/index.scss'
</style>
