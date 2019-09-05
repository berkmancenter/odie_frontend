<template>
  <div class="container">
    <div>
      <div class="page-view">
        <h1>{{ title }}</h1>

        <safe-html :value="content" />
      </div>
    </div>
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
