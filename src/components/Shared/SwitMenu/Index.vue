<template>
  <div class="switmenu-menu" :class="{ 'switmenu-menu-active': open }">
    <a class="switmenu-menu-closer hvr-grow" @click="toggleMenu">
      <i class="fa fa-times" aria-hidden="true"></i>
    </a>
    <slot></slot>
  </div>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'switmenu-index',
    props: ['buttonId', 'menuId'],
    data () {
      return {
        button: false,
        open: false
      }
    },
    mounted () {
      this.button = $('#' + this.buttonId).first()
      if (!this.button) {
        return
      }

      this.button.on('click', this.toggleMenu)
      $('.switmenu-menu a').on('click', this.closeMenu)
    },
    methods: {
      toggleMenu () {
        this.open = !this.open
      },
      closeMenu () {
        this.open = false
      }
    }
  }
</script>

<style lang="scss">
  @import './../../../assets/scss/Shared/SwitMenu/index.scss'
</style>
