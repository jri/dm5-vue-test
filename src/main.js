import Vue from "vue"
import store from "./store"
import router from "./router"
import AutoWebSocket from "./lib/websocket"
import MessageDispatcher from "./message-dispatcher"

new AutoWebSocket("eu.nosconte.infobits", new MessageDispatcher(store))

new Vue({
  el: "#app",
  store,
  router
})
