<template lang="html">

  <div style='width: 500px; margin-top: 12px' class="mx-auto"> <!-- 1 -->
    <audio :src='voiceUrl' autoplay ref='player'></audio>
    <div class="card border-info mb-3" style="max-width: 50rem;"> <!-- 2 -->
      <div class="card-header">
        <h1 class="text-center">
          <b style='color: #336699'>English Vocabulary Test</b>
        </h1>
        <h2 class="card-title text-center" style="color: #336699">{{$root.assessmentName}}</h2>
      </div>  <!-- XX -->

      <div class="card-body text-info">  <!-- 3 -->
        <div class="card-block">
            <h2>
              Q{{index+1}}/{{$root.vocabids.length}}: {{msg}}
            </h2>
            <hr>

            <div>
              <input
              id="ans"
              class="form-control"
              v-model="engAns"
              placeholder=''
              @keypress.enter.prevent="checkAns"
              />
            </div>
            <button style="margin-top:12px" class='btn btn-primary' name="button" @click.prevent="voiceOut">Listen again</button>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-sm-6">
              <b>
                Mode: {{mode}}
              </b>
            </div>
            <div class="col-sm-6 text-right">
              <div class="card-text">
                <b>
                  {{$root.stdClass}} - {{$root.engName}} ({{$root.stdNo}})
                </b>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- 3 -->
    </div> <!-- 2 -->
  </div> <!-- 1 -->

</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      msg: '_______', // @Test
      mistakes: 0,
      index: 0, // @Test
      isCorrect: false, // @Test
      engAns: '', // @Test
      voiceUrl: '' // @Test
      // vocabids: [], //@Test
    }
  },
  computed: {
    mode () {
      switch (this.$root.selectedMode) {
        case '1':
          return 'Normal'
        case '2':
          return 'At least 50% correct'
        case '3':
          return 'At least 75% correct'
      }
    }
  },
  mounted () {
    const vm = this
    document.getElementById('ans').focus()
    axios.get('./api/assessment/' + vm.$root.assessmentName + '/size')
      .then(response => {
        vm.$root.vocabids = _.shuffle(_.range(response.data))
        // ref. https://lodash.com/docs/4.17.4#range
        vm.onStart()
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    onStart () {
      const vm = this
      vm.index = -1
      vm.$root.wrongVocabs = []
      vm.getNextVocab()
    },
    checkAns () {
      const vm = this
      const id = vm.$root.vocabids[vm.index]
      const ans = vm.engAns.trim()
      axios.get('./api/check/assessment/' + vm.$root.assessmentName + '/index/' + id + '?ans=' + ans)
        .then(function (response) {
          vm.isCorrect = response.data

          if (!vm.isCorrect) {
            const index = parseInt(id)
            vm.$root.wrongVocabs.push({
              index,
              ans
            }) // push end
          } // if end

          vm.getNextVocab()
        }) // function(response) end
    }, // checkAns() end
    getVoiceSrc () {
      const vm = this
      const url = './api/voice/assessment/' + vm.$root.assessmentName + '/index/' + vm.$root.vocabids[vm.index] + '?speed=0.24'
      vm.voiceUrl = url
      vm.$refs.player.load()
    },
    voiceOut () {
      const vm = this
      // const url = 'https://careers.liping.edu.hk/edict/api/voice/vocab/id/' + vm.$root.vocabids[vm.index]
      vm.$refs.player.play()
    },
    getNextVocab () {
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
        /* global alert */
        alert('Restart Test')
        vm.onStart()
        return
      }

      vm.index++
      if (vm.index < vm.$root.vocabids.length) {
        vm.isCorrect = false
        vm.engAns = ''
        const index = vm.index

        axios.get('./api/assessment/' + vm.$root.assessmentName + '/index/' + vm.$root.vocabids[index])
          .then(function (response) {
            const {definition, partOfSpeech} = response.data
            vm.msg = `${definition} (${partOfSpeech})`

            vm.getVoiceSrc()
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        vm.$root.currentRoute = '/report'
      }
    }
  }
}
</script>

<style lang="css">
</style>
