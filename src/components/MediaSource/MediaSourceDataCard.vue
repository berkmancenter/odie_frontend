<template>
  <div class="media-source-data-card">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ label }}
          <b-tooltip label="Some info about this set" animated position="is-bottom">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
          </b-tooltip>
          <i class="fa fa-pie-chart" aria-hidden="true" @click="toggleChart(dataKey)" v-if="!chart" title="Show chart"></i>
          <i class="fa fa-list" aria-hidden="true" @click="toggleChart(dataKey)" v-if="chart" title="Show list"></i>
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
              v-for="item in sortedSomething(data)"
            >
              <slot :count="item[1]" :item="item[0]" :link="item[2].link"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="media-source-data-item-showall"
         :class="{ 'media-source-data-item-showall-less': !howManyShow }"
         v-if="Object.keys(data).length > 10"
         title="Show all"
         @click="toggleShowAll()"
    ></div>
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
        chartData: {},
        howManyShow: 10
      }
    },
    methods: {
      sortedSomething (what) {
        var items = []
        for (var item in what) {
          if (typeof what[item] === 'object') {
            items.push([item, parseInt(what[item].count), what[item]])
          } else {
            items.push([item, parseInt(what[item]), []])
          }
        }

        items = _(items).orderBy([1], ['desc']).value()

        if (this.howManyShow !== false) {
          items = items.slice(0, this.howManyShow - 1)
        }

        return items
      },
      processChartData (data) {
        return {
          labels: _.map(data, (item) => {
            return item[0]
          }),
          datasets: [
            {
              backgroundColor: _.take(this.colorsPalette, _.values(data).length),
              data: _.map(data, (item) => {
                return item[1]
              })
            }
          ]
        }
      },
      toggleChart (name) {
        this.chart = !this.chart
        this.chartsData = this.processChartData(this.sortedSomething(this.data))
      },
      toggleShowAll () {
        if (this.howManyShow === false) {
          this.howManyShow = 10
        } else {
          this.howManyShow = false
        }
      }
    }
  }
</script>
