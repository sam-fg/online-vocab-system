<template lang="html">
  <div>
    {{$root.selectedMode}}
    <h1>English Vocabulary Test - Level {{$root.level}}</h1>
    <h2>Name: {{$root.engName}}</h2>
    <h2>Class: {{$root.stdClass}}</h2>
    <h2>Class No.: {{$root.stdNo}}</h2>
    <div style="margin-top:12px">
      Q{{index+1}}: {{msg}}
      <button @click="voiceOut">Listen again</button>
    </div>

    <div style="margin-top:12px">
      Answer:
      <input
        id="ans"
        v-model="engAns"
        placeholder="(Input here)"
        @keypress.enter.prevent="checkAns"
      >
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      msg: '_______', //@Test
      index: 0, //@Test
      isCorrect: false, //@Test
      engAns: '', //@Test
      voiceUrl: "", //@Test
    }
  },

  mounted() {
    const vm = this
    vm.onStart()
    document.getElementById("ans").focus()
  },
  methods: {
    onStart () {
      // TODO: add a restart button but stay on the test page not home page
      const vm = this
      vm.index = -1
      vm.$root.vocabids = _.shuffle(vm.$root.vocabids)
      vm.$root.wrongVocabs = []
      vm.getNextVocab()
    },
    checkAns() {
      const vm = this
      const id = vm.$root.vocabids[vm.index]
      const ans = vm.engAns.trim()
      axios.get('./api/check/vocab/id/' + id + '?ans=' + ans)
        .then(function(response) {
          vm.isCorrect = response.data

          if (!vm.isCorrect) {
            vm.$root.wrongVocabs.push({
              id, ans //Cf. Lines98-99 Cf. ES6 syntax only
            }) //push end
          } //if end

          vm.getNextVocab()
        }) //function(response) end
    }, //checkAns() end
    voiceOut () {
      const vm = this
      // TODO: use your own voice api instead of cyrus one
      const url = 'https://careers.liping.edu.hk/edict/api/voice/vocab/id/' + vm.$root.vocabids[vm.index]
      const audio = new Audio(url)
      audio.play()
    },
    getNextVocab() {
      const vm = this
      const wrongPercent = vm.$root.wrongVocabs.length / vm.$root.vocabids.length

      var needRestart = false
      switch (parseInt(vm.$root.selectedMode)) {
        case 2:
          needRestart = wrongPercent >= 0.5
          break
        case 3:
          needRestart = wrongPercent >= 0.25
          break
      }

      if (needRestart) {
        // restart test
        alert("Restart Test")
        vm.onStart()
        return
      }

      vm.index++
      if (vm.index < vm.$root.vocabids.length) {
        vm.isCorrect = false
        vm.engAns = ""
        const id = vm.$root.vocabids[vm.index]

        axios.get('./api/vocab/id/' + id)
          .then(function(response) {
            vm.msg = response.data.definition
          })
          .catch(function(error) {
            console.log(error);
          });

        vm.voiceOut()
      } else {
        vm.$root.currentRoute ="/report"
      }
    }
  }
}
</script>

<style lang="css">
</style>
