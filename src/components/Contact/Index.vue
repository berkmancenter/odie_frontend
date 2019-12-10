<template>
  <div class="contact-view">
    <div class="container">
      <h1>Contact Us</h1>

      <b-field label="Name">
        <b-input/>
      </b-field>

      <b-field label="Email">
          <b-input type="email"/>
      </b-field>

      <b-field label="Message">
          <b-input type="textarea"></b-input>
      </b-field>

      <a class="button is-primary is-medium">Send Message</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contact-index',
    components: {},
    data () {
      return {}
    },
    created () {},
    methods: {}
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Contact/index.scss'
</style>
