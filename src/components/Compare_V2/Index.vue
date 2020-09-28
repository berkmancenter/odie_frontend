<template>
  <div class="compare-view">
    <div class="container noselect">
      <h1 class="has-text-centered">Compare</h1>

      <div class="columns">
        <div class="column is-two-fifths has-text-centered">
          <b-select class="is-pulled-right"
                    placeholder="Select a cohort"
                    v-model="cohort_a"
                    :loading="orderedCohorts.length === 0"
                    @input="reloadComparision">
            <option
                v-for="cohort in orderedCohorts"
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
                    :loading="orderedCohorts.length === 0"
                    @input="reloadComparision">
            <option
                v-for="cohort in orderedCohorts"
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
                      :loading="orderedTimespans.length === 0"
                      @input="reloadComparision">
              <option
                  v-for="timespan in orderedTimespans"
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
                    :loading="orderedTimespans.length === 0"
                    @input="reloadComparision">
            <option
                v-for="timespan in orderedTimespans"
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
          <div class="column is-two-fifths has-text-right">
            <b-tabs v-model="activeAGRamsTab" position="is-right">
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
          <div class="column is-two-fifths has-text-left">
            <b-tabs v-model="activeBGRamsTab" position="is-left">
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
        activeAGRamsTab: 0,
        activeBGRamsTab: 0
      }
    },
    computed: {
      cohortsStore () {
        return this.$store.state.cohorts.cohorts
      },
      orderedCohorts: function () {
        return _.orderBy(this.$store.state.cohorts.cohorts, 'attributes.name')
      },
      orderedTimespans: function () {
        return _.orderBy(this.$store.state.cohorts.timespans, 'attributes.name')
      },
      comparisonData: function () {
        return this.$store.state.cohorts.comparisonData
      }
    },
    created () {
      this.$store.dispatch('cohorts/loadCohorts')
      this.$store.dispatch('cohorts/loadTimespans')
    },
    methods: {
      cohortData (cohortId) {
        return _.find(this.$store.state.cohorts.cohorts, (cohort) => {
          return cohort.id === cohortId
        })
      },
      reloadComparision () {
        if (this.cohort_a && this.cohort_b && this.timespan_a && this.timespan_b) {
          this.$store.commit('cohorts/setCohortA', this.cohort_a)
          this.$store.commit('cohorts/setCohortB', this.cohort_b)
          this.$store.commit('cohorts/setTimespanA', this.timespan_a)
          this.$store.commit('cohorts/setTimespanB', this.timespan_b)
          this.$store.dispatch('cohorts/reloadComparision')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Compare_V2/index.scss'
</style>
