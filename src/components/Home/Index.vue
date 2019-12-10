<template>
  <div class="home-view">
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

      <div class="columns">
        <div class="column noselect">
          <h3 class="text-center">Media Sources</h3>

          <div class="card" v-for="source in $store.state.mediaSources.mediaSources.data">
            <div class="card-content has-text-weight-bold">
              {{ source.attributes.name }}
              <div class="tags">
                <span class="tag is-primary">{{ source.attributes.latest_data.data.attributes.num_users }} users</span>
                <span class="tag is-primary">{{ source.attributes.latest_data.data.attributes.num_retweets }} retweets</span>
                <span class="tag is-primary">{{ source.attributes.latest_data.data.attributes.num_tweets }} tweets</span>
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

          <router-link class="button is-primary home-view-card-show-all" :to="'/media-sources'">
            List All
          </router-link>
        </div>

        <div class="column noselect" style="opacity: 0.5; pointer-events: none;">
          <h3 class="text-center">Media Sets</h3>

          <div class="card" v-for="source in ['New York Times + CNN', 'CNN + Wall Street Journal', 'CNN + Wall Street Journal', 'CNN + Wall Street Journal', 'CNN + Wall Street Journal']">
            <div class="card-content has-text-weight-bold">
              {{ source }}
              <span class="tag is-primary is-pulled-right">32 users</span>
              <span class="tag is-primary is-pulled-right">211 retweets</span>
              <span class="tag is-primary is-pulled-right">345 tweets</span>
            </div>
            <footer class="card-footer">
              <div class="card-footer-item noselect">
                <span>
                  <a>View</a>
                </span>
              </div>
            </footer>
          </div>

          <a class="button is-primary home-view-card-show-all">List All</a>
        </div>
        </div>
      </div>
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
