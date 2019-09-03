<template>
  <span>
    <span v-if="isYes(value)">Yes</span>
    <span v-if="isNo(value)">No</span>
    <span v-if="isNA(value)">N/A</span>
    <span v-if="isUnknown(value)">Unknown</span>
  </span>
</template>

<script>
  export default {
    name: 'yesnoer-index',
    props: ['value'],
    methods: {
      isYes (value) {
        if (value && (value === '1' || value === 'Yes')) {
          return true
        }

        return false
      },
      isNo (value) {
        if (value && (value === '0' || value === 'No')) {
          return true
        }

        return false
      },
      isNA (value) {
        if (value && value === 'N/A') {
          return true
        }

        return false
      },
      isUnknown (value) {
        if (!value || (value instanceof Array && value.length === 0)) {
          return true
        }

        return false
      }
    }
  }
</script>
