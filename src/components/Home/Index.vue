<template>
  <div class="home-view noselect">
    <div class="container">
      <section class="hero is-light">
        <div class="hero-body">
          <div class="container">
            <h2 class="subtitle has-text-centered">
              Some description/slogan text about the site to let users immediately know what it is
            </h2>
          </div>
        </div>
      </section>

      <h3 class="has-text-centered">Media Sources</h3>

      <div class="columns">
        <div class="column is-half" v-for="source in $store.state.mediaSources.mediaSources.data">

          <div class="card">
            <div class="card-content has-text-weight-bold">
              <h4>{{ source.attributes.name }}</h4>
              <div class="tags">
                <span class="tag is-primary"><span class="tag-title">{{ source.attributes.latest_data.data.attributes.num_users }}</span> <span class="tag-value">users</span></span>
                <span class="tag is-primary"><span class="tag-title">{{ source.attributes.latest_data.data.attributes.num_retweets }}</span> <span class="tag-value">retweets</span></span>
                <span class="tag is-primary"><span class="tag-title">{{ source.attributes.latest_data.data.attributes.num_tweets }}</span> <span class="tag-value">tweets</span></span>
              </div>
            </div>
            <footer class="card-footer noselect">
              <router-link :to="'/media-source/' + source.id">
                <div class="card-footer-item">
                  <span>
                    View
                  </span>
                </div>
              </router-link>
            </footer>
          </div>
        </div>
      </div>

      <router-link class="button is-primary home-view-card-show-all" :to="'/media-sources'">
        List All
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home-index',
    components: {},
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('mediaSources/loadMediaSources')
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Home/index.scss'
</style>
