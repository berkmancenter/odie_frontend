<template>
  <div class="media-source-data-card">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ label }}
          <b-tooltip label="Some info about this set" animated>
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </b-tooltip>
          <i class="fa fa-pie-chart" aria-hidden="true" @click="toggleChart(dataKey)" v-if="!chart"></i>
          <i class="fa fa-list" aria-hidden="true" @click="toggleChart(dataKey)" v-if="chart"></i>
        </p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="media-source-data-chart" v-if="chart">
            <MediaSourceChart :chart-data="chartsData"></MediaSourceChart>
          </div>
          <div v-if="!chart">
            <div
              class="media-source-data-item"
              v-for="(count, item) in sortedSomething(data)"
            >
              <slot :count="count" :item="item"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import MediaSourceChart from './MediaSourceChart'

  export default {
    name: 'media-source-data',
    props: ['data', 'label', 'dataKey'],
    components: {
      MediaSourceChart
    },
    data () {
      return {
        colorsPalette: [
          '#F3C300', '#875692', '#F38400', '#A1CAF1', '#BE0032', '#C2B280',
          '#2B3D26', '#008856', '#E68FAC', '#0067A5', '#F99379', '#604E97',
          '#F6A600', '#B3446C', '#DCD300', '#882D17', '#8DB600', '#654522',
          '#E25822', '#E320BC', '#3AF2B8'
        ],
        chart: false,
        chartData: {}
      }
    },
    methods: {
      sortedSomething (what, howMany = 10) {
        let asInt = {}

        let limitedObjects = Object.keys(what).slice(0, howMany - 1).reduce((result, key) => {
          result[key] = what[key]
          return result
        }, {})

        _.forEach(limitedObjects, (count, item) => {
          asInt[item] = parseInt(count)
        })

        return _(asInt)
                 .toPairs()
                 .orderBy([1], ['desc'])
                 .fromPairs()
                 .value()
      },
      processChartData (data) {
        return {
          labels: _.keys(data),
          datasets: [
            {
              backgroundColor: _.take(this.colorsPalette, _.values(data).length),
              data: _.values(data)
            }
          ]
        }
      },
      toggleChart (name) {
        this.chart = !this.chart
        this.chartsData = this.processChartData(this.sortedSomething(this.data))
      }
    }
  }
</script>
