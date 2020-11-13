import { PolarArea } from 'vue-chartjs'

export default PolarArea.extend({
  mounted () {
    this.renderChart({
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'Series A',
          backgroundColor: 'rgba(254,162,0,0.2)',
          borderColor: 'rgba(254,162,0,1)',
          pointBackgroundColor: 'rgba(254,162,0,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(254,162,0,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'Series B',
          backgroundColor: 'rgba(246,74,50,0.2)',
          borderColor: 'rgba(246,74,50,1)',
          pointBackgroundColor: 'rgba(246,74,50,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(246,74,50,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
