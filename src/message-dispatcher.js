export default function(store) {

  return function(message) {
    switch (message.command) {
    case "addInfobitToInbox":
      store.dispatch("_addInfobitToInbox", message.infobit)
      break
    // case "insertInfobitInTree":
    case "updateInfobit":
      store.dispatch("_updateInfobit", message.infobit)
      break
    //case "removeInfobitFromInbox":
    //case "removeNodeFromTree":
    case "moveSubtree":
      store.dispatch("_moveSubtree", {
        nodeId:       message.rootNodeId,
        parentNodeId: message.parentNodeId,
        predNodeId:   message.predNodeId
      })
      break
    //case "copySubtree":
    default:
      throw "Unknown message \"" + message.command + "\" received"
    }
  }
}
