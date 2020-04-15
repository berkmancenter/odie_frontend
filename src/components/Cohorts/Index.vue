<template>
  <div class="cohorts-view">
    <div class="container">
      <h1>Cohorts</h1>

      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Tweets</th>
            <th>Retweets</th>
            <th>Users</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cohort in $store.state.cohorts.cohorts.data">
            <td>
              <router-link :to="'/cohort/' + cohort.id">
                {{ cohort.attributes.description }}
              </router-link>
            </td>
            <td>{{ cohort.attributes.latest_data.data.attributes.num_tweets }}</td>
            <td>{{ cohort.attributes.latest_data.data.attributes.num_retweets }}</td>
            <td>{{ cohort.attributes.latest_data.data.attributes.num_users }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cohorts-index',
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
  @import './../../assets/scss/Cohorts/index.scss'
</style>
