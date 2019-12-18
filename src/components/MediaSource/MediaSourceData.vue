<template>
  <div class="media-source-data">
    <nav class="level">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Tweets</p>
          <p class="title">{{ data.num_tweets }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Users</p>
          <p class="title">{{ data.num_users }}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Retweets</p>
          <p class="title">{{ data.num_retweets }}</p>
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
                    v-for="(count, item) in sortedSomething(data.hashtags)"
              >
                <a :href="'https://twitter.com/hashtag/' + item" 
                   target="_blank"
                   :title="'#' + item"
                >
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
                    v-for="(count, item) in sortedSomething(data.top_sources)"
                    :title="item"
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
              <span class="tag is-primary is-pulled-right" v-for="(count, tag) in sortedSomething(data.top_retweets)" :title="tag"><span class="tag-title">{{ tag }}</span> <span class="tag-value">{{ count }}</span></span>
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
                    v-for="(count, item) in sortedSomething(data.top_mentions)"
              >
                <a :href="'https://twitter.com/' + item" 
                   target="_blank"
                   :title="'@' + item">
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
                    v-for="(count, item) in sortedSomething(data.top_urls)"
                    :title="item"
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
              <span class="tag is-primary is-pulled-right" v-for="(count, word) in sortedSomething(data.top_words)" :title="word">
                <a :href="'https://twitter.com/search?q=' + word" target="_blank">
                  <span class="tag-title">{{ word }}</span>
                </a>
                <span class="tag-value">{{ count }}</span>
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'media-source-data',
    props: ['data'],
    components: {},
    data () {
      return {}
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
