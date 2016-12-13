import Vue from "vue"
import InfobitsApp from "./components/infobits-app.vue"

new Vue({
  el: "#app",
  // global app state
  data: {
    infobitId: undefined
  },
  render: r => r(InfobitsApp)
})
