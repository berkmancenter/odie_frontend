<template>
  <span>
    <ul class="safe-html-list-item" v-if="value instanceof Array && value.length > 0">
      <li v-for="item in value">
        <div v-html="item"></div>
      </li>
    </ul>
    <span v-if="value instanceof Array && value.length === 0">N/A</span>
    <span v-if="!(value instanceof Array)" v-html="value"></span>
  </span>
</template>

<script>
  export default {
    name: 'safehtmllist-index',
    props: ['value']
  }
</script>
