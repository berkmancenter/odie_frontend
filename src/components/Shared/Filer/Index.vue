<template>
  <div class="filer-container">
    <ul v-if="values instanceof Array && values.length > 0" class="filer-list">
      <li v-for="item in values" class="filer-item">
        <div><a target="_blank" :href="item['url']"><i class="fa fa-file-text" aria-hidden="true"></i>{{ item['name'] }}</a></div>
        <div v-html="item.description"></div>
      </li>
    </ul>
    <div v-if="values instanceof Array && values.length === 0">N/A</div>
  </div>
</template>

<script>
  export default {
    name: 'filer-index',
    props: ['values', 'labelprop']
  }
</script>
