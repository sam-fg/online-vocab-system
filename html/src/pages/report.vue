<template lang="html">
  <div class="container">
    <p id="date"></p>
    <h4><i><b>S.K.H. Li Ping Secondary School</b></i></h4>
    <h4><i>Online Vocabulary Test Report</i> <button class="btn btn-info" @click.prevent="onPrint">Print</button></h4>
    <hr>
    <table>
      <tr>
        <td><h5>Student : </h5></td>
        <td><h3>{{$root.stdClass}} {{$root.engName}} ({{$root.stdNo}})</h3></td>
      </tr>
      <tr>
        <td><h5>Score : </h5></td>
        <td><h3>{{correctVocabs}}/{{$root.vocabids.length}} ({{correctPercent}}%)</h3></td>
      </tr>
    </table>
    <hr>
    <h1>[{{$root.assessmentName}}]</h1>
    <div>
      <table class="table">
        <tr>
          <td><b><u>X--Your WRONG Answers--X</u></b></td>
          <td><b>--> <u>Correct Spelling</u></b></td>
        </tr>
        <tr v-for="s in stat">
          <td>{{s.ans}}</td>
          <td> --> {{s.title}}</td>
          <td>({{s.partOfSpeech}})</td>
        </tr>
      </table>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data () {
    return {
      stat: []
    }
  },
  mounted () {
    /* global document */
    document.getElementById('date').innerHTML = Date()

    const vm = this
    axios.post('./api/assessment/' + vm.$root.assessmentName + '/report/', vm.$root.wrongVocabs)
      .then(function (response) {
        vm.stat = _.orderBy(response.data, 'index')
      })
      .catch(function (error) {
        console.error(error)
      })
  },
  computed: {
    correctPercent () {
      const vm = this
      const percentage = (1 - (vm.$root.wrongVocabs.length / vm.$root.vocabids.length))
      return Math.round(percentage * 1000) / 10
    },
    correctVocabs () {
      const vm = this
      return vm.$root.vocabids.length - vm.$root.wrongVocabs.length
    }
  },
  methods: {
    onPrint () {
      window.print()
    }
  }
}

</script>

<style lang="css">
</style>
