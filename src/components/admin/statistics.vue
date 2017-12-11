<template>
  <div>
    <dashboard :display="true">
      <div slot="title">
        General use for User, Machine and Program
      </div>
      <doughnut-chart :chart-data="ucd" :width="425" :height="400" :options="{responsive: false, maintainAspectRatio: false}"></doughnut-chart>
      <doughnut-chart :chart-data="mcd" :width="425" :height="400" :options="{responsive: false, maintainAspectRatio: false}"></doughnut-chart>
      <doughnut-chart :chart-data="pcd" :width="425" :height="400" :options="{responsive: false, maintainAspectRatio: false}"></doughnut-chart>
    </dashboard>
  </div>
</template>

<script>
import DoughnutChart from '@/components/templates/DoughnutChart.js'

export default {
  components: {
    DoughnutChart
  },
  data: function() {
    return {
      ucd: null,
      mcd: null,
      pcd: null,
      colors: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'green', 'orange']
    }
  },
  mounted() {
    this.fillUCData()
    this.fillMCData()
    this.fillPCData()
  },
   methods: {
    fillUCData() {
      let self = this
      let data = []
      let labels = []
      let backgroundColor = []

      axios.get(`${api}stats/userCentric`).then(function(response) {
        console.log(response.data)
        for (let i = 0; i < response.data.length; i++) {
          let user = response.data[i]

          data.push(user.usedCount)
          labels.push(`${user.firstname} ${user.lastname}`)
          backgroundColor.push(self.colors[i % self.colors.length])
        }

        self.ucd = {
          datasets: [{
            data: data,
            backgroundColor: backgroundColor
          }],
          labels: labels
        }
      }).catch(function(err) {
        console.log(err)
      })
    },
    fillMCData() {
      let self = this
      let data = []
      let labels = []
      let backgroundColor = []

      axios.get(`${api}stats/machineCentric`).then(function(response) {
        for (let i = 0; i < response.data.length; i++) {
          let machine = response.data[i]

          data.push(machine.usedCount)
          labels.push(machine.machineName)
          backgroundColor.push(self.colors[i % self.colors.length])
        }

        self.mcd = {
          datasets: [{
            data: data,
            backgroundColor: backgroundColor
          }],
          labels: labels
        }
      }).catch(function(err) {
        console.log(err)
      })
    },
    fillPCData() {
      let self = this
      let data = []
      let labels = []
      let backgroundColor = []

      axios.get(`${api}stats/programCentric`).then(function(response) {
        for (let i = 0; i < response.data.length; i++) {
          let program = response.data[i]

          data.push(program.usedCount)
          labels.push(program.programName)
          backgroundColor.push(self.colors[i % self.colors.length])
        }

        self.pcd = {
          datasets: [{
            data: data,
            backgroundColor: backgroundColor
          }],
          labels: labels
        }
      }).catch(function(err) {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>