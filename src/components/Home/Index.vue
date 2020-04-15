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

      <h3 class="has-text-centered">Cohorts</h3>

      <div class="columns">
        <div class="column is-half" v-for="cohort in $store.state.cohorts.cohorts.data">

          <div class="card">
            <div class="card-content has-text-weight-bold">
              <h4>
                <router-link :to="'/cohorts/' + cohort.id">
                  {{ cohort.attributes.description }}
                </router-link>
              </h4>
              <div class="tags">
                <span class="tag is-primary"><span class="tag-title">{{ cohort.attributes.latest_data.data.attributes.num_users }}</span> <span class="tag-value">users</span></span>
                <span class="tag is-primary"><span class="tag-title">{{ cohort.attributes.latest_data.data.attributes.num_retweets }}</span> <span class="tag-value">retweets</span></span>
                <span class="tag is-primary"><span class="tag-title">{{ cohort.attributes.latest_data.data.attributes.num_tweets }}</span> <span class="tag-value">tweets</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-link class="button is-primary home-view-card-show-all" :to="'/cohorts'">
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
      this.$store.dispatch('cohorts/loadCohorts')
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Home/index.scss'
</style>
