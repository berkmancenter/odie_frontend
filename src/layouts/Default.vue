<template>
  <div>
    <div class="container-fluid header">
      <b-row class="header-logo">
        <b-col cols="10">
          <router-link :to="'/'" class="header-logo-link noselect">
            <img src="@/assets/images/logo_being.svg">
            <span>Online Discourse Insight Explorer</span>
          </router-link>
        </b-col>
        <b-col cols="12" sm="2">
          <a id="main-menu-toggler" class="hvr-grow">
            <i class="fa fa-bars" aria-hidden="true"></i>
          </a>
          <swit-menu button-id="main-menu-toggler">
            <main-menu />
          </swit-menu>
        </b-col>
      </b-row>
    </div>

    <div class="content">
      <transition name="fade">
        <router-view :key="$route.fullPath" />
      </transition>

      <footer>
        <div>{{ new Date().getFullYear() }} @ Berkman Klein Center</div>
        <div>Built: {{ build_date }}</div>
        <div>Version: {{ build_version }}</div>
      </footer>
    </div>
  </div>
</template>

<script>
  import MainMenu from '@/components/Layout/MainMenu'

  export default {
    name: 'default-layout',
    components: {
      MainMenu
    },
    data () {
      return {
        build_date: process.env.BUILD_DATE,
        build_version: process.env.BUILD_VERSION
      }
    }
  }
</script>

<style lang="scss">
  @import './../assets/scss/layouts/Default.scss'
</style>
