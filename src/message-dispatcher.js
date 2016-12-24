export default function(store) {

  return function(message) {
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
    //case "removeInfobitFromInbox":    TODO
    //case "removeNodeFromTree":        TODO
    case "moveSubtree":
      store.dispatch("_moveSubtree", {
        nodeId:       message.rootNodeId,
        parentNodeId: message.parentNodeId,
        predNodeId:   message.predNodeId
      })
      break
    //case "copySubtree":               TODO
    default:
      throw "Unknown message \"" + message.command + "\" received"
    }
  }
}
