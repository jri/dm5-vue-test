import Vue from "vue"
import store from "./infobits-store"
import WebSocket from "./lib/websocket"
import InfobitsProcessor from "./infobits-processor"
import InfobitsApp from "./components/infobits-app.vue"

new WebSocket("eu.nosconte.infobits", new InfobitsProcessor(store))

new Vue({
  el: "#app",
  render: r => r(InfobitsApp),
  created() {
    store.commit("init")
  },
  store
})
