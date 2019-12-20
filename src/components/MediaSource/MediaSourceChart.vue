<script>
  import { Pie } from 'vue-chartjs'

  export default {
    extends: Pie,
    props: ['chartData'],
    data () {
      return {
        options: {
          maintainAspectRatio: false,
          legend: {
            display: true
          }
        }
      }
    },
    mounted () {
      // To avoid vuex errors from the vue-chartjs component
      const cloneChartData = this.getClone(this.chartData)
      this.renderChart(cloneChartData, this.options)
    },
    watch: {
      chartData: function (newVal, oldVal) {
        const cloneChartData = this.getClone(newVal)
        this.renderChart(cloneChartData, this.options)
      }
    },
    methods: {
      getClone (data) {
        return JSON.parse(JSON.stringify(data))
      }
    }
  }
</script>
