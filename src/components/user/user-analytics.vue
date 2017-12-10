<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        User Analytics
      </div>
      <doughnut-chart :chart-data="datacollection" :width="650" :height="400" :options="{responsive: false, maintainAspectRatio: false}"></doughnut-chart>
    </dashboard>
  </div>
</template>

<script>
import DoughnutChart from '@/components/templates/DoughnutChart.js'

export default {
  components: {
    DoughnutChart
  },
  data () {
    return {
      datacollection: null,
      colors: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)']
    }
  },
  mounted () {
    let self = this

    axios.get(`${api}stats/userCentric`).then(function(response) {
      self.fillData(response.data)
    }).catch(function(err) {
      console.log(err)
    })
  },
  methods: {
    fillData(rawData) {
      let data = []
      let labels = []
      let backgroundColor = []

      for (let i = 0; i < rawData[0].programs.length; i++) {
        let prog = rawData[0].programs[i]

        labels.push(prog.programName)
        data.push(prog.history.usedCount)
        backgroundColor.push(this.colors[i % this.colors.length])
      }

      this.datacollection = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }],
        labels: labels
      }
    }
  }
}
</script>