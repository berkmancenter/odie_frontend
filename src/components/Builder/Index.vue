<template>
  <div class="builder-view noselect">
    <div class="container">
      <h1>Cohorts Set Builder</h1>

      <p>
        Builder description vestibulum vitae risus vitae urna molestie ultricies vitae nec risus. Etiam ut luctus nulla. Sed sapien arcu, luctus vel sodales vel, malesuada at neque. Pellentesque congue nisl ut justo sagittis rutrum. Praesent quam sem, feugiat ac velit sed, vulputate aliquet leo. Aenean aliquet arcu et magna suscipit blandit. Fusce lacus diam, gravida congue felis et, ultrices aliquet neque. Morbi lacinia mi velit, sed fringilla nibh laoreet id. Phasellus nec varius nibh. Nullam vitae nibh et urna aliquet iaculis vitae id arcu. Phasellus et maximus ligula. In neque velit, pulvinar in iaculis a, cursus sed tellus.
      </p>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text" v-model="cohortsSetName">
        </div>
        <p class="help">Name your cohorts set</p>
      </div>

      <div class="field">
        <label class="label">Cohorts</label>
        <div class="control">
          <multiselect v-model="cohortsValue" :options="getCohorts()" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Click to select" label="name" track-by="name">
            <template slot="selection" slot-scope="{ values, search, isOpen }">
              <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} selected</span>
            </template>
          </multiselect>
        </div>
        <p class="help">Select at least 2</p>
      </div>

      <a class="button is-primary is-medium" :disabled="cohortsValue.length < 2 || !cohortsSetName" @click="submitCohortsSet()">Create cohorts set</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'builder-index',
    props: [''],
    components: {},
    data () {
      return {
        cohortsSetName: '',
        cohortsValue: []
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
      submitCohortsSet () {
        if (this.cohortsValue.length >= 2 && this.cohortsSetName) {
          this.$router.push({
            path: '/cohorts-set',
            query: {
              name: this.cohortsSetName,
              cohortsSets: this.cohortsValue.map((cohort) => {
                return cohort.id
              }).join(',')
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Builder/index.scss'
</style>
