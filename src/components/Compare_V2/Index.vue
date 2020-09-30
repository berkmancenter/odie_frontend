<template>
  <div class="compare-view">
    <div class="container noselect">
      <h1 class="has-text-centered">Compare</h1>

      <div class="columns">
        <div class="column has-text-centered">
          <b-button type="is-primary" @click="resetFilters()">Reset Filters</b-button>
        </div>
      </div>

      <div class="columns">
        <div class="column is-two-fifths has-text-centered">
          <b-select class="is-pulled-right"
                    placeholder="Select a cohort"
                    v-model="cohort_a"
                    :loading="$store.state.cohorts.cohorts.length === 0"
                    @input="reloadComparison">
            <option
                v-for="cohort in orderedCohortsA"
                :value="cohort.id"
                :key="cohort.id">
                {{ cohort.attributes.name }}
            </option>
          </b-select>
        </div>
        <div class="column has-text-centered">
          <h4>to</h4>
        </div>
        <div class="column is-two-fifths has-text-centered">
          <b-select class="is-pulled-left"
                    placeholder="Select a cohort"
                    v-model="cohort_b"
                    :loading="$store.state.cohorts.cohorts.length === 0"
                    @input="reloadComparison">
            <option
                v-for="cohort in orderedCohortsB"
                :value="cohort.id"
                :key="cohort.id">
                {{ cohort.attributes.name }}
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
            <b-select class="is-pulled-right"
                      placeholder="Select a timespan"
                      v-model="timespan_a"
                      :loading="$store.state.cohorts.timespans.length === 0"
                      @input="reloadComparison">
              <option
                  v-for="timespan in orderedTimespansA"
                  :value="timespan.id"
                  :key="timespan.id">
                  {{ timespan.attributes.name }}
              </option>
            </b-select>
          </div>
        </div>
        <div class="column has-text-centered"></div>
        <div class="column is-two-fifths has-text-centered">
          <b-select class="is-pulled-left"
                    placeholder="Select a timespan"
                    v-model="timespan_b"
                    :loading="$store.state.cohorts.timespans.length === 0"
                    @input="reloadComparison">
            <option
                v-for="timespan in orderedTimespansB"
                :value="timespan.id"
                :key="timespan.id">
                {{ timespan.attributes.name }}
            </option>
          </b-select>
        </div>
      </div>

      <div v-if="cohort_a && cohort_b && timespan_a && timespan_b && $store.state.cohorts.comparisonData">
        <div class="columns">
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-right">
              <h3>{{ cohortData(cohort_a).attributes.name }}</h3>
            </div>
          </div>
          <div class="column has-text-centered"></div>
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-left">
              <h3>{{ cohortData(cohort_b).attributes.name }}</h3>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-right">
              {{ comparisonData.attributes.results.summary_a.n_tweets }}
            </div>
          </div>
          <div class="column has-text-centered">
            <h6 class="mb-0"># Tweets</h6>
          </div>
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-left">
              {{ comparisonData.attributes.results.summary_b.n_tweets }}
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-right">
              {{ comparisonData.attributes.results.summary_a.n_accounts }}
            </div>
          </div>
          <div class="column has-text-centered">
            <h6 class="mb-0"># Accounts</h6>
          </div>
          <div class="column is-two-fifths has-text-centered">
            <div class="is-pulled-left">
              {{ comparisonData.attributes.results.summary_b.n_accounts }}
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column has-text-centered">
            <h4 class="mb-0">Most Distingusing Phrases</h4>
          </div>
        </div>

        <div class="columns">
          <div class="column is-two-fifths has-text-right compare-view-phrases-a">
            <b-tabs v-model="activeAGRamsTab" position="is-right" multiline="true">
              <b-tab-item label="Most Characteristic">
                <div v-for="phrase in comparisonData.attributes.results.f1_scores.most_characteristic_a">{{ phrase }}</div>
              </b-tab-item>
              <b-tab-item label="Bigrams">
                <div v-for="(number, phrase) in comparisonData.attributes.results.summary_a.top_bigrams">{{ phrase }}</div>
              </b-tab-item>
              <b-tab-item label="Trigrams">
                <div v-for="(number, phrase) in comparisonData.attributes.results.summary_a.top_trigrams">{{ phrase }}</div>
              </b-tab-item>
              <b-tab-item label="Unigrams">
                <div v-for="(number, phrase) in comparisonData.attributes.results.summary_a.top_unigrams">{{ phrase }}</div>
              </b-tab-item>
            </b-tabs>
          </div>
          <div class="column has-text-centered"></div>
          <div class="column is-two-fifths has-text-left compare-view-phrases-b">
            <b-tabs v-model="activeBGRamsTab" position="is-left" multiline="true">
              <b-tab-item label="Most Characteristic">
                <div v-for="phrase in comparisonData.attributes.results.f1_scores.most_characteristic_b">{{ phrase }}</div>
              </b-tab-item>
              <b-tab-item label="Bigrams">
                <div v-for="(number, phrase) in comparisonData.attributes.results.summary_b.top_bigrams">{{ phrase }}</div>
              </b-tab-item>
              <b-tab-item label="Trigrams">
                <div v-for="(number, phrase) in comparisonData.attributes.results.summary_b.top_trigrams">{{ phrase }}</div>
              </b-tab-item>
              <b-tab-item label="Unigrams">
                <div v-for="(number, phrase) in comparisonData.attributes.results.summary_b.top_unigrams">{{ phrase }}</div>
              </b-tab-item>
            </b-tabs>
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
        timespan_b: false,
        available_cohort_a: [],
        available_cohort_b: [],
        available_timespan_a: [],
        available_timespan_b: [],
        activeAGRamsTab: 0,
        activeBGRamsTab: 0
      }
    },
    computed: {
      orderedCohortsA: function () {
        if (!this.cohort_a && !this.cohort_b && !this.timespan_a && !this.timespan_b) {
          return _.orderBy(this.$store.state.cohorts.cohorts, 'attributes.name')
        }

        return _.orderBy(_.filter(
          this.$store.state.cohorts.cohorts,
          (cohort) => {
            return this.available_cohort_a.indexOf(_.toInteger(cohort.id)) !== -1
          }
        ), 'attributes.name')
      },
      orderedCohortsB: function () {
        if (!this.cohort_a && !this.cohort_b && !this.timespan_a && !this.timespan_b) {
          return _.orderBy(this.$store.state.cohorts.cohorts, 'attributes.name')
        }

        return _.orderBy(_.filter(
          this.$store.state.cohorts.cohorts,
          (cohort) => {
            return this.available_cohort_b.indexOf(_.toInteger(cohort.id)) !== -1
          }
        ), 'attributes.name')
      },
      orderedTimespansA: function () {
        if (!this.cohort_a && !this.cohort_b && !this.timespan_a && !this.timespan_b) {
          return _.orderBy(this.$store.state.cohorts.timespans, 'attributes.name')
        }

        return _.orderBy(_.filter(
          this.$store.state.cohorts.timespans,
          (timespan) => {
            return this.available_timespan_a.indexOf(_.toInteger(timespan.id)) !== -1
          }
        ), 'attributes.name')
      },
      orderedTimespansB: function () {
        if (!this.cohort_a && !this.cohort_b && !this.timespan_a && !this.timespan_b) {
          return _.orderBy(this.$store.state.cohorts.timespans, 'attributes.name')
        }

        return _.orderBy(_.filter(
          this.$store.state.cohorts.timespans,
          (timespan) => {
            return this.available_timespan_b.indexOf(_.toInteger(timespan.id)) !== -1
          }
        ), 'attributes.name')
      },
      comparisonData: function () {
        return this.$store.state.cohorts.comparisonData
      }
    },
    created () {
      this.$store.dispatch('cohorts/loadCohorts')
      this.$store.dispatch('cohorts/loadTimespans')
      this.$store.dispatch('cohorts/loadCohortComparisons')
    },
    methods: {
      cohortData (cohortId) {
        return _.find(this.$store.state.cohorts.cohorts, (cohort) => {
          return cohort.id === cohortId
        })
      },
      reloadComparison () {
        if (this.cohort_a && this.cohort_b && this.timespan_a && this.timespan_b) {
          this.$store.commit('cohorts/setCohortA', this.cohort_a)
          this.$store.commit('cohorts/setCohortB', this.cohort_b)
          this.$store.commit('cohorts/setTimespanA', this.timespan_a)
          this.$store.commit('cohorts/setTimespanB', this.timespan_b)
          this.$store.dispatch('cohorts/reloadComparison')
        }

        this.findAvailableOptions()
      },
      findAvailableOptions () {
        this.allowedCombinations = this.$store.state.cohorts.processedCohortsComparisons
        let intCohortA = _.toInteger(this.cohort_a)
        let intCohortB = _.toInteger(this.cohort_b)
        let intTimespanA = _.toInteger(this.timespan_a)
        let intTimespanB = _.toInteger(this.timespan_b)

        if (intCohortA) {
          this.allowedCombinations = _.filter(
            this.allowedCombinations,
            (allowedCombination) => {
              return allowedCombination[0] === intCohortA
            }
          )
        }

        if (intCohortB) {
          this.allowedCombinations = _.filter(
            this.allowedCombinations,
            (allowedCombination) => {
              return allowedCombination[1] === intCohortB
            }
          )
        }

        if (intTimespanA) {
          this.allowedCombinations = _.filter(
            this.allowedCombinations,
            (allowedCombination) => {
              return allowedCombination[2] === intTimespanA
            }
          )
        }

        if (intTimespanB) {
          this.allowedCombinations = _.filter(
            this.allowedCombinations,
            (allowedCombination) => {
              return allowedCombination[3] === intTimespanB
            }
          )
        }

        this.available_cohort_a = _.map(this.allowedCombinations, (allowedCombination) => {
          return allowedCombination[0]
        })
        this.available_cohort_b = _.map(this.allowedCombinations, (allowedCombination) => {
          return allowedCombination[1]
        })
        this.available_timespan_a = _.map(this.allowedCombinations, (allowedCombination) => {
          return allowedCombination[2]
        })
        this.available_timespan_b = _.map(this.allowedCombinations, (allowedCombination) => {
          return allowedCombination[3]
        })
      },
      resetFilters () {
        this.cohort_a = false
        this.cohort_b = false
        this.timespan_a = false
        this.timespan_b = false
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Compare_V2/index.scss'
</style>
