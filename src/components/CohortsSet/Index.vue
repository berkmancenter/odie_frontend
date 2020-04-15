<template>
  <div class="cohorts-set-view">
    <div class="container noselect">
      <h1>{{ cohortsSetName }}</h1>

      <div class="cohorts-set-view-social">
        <vue-goodshare></vue-goodshare>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            Cohorts
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="buttons">
              <b-button
                tag="router-link"
                :to="'/cohort/' + cohort.id"
                v-for="cohort in cohorts()"
                v-bind:key="cohort.id"
              >
                {{ cohort.attributes.description }}
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <CohortData v-if="$store.state.cohorts.aggregatedCohort.data" :data="$store.state.cohorts.aggregatedCohort.data[0].attributes.latest_data.data.attributes"></CohortData>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import CohortData from '../Cohort/CohortData'
  import VueGoodshare from 'vue-goodshare'

  export default {
    name: 'cohorts-set-index',
    props: [],
    components: {
      CohortData,
      VueGoodshare
    },
    data () {
      return {
        cohortsSetName: this.$route.query.name
      }
    },
    created () {
      this.$store.dispatch('cohorts/loadCohorts')
      this.$store.dispatch('cohorts/loadAggregatedCohort', this.$route.query.cohortsSets.split(','))
    },
    methods: {
      cohorts () {
        if (this.$store.state.cohorts.cohorts.data) {
          let cohortsSetsIds = this.$route.query.cohortsSets.split(',')

          return this.$store.state.cohorts.cohorts.data.filter((cohort) => {
            if (_.indexOf(cohortsSetsIds, cohort.id) !== -1) {
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
  @import './../../assets/scss/CohortsSet/index.scss'
</style>
