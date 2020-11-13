import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    iaStackBar: {
      type: Boolean,
    },
     },

  data: function () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: this.iaStackBar,
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [ {
            stacked: this.iaStackBar,
            gridLines: {
              display: false
            },
            categoryPercentage: 0.5,
            barPercentage: 0.9
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
    // console.log(this.chartData)
  },
  watch: {
    chartData(){
      console.log(this.chartData)
    }
  },
  method: {
    // reRenderChart: function () {
    //
    // }
  }
}
