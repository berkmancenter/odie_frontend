<template>
  <div class="compare-view">
    <div class="container noselect">
      <h1>Compare Cohorts</h1>

      <p>
        Builder description vestibulum vitae risus vitae urna molestie ultricies vitae nec risus. Etiam ut luctus nulla. Sed sapien arcu, luctus vel sodales vel, malesuada at neque. Pellentesque congue nisl ut justo sagittis rutrum. Praesent quam sem, feugiat ac velit sed, vulputate aliquet leo. Aenean aliquet arcu et magna suscipit blandit. Fusce lacus diam, gravida congue felis et, ultrices aliquet neque. Morbi lacinia mi velit, sed fringilla nibh laoreet id. Phasellus nec varius nibh. Nullam vitae nibh et urna aliquet iaculis vitae id arcu. Phasellus et maximus ligula. In neque velit, pulvinar in iaculis a, cursus sed tellus.
      </p>

      <div class="field">
        <label class="label">Cohorts to compare</label>
        <div class="control">
          <multiselect v-model="cohortsValue" :options="getCohorts()" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Click to select" label="name" track-by="name" :input="changed()">
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} selected</span>
            </template>
          </multiselect>
        </div>
      </div>

      <div class="b-table" v-if="cohortsValue.length > 0">
        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th v-for="cohort in cohortsValue">{{ cohort.name }}</th>
              </tr>
            </thead>
            <tbody v-if="media_sources">
              <DataRow title="Hashtags" data_key="hashtags" :items="getRowData()"></DataRow>
              <DataRow title="Sources" data_key="top_sources" :items="getRowData()"></DataRow>
              <DataRow title="Retweets" data_key="top_retweets" :items="getRowData()"></DataRow>
              <DataRow title="Mentions" data_key="top_mentions" :items="getRowData()"></DataRow>
              <DataRow title="Urls" data_key="top_urls" :items="getRowData()"></DataRow>
              <DataRow title="Words" data_key="top_words" :items="getRowData()"></DataRow>
            </tbody>
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
        cohortsValue: []
      }
    },
    computed: {
      cohortsStore () {
        return this.$store.state.cohorts.cohorts
      }
    },
    created () {
      this.$store.dispatch('cohorts/loadCohorts')
    },
    methods: {
      getCohorts () {
        if (this.$store.state.cohorts.cohorts.data) {
          return this.$store.state.cohorts.cohorts.data.map((cohort) => {
            return {
              name: cohort.attributes.description,
              id: cohort.id
            }
          })
        }

        return []
      },
      changed () {
        if (this.cohortsValue.length > 0) {
          this.$router.push({
            name: 'compare.index',
            params: {
              media_sources: this.cohortsValue.map((cohort) => {
                return cohort.id
              }).join('…')
            }
          })
        }
      },
      getRowData (cohortId) {
        const cohortsArr = this.media_sources.split('…')

        return this.$store.state.cohorts.cohorts.data.filter((cohort) => {
          return _.includes(cohortsArr, cohort.id)
        })
      }
    },
    watch: {
      cohortsStore (newVal, oldVal) {
        if (this.media_sources) {
          const cohortsArr = this.media_sources.split('…')

          if (this.$store.state.cohorts.cohorts.data) {
            this.cohortsValue = this.$store.state.cohorts.cohorts.data
              .map((cohort) => {
                return {
                  name: cohort.attributes.description,
                  id: cohort.id
                }
              })
              .filter((cohort) => {
                return _.includes(cohortsArr, cohort.id)
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
