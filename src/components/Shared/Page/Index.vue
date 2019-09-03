<template>
  <div class="container">
    <b-row>
      <b-col class="page-view" cols="12">
        <h1>{{ title }}</h1>

        <safe-html :value="content" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'page-index',
    props: ['id'],
    data () {
      return {
        content: '',
        title: '',
        pageProxy: false
      }
    }
  }
</script>
