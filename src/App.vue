<template>
  <div id="app">
    <router-view v-cloak />
  </div>
</template>

<script>
  import Vue from 'vue'
  import YesNoer from './components/Shared/YesNoer/Index'
  import ListOrValue from './components/Shared/ListOrValue/Index'
  import Lister from './components/Shared/Lister/Index'
  import SafeHtml from './components/Shared/SafeHtml/Index'
  import Filer from './components/Shared/Filer/Index'
  import SafeHtmlList from './components/Shared/SafeHtmlList/Index'
  import Page from './components/Shared/Page/Index'

  // register shared components globally
  Vue.component('yes-noer', YesNoer)
  Vue.component('list-or-value', ListOrValue)
  Vue.component('lister', Lister)
  Vue.component('safe-html', SafeHtml)
  Vue.component('filer', Filer)
  Vue.component('safe-html-list', SafeHtmlList)
  Vue.component('page', Page)

  export default {
    name: 'app'
  }
</script>

<style lang="scss">
  @import './assets/scss/App.scss';
</style>
