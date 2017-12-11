<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        User program usage by type / User machine usage by type
      </div>
      <doughnut-chart :chart-data="dc1" :width="650" :height="400" :options="{responsive: false, maintainAspectRatio: false}"></doughnut-chart>
      <doughnut-chart :chart-data="dc2" :width="650" :height="400" :options="{responsive: false, maintainAspectRatio: false}"></doughnut-chart>
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
      dc1: null,
      dc2: null,
      colors: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'green', 'orange']
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

      this.dc1 = {
        datasets: [{
          data: data,
          backgroundColor: backgroundColor
        }],
        labels: labels
      }

      data = []
      labels = []
      backgroundColor = []

      for (let i = 0; i < rawData[0].programs.length; i++) {
        let prog = rawData[0].programs[i]

        for (let j = 0; j < prog.history.per_machine.length; j++) {
          let machine = prog.history.per_machine[j]

          if (labels.indexOf(machine.machineName) == -1) {
            labels.push(machine.machineName)
            data[labels.indexOf(machine.machineName)] = 0
          }

          data[labels.indexOf(machine.machineName)] += machine.when.length
        }
      }

      for (let i = 0; i < data.length; i++) {
        backgroundColor.push(this.colors[i % this.colors.length])
      }

      this.dc2 = {
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