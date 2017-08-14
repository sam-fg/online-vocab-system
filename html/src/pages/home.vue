<template>
  <div style='width: 500px; margin-top: 12px' class="mx-auto">
    <div class="card border-info mb-3" style="max-width: 50rem;">
      <div class="card-header">
          <H5>
            <b style='color: #336699;'>S.K.H. Li Ping Secondary School</b>
          </H5>
      </div>
      <div class="card-body text-info">
        <h2>Online Vocabulary Tests</h2>
        <p class="card-text">
          <form class="form-control">
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
                  <option v-for="clazz in clazzes">
                    {{clazz}}
                  </option>
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
                <select class="form-control" @change="function(e) {$root.selectedMode=e.target.value}" >
                  <option value="1" selected>Normal</option>
                  <option value="2">At least 50% correct</option>
                  <option value="3">At least 75% correct</option>
                </select>
              </div>
            </div>

            <button class="btn btn-primary btn-lg" @click="onStart" type="submit">
              Start the test
            </button> 
          </form>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      // @Test
      assessmentNames: [],
      clazzes: ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D', '4E', '5A', '5B', '5C', '5D', '5E', '6A', '6B', '6C', '6D', '6E']
    }
  },
  mounted () {
    const vm = this
    axios.get('./api/assessment/', {withCredentials: true})
      .then(function (response) {
        vm.assessmentNames = response.data
        console.log(vm.assessmentNames)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {
    onStart () {
      const vm = this
      vm.$root.currentRoute = '/test'
    }
  }
}
</script>
