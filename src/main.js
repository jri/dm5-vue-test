import Vue from "vue"
import store from "./store"
import AutoWebSocket from "./lib/websocket"
import MessageDispatcher from "./message-dispatcher"
import InfobitsApp from "./components/infobits-app.vue"

new AutoWebSocket("eu.nosconte.infobits", new MessageDispatcher(store))

new Vue({
  el: "#app",
  render: r => r(InfobitsApp),
  store
})
