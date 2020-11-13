import {Line, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        scales: {
          xAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return ``
              }
            }
          }]
        },
        responsive: false,
        maintainAspectRatio: false
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
