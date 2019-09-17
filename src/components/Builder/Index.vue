<template>
  <div class="builder-view">
    <div class="container">
      <h1>Builder</h1>

      <p>
        Builder description vestibulum vitae risus vitae urna molestie ultricies vitae nec risus. Etiam ut luctus nulla. Sed sapien arcu, luctus vel sodales vel, malesuada at neque. Pellentesque congue nisl ut justo sagittis rutrum. Praesent quam sem, feugiat ac velit sed, vulputate aliquet leo. Aenean aliquet arcu et magna suscipit blandit. Fusce lacus diam, gravida congue felis et, ultrices aliquet neque. Morbi lacinia mi velit, sed fringilla nibh laoreet id. Phasellus nec varius nibh. Nullam vitae nibh et urna aliquet iaculis vitae id arcu. Phasellus et maximus ligula. In neque velit, pulvinar in iaculis a, cursus sed tellus.
      </p>

      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input class="input" type="text">
        </div>
        <p class="help">Name your media set</p>
      </div>

      <div class="field">
        <label class="label">Media sources</label>
        <div class="control">
          <multiselect v-model="mediaSourcesValue" :options="getMediaSources()" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
            <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} selected</span></template>
          </multiselect>
        </div>
        <p class="help">Select at least 2</p>
      </div>

      <a class="button is-primary is-medium">Create media set</a>
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
        mediaSourcesValue: []
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
              name: mediaSource.attributes.name
            }
          })
        }

        return []
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Builder/index.scss'
</style>
