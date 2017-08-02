<template>
  <div id="hello">

    <!-- <audio ref="player" controls autoplay>
      <source :src="voiceUrl">
    </audio> -->

    <div>
      <pre>{{wrongVocabs}}</pre>
    </div>

      <div>
        {{voiceUrl}}
      </div>

    <div>
      <code>
        {{voiceUrl}}
      </code>
    </div>

    <div>
      Please select the level:
      <select name="Level" id="level" v-model="level" @change="vocabIDsLevelCap">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      *Lv.{{level}} selected*
    </div>

    <div>
      Please select the mode:
      <select name="Level" id="level" v-model="selectedMode">
        <option selected value="1">Normal</option>
        <option value="2">At least 50% correct</option>
        <option value="3">At least 75% correct</option>
      </select>
      *{{selectedMode}} mode selected*
    </div>

    <div style="margin-top:12px">
      <button name="button" @click="onStart">Start the test</button>
    </div>

    <div style="margin-top:12px">
      Q{{index+1}}: {{msg}}
    </div>

    <div style="margin-top:12px">
      Answer:
      <input
        v-model="engAns"
        placeholder="(Input here)"
        @keypress.enter.prevent="checkAns"
      >
      {{isCorrect}}
    </div>

    <div style="margin-top:12px">
      <button name="button" @click="checkAns">Next item</button>
      {{id}}
    </div>

    <code>
      {{vocabids}}
    </code>
  </div>

</template>

<script>
import axios from 'axios'
import _ from 'lodash'


export default {
  name: 'hello',
  data () {
    return {
      msg: '_______',
      index: 0,
      level: 0,
      vocabids: [],
      engAns: '',
      isCorrect: false,
      voiceUrl: "",
      selectedMode: 0,
      wrongVocabs:[]
    }
  },
  // mounted() {
  //   const vm = this
  //   vm.$watch('voiceUrl', function () {
  //       vm.$refs.player.load()
  //   })
  // },
  methods: {
    onStart () {
      const vm = this
      vm.vocabids = _.shuffle(vm.vocabids)
      vm.index = -1
      vm.wrongVocabs = []
      vm.getNextVocab()
      vm.$root.currentRoute = '/test'
    },
    voiceOut () {
      const vm = this
      // TODO: use your own voice api instead of cyrus one
      const url = 'https://careers.liping.edu.hk/edict/api/voice/vocab/id/' + vm.vocabids[vm.index]
      const audio = new Audio(url)
      audio.play()
    },
    checkAns () {
      const vm = this
      const id = vm.vocabids[vm.index]
      const ans = vm.engAns.trim()
      axios.get('./api/check/vocab/id/'+ id +'?ans=' + ans)
        .then(function (response) {
          vm.isCorrect = response.data
          if (!vm.isCorrect) {
              vm.wrongVocabs.push({
                id, ans //Cf. Lines112-113 Cf. ES6 syntax only
              })
          }
          vm.getNextVocab()
        })

    },
    vocabIDsLevelCap () {
      const vm = this
      axios.get('./api/level/' + vm.level)
        .then(function (response){
          vm.vocabids = response.data
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getNextVocab () {
      const vm = this
      const wrongPercent = vm.wrongVocabs.length / vm.vocabids.length
      console.log(wrongPercent)
      if (wrongPercent > 0.25){
        vm.onStart()
        return
      }
      vm.index++
      vm.isCorrect = false
      vm.engAns = ""
      const id = vm.vocabids[vm.index]
      axios.get('./api/vocab/id/' + id)
        .then(function (response) {
          vm.msg = response.data.definition
        })
        .catch(function (error) {
          console.log(error);
        });
      vm.voiceOut()
    }
  }

}
</script>

<style scoped>
#hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {

  vm.voiceUrl =
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
