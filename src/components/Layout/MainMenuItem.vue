<template>
  <li class="nav-item" 
      :class="{
        'nav-item-active': activeItem && activeItem.slug == item.slug,
        'nav-item-placeholder': item.placeholder,
        'hvr-forward': !item.skipHoverAnimation
      }"
  >
    <router-link v-if="!item.placeholder" class="nav-link" :to="'/' + item.slug">
      {{ item.title }}
    </router-link>
    <div v-if="item.placeholder">{{ item.title }}</div>

    <ul v-if="item.children">
      <main-menu-item :item="menuItem" :activeItem="activeItem" v-for="menuItem in item.children" :key="menuItem.title" />
    </ul>
  </li>
</template>

<script>
  export default {
    name: 'main-menu-item',
    props: ['item', 'activeItem']
  }
</script>
