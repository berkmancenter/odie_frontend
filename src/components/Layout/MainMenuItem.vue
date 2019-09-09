<template>
  <router-link
    :class="{
      'is-active': activeItem && activeItem.slug == item.slug
    }"
    class="navbar-item"
    :to="'/' + item.slug"
  >
    {{ item.title }}
  </router-link>
</template>

<script>
  export default {
    name: 'main-menu-item',
    props: ['item', 'activeItem']
  }
</script>
