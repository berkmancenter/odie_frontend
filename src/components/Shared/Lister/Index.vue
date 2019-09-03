<template>
  <div>
    <ul v-if="values instanceof Array && values.length > 0">
      <li v-for="item in values">
        <div v-if="labelprop === 'uri'"><a target="_blank" :href="item[labelprop]">{{ item[labelprop] }}</a></div>
        <div v-else>{{ item[labelprop] }}</div>
      </li>
    </ul>
    <span v-if="(values instanceof Array && values.length === 0) || !values">N/A</span>
  </div>
</template>

<script>
  export default {
    name: 'lister-index',
    props: ['values', 'labelprop']
  }
</script>
