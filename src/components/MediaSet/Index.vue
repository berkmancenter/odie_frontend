<template>
  <div class="media-set-view">
    <div class="container noselect">
      <h1>{{ mediaSetName }}</h1>

      <div class="card">
        <div class="card-content has-text-weight-bold">
          Media Sources
        </div>
        <footer class="card-footer">
          <div class="card-footer-item tags">
            <span class="tag is-primary" v-for="mediaSource in mediaSources()">{{ mediaSource.attributes.name }}</span>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'media-set-index',
    props: [],
    components: {},
    data () {
      return {
        mediaSetName: this.$route.query.name
      }
    },
    created () {
      this.$store.dispatch('mediaSources/loadMediaSources')
    },
    methods: {
      mediaSources () {
        if (this.$store.state.mediaSources.mediaSources.data) {
          let mediaSetsIds = this.$route.query.mediaSets.split(',')

          return this.$store.state.mediaSources.mediaSources.data.filter((mediaSource) => {
            if (_.indexOf(mediaSetsIds, mediaSource.id) !== -1) {
              return true
            }

            return false
          })
        }

        return []
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/MediaSet/index.scss'
</style>
