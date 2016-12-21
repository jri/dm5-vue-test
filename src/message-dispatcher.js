export default function(store) {

  return function(message) {
    switch (message.command) {
    //case "removeInfobitFromInbox":
    //case "addInfobitToInbox":
    case "updateInfobit":
      store.dispatch("updateInfobit", message.infobit); break
    //case "insertInfobitInTree":
    //case "removeNodeFromTree":
    //case "moveSubtree":
    //case "copySubtree":
    default:
      throw "\"" + message.command + "\" is an unknown message";
    }
  }
}