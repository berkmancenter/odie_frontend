<template>
  <span>
    <span v-if="value instanceof Array && value.length > 0">
      <ul v-if="!inline">
        <li v-for="item in value">
          {{ item }}
        </li>
      </ul>

      <div v-if="inline">{{ value.join(', ') }}</div>
    </span>
    <span v-if="value instanceof Array && value.length === 0">N/A</span>
    <span v-if="!(value instanceof Array)">{{ value }}</span>
  </span>
</template>

<script>
  export default {
    name: 'listorvalue-index',
    props: ['value', 'inline']
  }
</script>
