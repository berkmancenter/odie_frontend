<template>
  <div class="cohort-data">
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

    <div class="cohort-data-cards">
      <div class="cohort-data-card-container">
        <CohortDataCard label="Top Hashtags" dataKey="hashtags" :data="data.hashtags">
          <div slot-scope="slotProps">
            <a :href="'https://twitter.com/hashtag/' + slotProps.item" 
               target="_blank"
               :title="'#' + slotProps.item"
               class="cohort-data-item-title"
            >
              #{{ slotProps.item }}
            </a>
            <span class="cohort-data-item-value">{{ slotProps.count }}</span>
          </div>
        </CohortDataCard>
      </div>

      <div class="cohort-data-card-container">
        <CohortDataCard label="Top Sources" dataKey="top_sources" :data="data.top_sources">
          <div slot-scope="slotProps">
            <a :href="'http://' + slotProps.item.replace('http://', '').replace('https://', '')"
               target="_blank"
               :title="slotProps.item"
               class="cohort-data-item-title"
            >
              {{ slotProps.item }}
            </a>
            <span class="cohort-data-item-value">{{ slotProps.count }}</span>
          </div>
        </CohortDataCard>
      </div>

      <div class="cohort-data-card-container">
        <CohortDataCard label="Top Retweets" dataKey="top_retweets" :data="data.top_retweets">
          <div slot-scope="slotProps">
            <a :href="'http://' + slotProps.link.replace('http://', '').replace('https://', '')"
               target="_blank"
               :title="slotProps.item"
               class="cohort-data-item-title"
               v-if="slotProps.link"
            >
              @{{ slotProps.item }}
            </a>
            <div class="cohort-data-item-title noselect-or-maybe-select" v-if="!slotProps.link">{{ slotProps.item }}</div>
            <span class="cohort-data-item-value">{{ slotProps.count }}</span>
          </div>
        </CohortDataCard>
      </div>

      <div class="cohort-data-card-container">
        <CohortDataCard label="Top Mentions" dataKey="top_mentions" :data="data.top_mentions">
          <div slot-scope="slotProps">
            <a :href="'https://twitter.com/' + slotProps.item"
               target="_blank"
               :title="slotProps.item"
               class="cohort-data-item-title"
            >
              @{{ slotProps.item }}
            </a>
            <span class="cohort-data-item-value">{{ slotProps.count }}</span>
          </div>
        </CohortDataCard>
      </div>

      <div class="cohort-data-card-container">
        <CohortDataCard label="Top Urls" dataKey="top_urls" :data="data.top_urls">
          <div slot-scope="slotProps">
            <a :href="'http://' + slotProps.item.replace('http://', '').replace('https://', '')"
               target="_blank"
               :title="slotProps.item"
               class="cohort-data-item-title"
            >
              {{ slotProps.item }}
            </a>
            <span class="cohort-data-item-value">{{ slotProps.count }}</span>
          </div>
        </CohortDataCard>
      </div>

      <div class="cohort-data-card-container">
        <CohortDataCard label="Top Words" dataKey="top_words" :data="data.top_words">
          <div slot-scope="slotProps">
            <a :href="'https://twitter.com/search?q=' + slotProps.item"
               target="_blank"
               :title="slotProps.item"
               class="cohort-data-item-title"
            >
              {{ slotProps.item }}
            </a>
            <span class="cohort-data-item-value">{{ slotProps.count }}</span>
          </div>
        </CohortDataCard>
      </div>
    </div>
  </div>
</template>

<script>
  import CohortDataCard from './CohortDataCard'

  export default {
    name: 'cohort-data',
    props: ['data'],
    components: {
      CohortDataCard
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import './../../assets/scss/CohortData/index.scss';
</style>
