import Vue from "vue"
import store from "./store"
import router from "./router"
import "./websocket"

new Vue({
  el: "#app",
  store,
  router
})
