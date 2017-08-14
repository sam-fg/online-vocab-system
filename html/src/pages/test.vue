<template lang="html">

<div style='width: 500px; margin-top: 12px' class="mx-auto"> <!-- 1 -->

<div class="card border-info mb-3" style="max-width: 50rem;"> <!-- 2 -->
<div class="card-header"><h5><B><font color='#336699'>English Vocabulary Test</font></b></h5></div>  <!-- XX -->

  <div class="card-body text-info">  <!-- 3 -->
  <h1 class="card-title">{{$root.assessmentName}}</h1>

 <p class="card-text">

  <div>
    <h5>{{$root.stdClass}} - {{$root.engName}} ({{$root.stdNo}})</h5>
    <hr>
  <div style="margin-top:12px">
    <h2>Q{{index+1}}/{{$root.vocabids.length}}: {{msg}}
    <button class='btn btn-primary btn-sm' name="button" @click="voiceOut">Listen again</button>
    </h2>
  </div>
    <hr>

    <div style="margin-top:12px">
      Your answer:

      <input
        id="ans"
        v-model="engAns"
        placeholder=""
        @keypress.enter.prevent="checkAns"
      >

    </div>
  </div>

</p>
</div> <!-- 3 -->
</div> <!-- 2 -->
</div> <!-- 1 -->

</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      msg: '_______', //@Test
      mistakes: 0,
      index: 0, //@Test
      isCorrect: false, //@Test
      engAns: '', //@Test
      voiceUrl: "", //@Test
      // TODO: move to test.vue and using api/assessment/:name/size to
      // create the vocabids for shuffling the sequence
      //vocabids: [], //@Test
    }
  },

  mounted() {
    const vm = this
      if (vm.$root.engName == ""
      || vm.$root.stdClass == ""
      || vm.$root.stdNo < 1
      || vm.$root.stdNo > 40
      || vm.$root.assessment == ""
      || vm.$root.selectedMode == 0) {
      vm.$root.currentRoute ="/home"
      window.alert("Input all information properly")
      } else {

      document.getElementById("ans").focus()
      axios.get('./api/assessment/' + vm.$root.assessmentName + '/size')
        .then(response => {
        vm.$root.vocabids = _.shuffle(_.range(response.data))
        // ref. https://lodash.com/docs/4.17.4#range
        console.log(vm.$root.assessmentName)
        console.log(vm.$root.vocabids)
        vm.onStart()
        })
        .catch(error => {
        console.log(error)
        })
      }
  },

  methods: {
    onStart () {
      const vm = this
      vm.index = -1
      vm.$root.wrongVocabs = []
      vm.getNextVocab()
    },
    checkAns() {
      const vm = this
      // TODO: Cf above
      const id = vm.$root.vocabids[vm.index]
      const ans = vm.engAns.trim()
      // TODO: api/check/assessment/:name/index/:index?ans=
      axios.get('./api/check/assessment/' + vm.$root.assessmentName + '/index/' + id + '?ans=' + ans)
        .then(function(response) {
          vm.isCorrect = response.data

          if (!vm.isCorrect) {
            const index = parseInt(id)
            vm.$root.wrongVocabs.push({
              // TODO: change id to index
              index,
              ans
            }) //push end
          } //if end

          vm.getNextVocab()
        }) //function(response) end
    }, //checkAns() end
    voiceOut () {
      const vm = this
      const index = vm.index
      // TODO: use your own voice api instead of cyrus one
      //const url = 'https://careers.liping.edu.hk/edict/api/voice/vocab/id/' + vm.$root.vocabids[vm.index]
      const url = '/api/voice/assessment/' + vm.$root.assessmentName + '/index/' + vm.$root.vocabids[vm.index]+ '?speed=0.24'
      const audio = new Audio(url)
      audio.play()
    },
    getNextVocab() {
      const vm = this
      // TODO: Cf vocabids
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
      // TODO: Cf vocabids
      console.log(vm.index, vm.$root.vocabids.length)
      if (vm.index < vm.$root.vocabids.length) {
        vm.isCorrect = false
        vm.engAns = ""
        const index = vm.index

      // TODO: api/assessment/:name/index/:index
        console.log('index', vm.$root.vocabids[index]);
        axios.get('./api/assessment/' + vm.$root.assessmentName + "/index/" + vm.$root.vocabids[index])
          .then(function(response) {

          console.log(response.data)
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
