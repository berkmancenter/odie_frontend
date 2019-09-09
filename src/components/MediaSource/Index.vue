<template>
  <div class="media-source-view" v-if="$store.state.mediaSources.activeMediaSource">
    <div class="container">
      <h1>{{ $store.state.mediaSources.activeMediaSource.data.attributes.name }}
        <span class="is-size-6"><span class="has-text-weight-bold"></span> <a :href="$store.state.mediaSources.activeMediaSource.data.attributes.url" target="_blank">{{ $store.state.mediaSources.activeMediaSource.data.attributes.url }}</a></span>
      </h1>

      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Tweets</p>
            <p class="title">{{ $store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.num_tweets }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Users</p>
            <p class="title">{{ $store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.num_users }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Retweets</p>
            <p class="title">{{ $store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.num_retweets }}</p>
          </div>
        </div>
      </nav>

      <div class="card">
        <div class="card-content has-text-weight-bold">
          Top Hashtags
        </div>
        <footer class="card-footer noselect">
          <div class="card-footer-item tags">
            <span class="tag is-primary is-pulled-right" v-for="(count, tag) in sortedTags()">{{ tag }} <span>{{ count }}</span></span>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'media-source-index',
    props: ['media_source_id'],
    components: {},
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('mediaSources/loadMediaSource', this.$props.media_source_id)
    },
    methods: {
      sortedTags () {
        let asInt = {}

        _.forEach(this.$store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.hashtags, (count, tag) => {
          asInt[tag] = parseInt(count)
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
