<template>

<div style='width: 500px; margin-top: 12px' class="mx-auto">

<div class="card border-info mb-3" style="max-width: 50rem;">
  <div class="card-header"><H5><B><font color='#336699'>S.K.H. Li Ping Secondary School</font></B></H5></div>
        <div class="card-body text-info">
          <h2>Online Vocabulary Tests</h2>
          <p class="card-text">
          <form>
              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Name (FULL):</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" v-model="$root.engName" placeholder="Name (FULL)">
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4">Class:</label>
                <div class="col-sm-7">
                  <select v-model="$root.stdClass" class="form-control">
                      <option value="1A">1A</option>
                      <option value="1B">1B</option>
                      <option value="1C">1C</option>
                      <option value="1D">1D</option>
                      <option value="2A">2A</option>
                      <option value="2B">2B</option>
                      <option value="2C">2C</option>
                      <option value="2D">2D</option>
                      <option value="3A">3A</option>
                      <option value="3B">3B</option>
                      <option value="3C">3C</option>
                      <option value="3D">3D</option>
                      <option value="4A">4A</option>
                      <option value="4B">4B</option>
                      <option value="4C">4C</option>
                      <option value="4D">4D</option>
                      <option value="4E">4E</option>
                      <option value="5A">5A</option>
                      <option value="5B">5B</option>
                      <option value="5C">5C</option>
                      <option value="5D">5D</option>
                      <option value="5E">5E</option>
                      <option value="6A">6A</option>
                      <option value="6B">6B</option>
                      <option value="6C">6C</option>
                      <option value="6D">6D</option>
                      <option value="6E">6E</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4 col-form-label">Class Number:</label>
                <div class="col-sm-7">
                  <input class="form-control" type="number" min="1" max="40" v-model="$root.stdNo" placeholder="Class Number">
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4">Test:</label>
                <div class="col-sm-7">
                  <select v-model="$root.assessmentName" class="form-control" @change="vocabsToBeTested">
                    <option v-for="name in assessmentNames" v-bind:value="name">
                    {{name}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label class="col-sm-4">Mode:</label>
                <div class="col-sm-7">
                  {{$root.selectedMode}}
                  <select class="form-control" @change="function(e) {$root.selectedMode=e.target.value}" >
                    <option value="1" selected>Normal</option>
                    <option value="2">At least 50% correct</option>
                    <option value="3">At least 75% correct</option>
                  </select>
                </div>
              </div>

              <button class="btn btn-primary btn-lg" @click="onStart" type="submit">Start the test</button> 
          </form>

          </p>
        </div>

  </div>

</div>

</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  data() {
    return {
      assessmentNames: [] //@Test
    }
  },
  mounted() {
  const vm = this
  axios.get('./api/assessment/')
    .then(function(response) {
      vm.assessmentNames = response.data
      console.log(vm.assessmentNames);
    })
    .catch(function(error) {
      console.log(error);
    });
  },

  methods: {
    onStart() {
      const vm = this

        vm.$root.currentRoute = '/test'
      }
    // TODO: change method name for better description

    // vocabsToBeTested() {
    //   const vm = this
    //   console.log('running vocabsToBeTested');
    //   // TODO: change the api to api/assessment/:name/size
    //   axios.get('./api/assessment/' + vm.$root.assessmentName + '/size')
    //     .then(function(response) {
    //       vm.$root.vocabids = response.data
    //       console.log(vm.$root.assessmentName);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }

  }
}
</script>
