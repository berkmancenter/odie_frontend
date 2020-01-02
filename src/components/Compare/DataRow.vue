<template>
  <tr class="compare-data-row-view">
    <th>{{ title }}</th>
    <td v-for="item in items">
      <div v-for="(count, element) in sortedSomething(item.attributes.latest_data.data.attributes[data_key])">{{ element }} <span class="tag">{{ count }}</span></div>
    </td>
  </tr>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'compare-data-row-index',
    props: ['items', 'title', 'data_key'],
    components: {},
    data () {
      return {
        howManyShow: 10
      }
    },
    methods: {
      sortedSomething (what) {
        let asInt = {}
        let list = Object.keys(what)

        if (this.howManyShow === false) {
          list = list.reduce((result, key) => {
            result[key] = what[key]
            return result
          }, {})
        } else {
          list = list.slice(0, this.howManyShow - 1).reduce((result, key) => {
            result[key] = what[key]
            return result
          }, {})
        }

        _.forEach(list, (count, item) => {
          asInt[item] = parseInt(count)
        })

        return _(asInt)
                 .toPairs()
                 .orderBy([1], ['desc'])
                 .fromPairs()
                 .value()
      }
    }
  }
</script>
