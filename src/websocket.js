import AutoWebSocket from "./lib/auto-websocket"
import store from "./store"

new AutoWebSocket("eu.nosconte.infobits", dispatcher)

function dispatcher(message) {
  switch (message.command) {
  case "addInfobitToInbox":
    store.dispatch("_addInfobitToInbox", message.infobit)
    break
  case "insertInfobitInTree":
    store.dispatch("_insertInfobitInTree", {
      infobit:      message.infobit,
      nodeId:       message.nodeId,
      parentNodeId: message.parentNodeId,
      predNodeId:   message.predNodeId
    })
    break
  case "updateInfobit":
    store.dispatch("_updateInfobit", message.infobit)
    break
  case "removeInfobitFromInbox":
    store.dispatch("_removeInfobitFromInbox", message.infobitId)
    break
  case "removeNodeFromTree":
    store.dispatch("_removeNodeFromTree", message.nodeId)
    break
  case "moveSubtree":
    store.dispatch("_moveSubtree", {
      nodeId:       message.rootNodeId,
      parentNodeId: message.parentNodeId,
      predNodeId:   message.predNodeId
    })
    break
  case "copySubtree":
    store.dispatch("_copySubtree", {
      tree:         message.tree,
      parentNodeId: message.parentNodeId,
      predNodeId:   message.predNodeId
    })
    break
  default:
    throw "[Infobits] Unknown WebSocket message \"" + message.command + "\" received"
  }
}
