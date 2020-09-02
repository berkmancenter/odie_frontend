<template>
  <div class="compare-view">
    <div class="container noselect">
      <h1 class="has-text-centered">Compare</h1>

      <div class="columns">
        <div class="column is-two-fifths has-text-centered">
          <b-select class="is-pulled-right" placeholder="Select a cohort" v-model="cohort_a">
            <option
                v-for="cohort in this.$store.state.cohorts.cohorts"
                :value="cohort.id"
                :key="cohort.id">
                {{ cohort.name }}
            </option>
          </b-select>
        </div>
        <div class="column has-text-centered">
          <h4>to</h4>
        </div>
        <div class="column is-two-fifths has-text-centered">
          <b-select class="is-pulled-left" placeholder="Select a cohort" v-model="cohort_b">
            <option
                v-for="cohort in this.$store.state.cohorts.cohorts"
                :value="cohort.id"
                :key="cohort.id">
                {{ cohort.name }}
            </option>
          </b-select>
        </div>
      </div>

      <div class="columns">
        <div class="column is-two-fifths has-text-centered">
          <h5 class="is-pulled-right mb-0">over</h5>
        </div>
        <div class="column has-text-centered"></div>
        <div class="column is-two-fifths has-text-centered">
          <h5 class="is-pulled-left mb-0">over</h5>
        </div>
      </div>

      <div class="columns">
        <div class="column is-two-fifths has-text-centered">
          <div>
            <b-select class="is-pulled-right" placeholder="Select a timespan" v-model="timespan_a">
              <option
                  v-for="timespan in this.$store.state.cohorts.timespans"
                  :value="timespan"
                  :key="timespan">
                  {{ timespan }}
              </option>
            </b-select>
          </div>
        </div>
        <div class="column has-text-centered"></div>
        <div class="column is-two-fifths has-text-centered">
          <b-select class="is-pulled-left" placeholder="Select a timespan" v-model="timespan_b">
            <option
                v-for="timespan in this.$store.state.cohorts.timespans"
                :value="timespan"
                :key="timespan">
                {{ timespan }}
            </option>
          </b-select>
        </div>
      </div>

      <div v-if="cohort_a && cohort_b && timespan_a && timespan_b">
        <div class="columns">
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-right">
              <h3>{{ cohortData(cohort_a).name }}</h3>
            </div>
          </div>
          <div class="column has-text-centered"></div>
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-left">
              <h3>{{ cohortData(cohort_b).name }}</h3>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-right">
              {{ cohortData(cohort_a).n_tweets }}
            </div>
          </div>
          <div class="column has-text-centered">
            <h6 class="mb-0"># Tweets</h6>
          </div>
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-left">
              {{ cohortData(cohort_b).n_tweets }}
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-right">
              {{ cohortData(cohort_a).n_accounts }}
            </div>
          </div>
          <div class="column has-text-centered">
            <h6 class="mb-0"># Accounts</h6>
          </div>
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-left">
              {{ cohortData(cohort_b).n_accounts }}
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column has-text-centered">
            <h4 class="mb-0">Most Distingusing Phrases</h4>
          </div>
        </div>

        <div class="columns">
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-right">
              <div v-for="phrase in cohortData(cohort_a).top_unigrams">{{ phrase }}</div>
            </div>
          </div>
          <div class="column has-text-centered"></div>
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-left">
              <div v-for="phrase in cohortData(cohort_b).top_unigrams">{{ phrase }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="has-text-centered" v-if="!cohort_a || !cohort_b || !timespan_a || !timespan_b">
        <h4>Select both cohorts and timespans to see data</h4>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'compare-v2-index',
    props: ['media_sources'],
    data () {
      return {
        cohortsValue: [],
        cohort_a: false,
        cohort_b: false,
        timespan_a: false,
        timespan_b: false
      }
    },
    computed: {
      cohortsStore () {
        return this.$store.state.cohorts.cohorts
      }
    },
    created () {
      this.$store.dispatch('cohorts/loadDummyCohorts')
    },
    methods: {
      cohortData (cohortId) {
        return _.find(this.$store.state.cohorts.cohorts, (cohort) => {
          return cohort.id === cohortId
        })
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Compare_V2/index.scss'
</style>
