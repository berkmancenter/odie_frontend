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
        <MediaSourceDataCard label="Top Hashtags" dataKey="hashtags" :data="data.hashtags">
          <div slot-scope="slotProps">
            <a :href="'https://twitter.com/hashtag/' + slotProps.item" 
               target="_blank"
               :title="'#' + slotProps.item"
               class="media-source-data-item-title"
            >
              #{{ slotProps.item }}
            </a>
            <span class="media-source-data-item-value">{{ slotProps.count }}</span>
          </div>
        </MediaSourceDataCard>
      </div>

      <div class="column">
        <MediaSourceDataCard label="Top Sources" dataKey="top_sources" :data="data.top_sources">
          <div slot-scope="slotProps">
            <a :href="'https://' + slotProps.item"
               target="_blank"
               :title="slotProps.item"
               class="media-source-data-item-title"
            >
              {{ slotProps.item }}
            </a>
            <span class="media-source-data-item-value">{{ slotProps.count }}</span>
          </div>
        </MediaSourceDataCard>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <MediaSourceDataCard label="Top Retweets" dataKey="top_retweets" :data="data.top_retweets">
          <div slot-scope="slotProps">
            <div class="media-source-data-item-title">{{ slotProps.item }}</div>
            <span class="media-source-data-item-value">{{ slotProps.count }}</span>
          </div>
        </MediaSourceDataCard>
      </div>

      <div class="column">
        <MediaSourceDataCard label="Top Mentions" dataKey="top_mentions" :data="data.top_mentions">
          <div slot-scope="slotProps">
            <a :href="'https://twitter.com/' + slotProps.item"
               target="_blank"
               :title="slotProps.item"
               class="media-source-data-item-title"
            >
              @{{ slotProps.item }}
            </a>
            <span class="media-source-data-item-value">{{ slotProps.count }}</span>
          </div>
        </MediaSourceDataCard>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <MediaSourceDataCard label="Top Urls" dataKey="top_urls" :data="data.top_urls">
          <div slot-scope="slotProps">
            <a :href="slotProps.item"
               target="_blank"
               :title="slotProps.item"
               class="media-source-data-item-title"
            >
              {{ slotProps.item }}
            </a>
            <span class="media-source-data-item-value">{{ slotProps.count }}</span>
          </div>
        </MediaSourceDataCard>
      </div>

      <div class="column">
        <MediaSourceDataCard label="Top Words" dataKey="top_words" :data="data.top_words">
          <div slot-scope="slotProps">
            <a :href="'https://twitter.com/search?q=' + slotProps.item"
               target="_blank"
               :title="slotProps.item"
               class="media-source-data-item-title"
            >
              {{ slotProps.item }}
            </a>
            <span class="media-source-data-item-value">{{ slotProps.count }}</span>
          </div>
        </MediaSourceDataCard>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import MediaSourceChart from './MediaSourceChart'
  import MediaSourceDataCard from './MediaSourceDataCard'

  export default {
    name: 'media-source-data',
    props: ['data'],
    components: {
      MediaSourceChart,
      MediaSourceDataCard
    },
    data () {
      return {
        colorsPalette: [
          '#F3C300', '#875692', '#F38400', '#A1CAF1', '#BE0032', '#C2B280',
          '#2B3D26', '#008856', '#E68FAC', '#0067A5', '#F99379', '#604E97',
          '#F6A600', '#B3446C', '#DCD300', '#882D17', '#8DB600', '#654522',
          '#E25822', '#E320BC', '#3AF2B8'
        ],
        charts: {
          hashtags: false,
          top_sources: false,
          retweets: false,
          mentions: false,
          urls: false,
          words: false
        },
        chartsData: {
          hashtags: {},
          top_sources: {},
          retweets: {},
          mentions: {},
          urls: {},
          words: {}
        }
      }
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
      },
      processChartData (data) {
        return {
          labels: _.keys(data),
          datasets: [
            {
              backgroundColor: _.take(this.colorsPalette, _.values(data).length),
              data: _.values(data)
            }
          ]
        }
      },
      toggleChart (name) {
        this.charts[name] = !this.charts[name]
        this.chartsData[name] = this.processChartData(this.sortedSomething(this.data[name]))
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/MediaSourceData/index.scss';
</style>
