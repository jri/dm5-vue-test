import Vue from "vue"
import InfobitsApp from "./components/infobits-app.vue"
import InfobitsStore from "./store"

new Vue({
  el: "#app",
  render: r => r(InfobitsApp),
  store: InfobitsStore
})
