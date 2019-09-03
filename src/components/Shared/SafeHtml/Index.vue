<template>
  <span>
    <span v-if="value instanceof Array && value.length === 0">N/A</span>
    <div v-if="!(value instanceof Array)" v-html="value"></div>
  </span>
</template>

<script>
  export default {
    name: 'safehtml-index',
    props: ['value']
  }
</script>
