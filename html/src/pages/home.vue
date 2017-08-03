<template>
<div>
  <div style="margin-top:12px">
    English Name (FULL):
    <input v-model="$root.engName" placeholder="Chan Tai Man"><br/>
    Class:
    <input v-model="$root.stdClass" placeholder="1A"><br/>
    Class Number:
    <input v-model="$root.stdNo" placeholder="1">
    <!-- {{isCorrect}} -->
  </div>

  <div>
    Level:
    <select v-model="$root.level" @change="vocabIDsLevelCap">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
  </div>

  <div>
    Mode:
    <select v-model="$root.selectedMode">
        <option selected value="1">Normal</option>
        <option value="2">At least 50% correct</option>
        <option value="3">At least 75% correct</option>
      </select>
  </div>

  <div style="margin-top:12px">
    <button name="button" @click="onStart">Start the test</button>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  // mounted() {
  //   const vm = this
  //   vm.$watch('voiceUrl', function () {
  //       vm.$refs.player.load()
  //   })
  // },
  methods: {
    onStart() {
      // TODO: Prevent user fr starting before all data has been entered correctly
      const vm = this
      vm.$root.currentRoute = '/test'
    },
    vocabIDsLevelCap() {
      const vm = this
      axios.get('./api/level/' + vm.$root.level)
        .then(function(response) {
          vm.$root.vocabids = response.data
          console.log(vm.$root.vocabids);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>
