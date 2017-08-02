// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import Home from "./pages/home.vue"
import Test from "./pages/test.vue"
import Report from "./pages/report.vue"

const routes = {
  "/home": Home,
  "/test": Test,
  "/report": Report
}

new Vue({ // eslint-disable-line no-new
  el: '#app', // This is an ID included in "index.html"
  data() {
    return {
      currentRoute: "/home",
      someData: 'hello world'
    }
  },
  computed: {
    currentPage() {
      return routes[this.currentRoute]
    }
  },
  render(h) {
    return h(this.currentPage)
  }
})
