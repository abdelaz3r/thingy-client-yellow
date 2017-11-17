<template>
  <div>
    <dashboard :display="display">
      <div slot="title">
        Configuration of <p style="font-weight: bold; display: inline"> {{machine.name}}</p>
        with MAC <p style="font-weight: bold; display: inline;">{{machine.mac}}</p>
      </div>
      <div class="input_as_textfield">
        <div class="tabs is-centered is-boxed is-medium">
          <ul>
            <li :class="{ 'is-active': tabs.temperature }">
              <a @click="toggleTab('temperature')">Temperature</a>
            </li>
            <li :class="{ 'is-active': tabs.pressure }">
              <a @click="toggleTab('pressure')">Pressure</a>
            </li>
            <li :class="{ 'is-active': tabs.humidity }">
              <a @click="toggleTab('humidity')">Humidity</a>
            </li>
            <li :class="{ 'is-active': tabs.color }">
              <a @click="toggleTab('color')">Color</a>
            </li>
            <li :class="{ 'is-active': tabs.gas }">
              <a @click="toggleTab('gas')">Gas</a>
            </li>
            <li :class="{ 'is-active': tabs.motion}">
              <a @click="toggleTab('motion')">Motion</a>
            </li>
          </ul>
        </div>
        <div v-if="tabs.temperature">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Interval: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
        </div>

        <div v-if="tabs.pressure">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Interval: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
        </div>

        <div v-if="tabs.humidity">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Interval: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
        </div>

        <div v-if="tabs.color">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Interval: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
        </div>

        <div v-if="tabs.gas">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Interval: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
        </div>

        <div v-if="tabs.motion" >
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Step Counter Interval (MS): </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Temperature Compensation Interval (MS): </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Magnetometer Compensation Interval (MS): </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Motion Processing Frequency (Hz): </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Wake On Motion: </label>
            </div>
            <div class="field-body">
              <div class="field">
                <input class="input" type="text">
              </div>
            </div>
          </div>
        </div>
      </div>
    </dashboard>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        display: true,
        machine: this.$route.params.machine,
        config: [],
        displayTemperature: false,
        tabs: {
          temperature: true,
          pressure: false,
          humidity: false,
          color: false,
          gas: false,
          motion: false
        }
      }
    },

    methods: {
      toggleTab: function(tab) {
        //disable all tabs
      this.tabs.temperature = false
      this.tabs.pressure = false
      this.tabs.humidity = false
      this.tabs.color = false
      this.tabs.gas = false
      this.tabs.motion = false

        //make tab active
        switch (tab) {
          case 'temperature':
            this.tabs.temperature = true
            break;
          case 'pressure':
            this.tabs.pressure = true
            break;
          case 'humidity':
            this.tabs.humidity = true
            break
          case 'color':
            this.tabs.color = true
            break
          case 'gas':
            this.tabs.gas = true
            break
          case 'motion':
            this.tabs.motion = true
            break
        }
      },
      getConfig: function() {
        var self = this
        axios.get(api + "gateway/" + this.machine.mac + "/setup")
        .then(function(response) {
          self.config = response.data
        })
        .catch(function(err) {
          self.$notify({
            title: "Error",
            text: "Cannot load config",
            type: "error"
          })
        })
      }
    },

    mounted() {
      this.getConfig()
    }
  }
</script>

<style>
.input_as_textfield input {
  box-shadow: none;
  border: none;
  font-size: 16px;
}
</style>
