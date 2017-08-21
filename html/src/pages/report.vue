<template lang="html">
  <div class="container" style='width: 60%;'>
    <p class="text-right">{{date}}</p>
    <div style="font-style: italic">
      <h1>S.K.H. Li Ping Secondary School</h1>
      <h2>Online Vocabulary Test Report</h2>
      <h3>Test: <small>{{$root.assessmentName}}</small></h3>
    </div>
    <hr style="border-width: 12px">
    <div class="row">
      <div class="col-sm-1">
        Student:
      </div>
      <div class="col-sm-4">
        <h3>
          {{$root.stdClass}} {{$root.engName}} ({{$root.stdNo}})
        </h3>
      </div>
      <div class="col-sm-1">
        Score:
      </div>
      <div class="col-sm-4">
        <h3>
          {{correctVocabs}}/{{$root.vocabids.length}} ({{correctPercent}}%)
        </h3>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-info" @click.prevent="onPrint">Print</button>
      </div>
    </div>
    <div style="width: 80%; margin-top: 12px" class="mx-auto text-center">
      <table class="table table-hover">
        <thead class="thead-inverse">
          <tr>
            <td class="text-right" width='40%'><b>Your WRONG Answers</b></td>
            <td width='20%'>--> </td>
            <td class="text-left" width='40%'><b>Correct Spelling</b></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in stat">
            <td class="text-right">{{s.ans}}</td>
            <td>--></td>
            <td class="text-left">{{s.title}}</td>
          </tr>
        </tbody>
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
    date () {
      const now = new Date()
      return `${now.toDateString()} ${now.toLocaleTimeString()}`
    },
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
