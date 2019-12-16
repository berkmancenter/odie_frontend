<template>
  <div class="media-sources-view">
    <div class="container">
      <h1>Media Sources</h1>

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
          <tr v-for="source in $store.state.mediaSources.mediaSources.data">
            <td>
              <router-link :to="'/media-source/' + source.id">
                {{ source.attributes.name }}
              </router-link>
            </td>
            <td>{{ source.attributes.latest_data.data.attributes.num_tweets }}</td>
            <td>{{ source.attributes.latest_data.data.attributes.num_retweets }}</td>
            <td>{{ source.attributes.latest_data.data.attributes.num_users }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'media-sources-index',
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
  @import './../../assets/scss/MediaSources/index.scss'
</style>
