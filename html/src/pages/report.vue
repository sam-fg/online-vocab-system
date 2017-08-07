<template lang="html">
  <div>
    <h1>Report</h1>
    <h1>Online Vocabulary Test - Level {{$root.level}}</h1>
    <h2>Name: {{$root.engName}}</h2>
    <h2>Class: {{$root.stdClass}}</h2>
    <h2>Class No.: {{$root.stdNo}}</h2>
    <h2>Your score: {{correctPercent}}% ({{correctVocabs}}/{{$root.vocabids.length}})</h2>
    <h2></h2>
    <div>
      <table>
        <tr>
          <td><u>|Your wrong answers</u></td>
          <td><u>|Correct spelling</u></td>
        </tr>
        <tr v-for="s in stat">
          <td><u>|{{s.ans}}</u></td>
          <td><u>|{{s.title}}</u></td>
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
  data() {
    return {
      stat: []
    }
  },
  mounted() {
    const vm = this
    axios.post('./api/vocab/id', vm.$root.wrongVocabs)
      .then(function(response){
        vm.stat = _.orderBy(response.data, "id")
      })
      .catch(function(err){
        console.error(err)
      })
  },
  computed: {
    correctPercent() {
      const vm = this
      const percentage = (1 - (vm.$root.wrongVocabs.length / vm.$root.vocabids.length))
      return Math.round(percentage*1000)/10
    },
    correctVocabs() {
      const vm = this
      return vm.$root.vocabids.length - vm.$root.wrongVocabs.length
    }
  }
}

</script>

<style lang="css">
</style>
