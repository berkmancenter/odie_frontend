<template>
  <div class="navbar-menu">
    <div class="navbar-start">
      <MainMenuItem :item="menuItem" :activeItem="activeItem" v-for="menuItem in menuItems" :key="menuItem.title" />
    </div>
  </div>
</template>

<script>
  import MainMenuItem from './MainMenuItem'

  const menuItems = [
    {
      title: 'Home',
      slug: ''
    },
    {
      title: 'Media Set Builder',
      slug: 'builder'
    },
    {
      title: 'Media Sources',
      slug: 'media-sources'
    },
    {
      title: 'Compare',
      slug: 'compare'
    },
    {
      title: 'About Us',
      slug: 'about-us'
    },
    {
      title: 'Contact',
      slug: 'contact'
    }
  ]

  export default {
    name: 'main-menu',
    data () {
      return {
        menuItems: menuItems,
        menuItemsFlat: [],
        activeItem: false
      }
    },
    components: {
      MainMenuItem: MainMenuItem
    },
    created () {
      this.flattenItems()
      this.setInitialItem()
    },
    watch: {
      '$route' (to, from) {
        this.setInitialItem()
      }
    },
    methods: {
      setActiveItem (item) {
        this.activeItem = item
      },
      setInitialItem () {
        let currentPath = this.$router.currentRoute.path.replace('/', '')
        let currentItem = this.menuItemsFlat.find(
          (menuItem) => {
            return currentPath === menuItem.slug
          }
        )

        this.activeItem = currentItem
      },
      flattenItems () {
        let flatItems = []

        this.menuItems.map((item) => {
          flatItems.push(item)

          if (item.children) {
            item.children.map((item) => {
              flatItems.push(item)
            })
          }
        })

        this.menuItemsFlat = flatItems
      }
    }
  }
</script>

<style lang="scss">
  @import './../../assets/scss/Layout/MainMenu.scss'
</style>
