<template>
  <div class="media-source-view" v-if="$store.state.mediaSources.activeMediaSource">
    <div class="container noselect">
      <h1>{{ $store.state.mediaSources.activeMediaSource.data.attributes.name }}
        <span class="is-size-6"><span class="has-text-weight-bold"></span> <a :href="'http://' + $store.state.mediaSources.activeMediaSource.data.attributes.url" target="_blank">{{ $store.state.mediaSources.activeMediaSource.data.attributes.url }}</a></span>
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

      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content has-text-weight-bold">
              Top Hashtags
              <b-tooltip label="Some info about this set" animated>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </b-tooltip>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item tags">
                <span class="tag is-primary is-pulled-right" 
                      v-for="(count, item) in sortedSomething($store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.hashtags)"
                >
                  <a :href="'https://twitter.com/hashtag/' + item" target="_blank">
                    <span class="tag-title">#{{ item }}</span>
                  </a>
                  <span class="tag-value">{{ count }}</span>
                </span>
              </div>
            </footer>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content has-text-weight-bold">
              Top Sources
              <b-tooltip label="Some info about this set" animated>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </b-tooltip>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item tags">
                <span class="tag is-primary is-pulled-right" 
                      v-for="(count, item) in sortedSomething($store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.top_sources)"
                >
                  <a :href="'https://' + item" target="_blank">
                    <span class="tag-title">{{ item }}</span>
                  </a>
                  <span class="tag-value">{{ count }}</span>
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content has-text-weight-bold">
              Top Retweets
              <b-tooltip label="Some info about this set" animated>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </b-tooltip>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item tags">
                <span class="tag is-primary is-pulled-right" v-for="(count, tag) in sortedSomething($store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.top_retweets)"><span class="tag-title">{{ tag }}</span> <span class="tag-value">{{ count }}</span></span>
              </div>
            </footer>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content has-text-weight-bold">
              Top Mentions
              <b-tooltip label="Some info about this set" animated>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </b-tooltip>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item tags">
                <span class="tag is-primary is-pulled-right" 
                      v-for="(count, item) in sortedSomething($store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.top_mentions)"
                >
                  <a :href="'https://twitter.com/' + item" target="_blank">
                    <span class="tag-title">@{{ item }}</span>
                  </a>
                  <span class="tag-value">{{ count }}</span>
                </span>
              </div>
            </footer>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <div class="card">
            <div class="card-content has-text-weight-bold">
              Top Urls
              <b-tooltip label="Some info about this set" animated>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </b-tooltip>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item tags">
                <span class="tag is-primary is-pulled-right" 
                      v-for="(count, item) in sortedSomething($store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.top_urls)"
                >
                  <a :href="item" target="_blank">
                    <span class="tag-title">{{ item }}</span>
                  </a>
                  <span class="tag-value">{{ count }}</span>
                </span>
              </div>
            </footer>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-content has-text-weight-bold">
              Top Words
              <b-tooltip label="Some info about this set" animated>
                <i class="fa fa-info-circle" aria-hidden="true"></i>
              </b-tooltip>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item tags">
                <span class="tag is-primary is-pulled-right" v-for="(count, source) in sortedSomething($store.state.mediaSources.activeMediaSource.data.attributes.latest_data.data.attributes.top_words)"><span class="tag-title">{{ source }}</span> <span class="tag-value">{{ count }}</span></span>
              </div>
            </footer>
          </div>
        </div>
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
