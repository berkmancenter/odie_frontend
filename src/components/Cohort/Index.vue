<template>
  <div class="cohort-view" v-if="$store.state.cohorts.activeCohort">
    <div class="container noselect">
      <h1>{{ $store.state.cohorts.activeCohort.data.attributes.description }}
        <span class="is-size-6"><span class="has-text-weight-bold"></span> <a :href="'http://' + $store.state.cohorts.activeCohort.data.attributes.url" target="_blank">{{ $store.state.cohorts.activeCohort.data.attributes.url }}</a></span>
      </h1>

      <vue-goodshare></vue-goodshare>

      <CohortData :data="$store.state.cohorts.activeCohort.data.attributes.latest_data.data.attributes"></CohortData>
    </div>
  </div>
</template>

<script>
  import CohortData from './CohortData'
  import VueGoodshare from 'vue-goodshare'

  export default {
    name: 'cohort-index',
    props: ['cohort_id'],
    components: {
      CohortData,
      VueGoodshare
    },
    data () {
      return {}
    },
    created () {
      this.$store.dispatch('cohorts/loadCohort', this.$props.cohort_id)
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Cohort/index.scss'
</style>
