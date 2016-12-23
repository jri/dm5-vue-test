export default function(store) {

  return function(message) {
    switch (message.command) {
    //case "removeInfobitFromInbox":
    case "addInfobitToInbox":
      store.dispatch("addInfobitToInbox", message.infobit); break
    case "updateInfobit":
      store.dispatch("updateInfobit", message.infobit); break
    //case "insertInfobitInTree":
    //case "removeNodeFromTree":
    //case "moveSubtree":
    //case "copySubtree":
    default:
      throw "Unknown message \"" + message.command + "\" received";
    }
  }
}
