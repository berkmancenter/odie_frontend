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
              <DataRow title="Hashtags" data_key="hashtags" :items="getRowData()"></DataRow>
              <DataRow title="Sources" data_key="top_sources" :items="getRowData()"></DataRow>
              <DataRow title="Retweets" data_key="top_retweets" :items="getRowData()"></DataRow>
              <DataRow title="Mentions" data_key="top_mentions" :items="getRowData()"></DataRow>
              <DataRow title="Urls" data_key="top_urls" :items="getRowData()"></DataRow>
              <DataRow title="Words" data_key="top_words" :items="getRowData()"></DataRow>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import DataRow from './DataRow'

  export default {
    name: 'compare-index',
    props: ['media_sources'],
    components: {
      DataRow
    },
    data () {
      return {
        mediaSourcesValue: []
      }
    },
    computed: {
      mediaSourcesStore () {
        return this.$store.state.mediaSources.mediaSources
      }
    },
    created () {
      this.$store.dispatch('mediaSources/loadMediaSources')
    },
    methods: {
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
        if (this.mediaSourcesValue.length > 0) {
          this.$router.push({
            name: 'compare.index',
            params: {
              media_sources: this.mediaSourcesValue.map((mediaSource) => {
                return mediaSource.id
              }).join('…')
            }
          })
        }
      },
      getRowData (mediaSourceId) {
        const mediaSourcesArr = this.media_sources.split('…')

        return this.$store.state.mediaSources.mediaSources.data.filter((mediaSource) => {
          return _.includes(mediaSourcesArr, mediaSource.id)
        })
      }
    },
    watch: {
      mediaSourcesStore (newVal, oldVal) {
        if (this.media_sources) {
          const mediaSourcesArr = this.media_sources.split('…')

          if (this.$store.state.mediaSources.mediaSources.data) {
            this.mediaSourcesValue = this.$store.state.mediaSources.mediaSources.data
              .map((mediaSource) => {
                return {
                  name: mediaSource.attributes.name,
                  id: mediaSource.id
                }
              })
              .filter((mediaSource) => {
                return _.includes(mediaSourcesArr, mediaSource.id)
              })
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Compare/index.scss'
</style>
