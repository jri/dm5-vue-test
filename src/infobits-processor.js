export default function(store) {

  return function(message) {
    switch (message.command) {
    //case "removeInfobitFromInbox":
    //case "addInfobitToInbox":
    case "updateInfobit":
    //case "insertInfobitInTree":
    //case "removeNodeFromTree":
    //case "moveSubtree":
    //case "copySubtree":
    default:
      throw "Unexpected command: \"" + message.command + "\"";
    }
  }
}
