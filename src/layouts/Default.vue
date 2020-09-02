<template>
  <div>
    <div class="header">
      <div class="header-logo">
        <div>
          <router-link :to="'/compare'" class="header-logo-link noselect">
            <span>OD</span>
            <img src="@/assets/images/logo_being.svg">
            <span>IE</span>
          </router-link>
        </div>
      </div>
    </div>

    <nav class="navbar main-navbar noselect" role="navigation" aria-label="main navigation">
      <div class="container">
        <MainMenu />
      </div>
    </nav>

    <section class="section">
      <div class="content">
        <transition name="fade">
          <router-view />
        </transition>
      </div>
    </section>

    <footer class="footer">
      <div class="content has-text-centered noselect">
        <img class="footer-logo" src="@/assets/images/logo_berkman.svg">
        <div>{{ new Date().getFullYear() }} @ Berkman Klein Center</div>
        <div>Built: {{ build_date }}</div>
        <div>Version: {{ build_version }}</div>
      </div>
    </footer>
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
