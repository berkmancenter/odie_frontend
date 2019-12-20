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
  import MediaSourceDataCard from './MediaSourceDataCard'

  export default {
    name: 'media-source-data',
    props: ['data'],
    components: {
      MediaSourceDataCard
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import './../../assets/scss/MediaSourceData/index.scss';
</style>
