<template>
  <div class="compare-view">
    <div class="container noselect">
      <h1>Compare Media Sets and Sources</h1>

      <p>
        Builder description vestibulum vitae risus vitae urna molestie ultricies vitae nec risus. Etiam ut luctus nulla. Sed sapien arcu, luctus vel sodales vel, malesuada at neque. Pellentesque congue nisl ut justo sagittis rutrum. Praesent quam sem, feugiat ac velit sed, vulputate aliquet leo. Aenean aliquet arcu et magna suscipit blandit. Fusce lacus diam, gravida congue felis et, ultrices aliquet neque. Morbi lacinia mi velit, sed fringilla nibh laoreet id. Phasellus nec varius nibh. Nullam vitae nibh et urna aliquet iaculis vitae id arcu. Phasellus et maximus ligula. In neque velit, pulvinar in iaculis a, cursus sed tellus.
      </p>

      <div class="field">
        <label class="label">Media sources to compare</label>
        <div class="control">
          <multiselect v-model="mediaSourcesValue" :options="getMediaSources()" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Click to select" label="name" track-by="name" :input="changed()">
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} selected</span>
            </template>
          </multiselect>
        </div>
      </div>

      <div class="b-table" v-if="mediaSourcesValue.length > 0">
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th v-for="mediaSource in mediaSourcesValue">{{ mediaSource.name }}</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'compare-index',
    props: [],
    components: {},
    data () {
      return {
        mediaSourcesValue: []
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
      },
      getMediaSources () {
        if (this.$store.state.mediaSources.mediaSources.data) {
          return this.$store.state.mediaSources.mediaSources.data.map((mediaSource) => {
            return {
              name: mediaSource.attributes.name,
              id: mediaSource.id
            }
          })
        }

        return []
      },
      changed () {
        this.$router.replace({
          path: '/compare',
          query: {
            mediaSets: this.mediaSourcesValue.map((mediaSource) => {
              return mediaSource.id
            }).join(',')
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Compare/index.scss'
</style>
