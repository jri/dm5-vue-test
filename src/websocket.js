import AutoWebSocket from "./lib/auto-websocket"
import store from "./store"

new AutoWebSocket("eu.nosconte.infobits", dispatcher)

function dispatcher(message) {
  store.dispatch("_" + message.command, message)
}
