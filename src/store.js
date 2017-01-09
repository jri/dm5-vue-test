import Vue from "vue"
import Vuex from "vuex"
import http from "axios"
import typeDefs from "./infobit-typedefs"

Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    typeDefs,                 // infobit type definitions
    user: undefined,          // the logged in user (string)
    infobitId: undefined,     // selected infobit
    treePanel: {
      users: undefined,
      selectedUser: undefined,
      tree: undefined,        // the entire tree
      subtree: undefined      // the visible tree (equals tree if no subtree filter is set)
    },
    inbox: {
      infobits: []            // set to empty (instead undefined) for initial sort
    },
    detailPanel: {
      infobit: undefined,
      mode: "info",           // "info" or "form"
      formAction: undefined   // "create" or "update"
    },
    modKeys: {}
  },

  getters: {
    sortedInboxInfobits: state => state.inbox.infobits.sort(
      (i1, i2) => i2.created - i1.created
    )
  },

  actions: {

    initStore({state}, user) {
      console.log("initStore", user)
      state.user = user
      state.treePanel.selectedUser = user
      http.get("/core/topic/by_type/dm4.accesscontrol.username")
        .then(response => state.treePanel.users = response.data)
      http.get("/infobits/inbox")
        .then(response => state.inbox.infobits = response.data.infobits)
      //
      state.treePanel.tree = {nodes: []}
      state.treePanel.subtree = state.treePanel.tree
    },

    selectInfobit({state}, infobitId) {
      state.infobitId = infobitId
      http.get("/infobits/infobit/" + infobitId)
        .then(response => state.detailPanel.infobit = response.data)
    },

    selectTree({state}, username) {
      console.log("selectTree", username)
      http.get("/infobits/tree/infobits.tree." + username).then(response => {
        state.treePanel.tree = response.data
        state.treePanel.subtree = state.treePanel.tree
      })
    },

    setCollapsed({state}, {node, collapsed}) {
      console.log("setCollapsed", node.id, collapsed)
      node.collapsed = collapsed
      http.put("/infobits/tree/node/" + node.id + "/collapsed/" + collapsed)
    },

    setSubtreeFilter({state}, node) {
      state.treePanel.subtree = node
    },

    resetSubtreeFilter({state}) {
      state.treePanel.subtree = state.treePanel.tree
    },

    insertInfobitInTree({state}, {infobitId, parentNodeId, predNodeId}) {
      http.put("/infobits/tree/infobit/" + infobitId + "/parent/" + parentNodeId + "/pred/" + predNodeId)
    },

    removeInfobitFromInbox({state}, infobitId) {
      http.delete("/infobits/inbox/infobit/" + infobitId)
    },

    removeNodeFromTree({state}, nodeId) {
      http.delete("/infobits/tree/node/" + nodeId)
    },

    moveSubtree({state}, {rootNodeId, parentNodeId, predNodeId}) {
      http.put("/infobits/tree/node/" + rootNodeId + "/parent/" + parentNodeId + "/pred/" + predNodeId)
    },

    copySubtree({state}, {rootNodeId, parentNodeId, predNodeId}) {
      http.post("/infobits/tree/node/" + rootNodeId + "/parent/" + parentNodeId + "/pred/" + predNodeId)
    },

    newInfobit({state}, type) {
      console.log("newInfobit", type)
      state.infobitId = undefined
      state.detailPanel.infobit = {
        type,
        details: {}
      }
      state.detailPanel.mode = "form"
      state.detailPanel.formAction = "create"
    },

    editInfobit({state}) {
      state.detailPanel.mode = "form"
      state.detailPanel.formAction = "update"
    },

    submitInfobit({state}) {
      console.log("submitInfobit", state.detailPanel.infobit)
      state.detailPanel.mode = "info"
      switch (state.detailPanel.formAction) {
      case "create":
        http.post("/infobits/infobit", state.detailPanel.infobit); break
      case "update":
        http.put("/infobits/infobit/" + state.detailPanel.infobit.id, state.detailPanel.infobit); break
      }
    },

    setModKeys({state}, modKeys) {
      state.modKeys = modKeys
    },

    // WebSocket messages

    _addInfobitToInbox({state}, {infobit}) {
      state.inbox.infobits.push(infobit)
      state.infobitId = infobit.id
      state.detailPanel.infobit = infobit
    },

    _insertInfobitInTree({state}, {infobit, nodeId, parentNodeId, predNodeId}) {
      var node = {
        id: nodeId,
        infobit,
        nodes: [],
        collapsed: false
      }
      insertNode(node, parentNodeId, predNodeId)
    },

    _removeInfobitFromInbox({state}, {infobitId}) {
      findInfobitInInbox(infobitId, (_, i) => state.inbox.infobits.splice(i, 1))
    },

    _removeNodeFromTree({state}, {nodeId}) {
      var found = findNode(nodeId)
      found.nodes.splice(found.i, 1)
    },

    _updateInfobit({state}, {infobit}) {
      findInfobitInInbox(infobit.id, updateTitle)
      findInfobitInTree(infobit.id, updateTitle)

      function updateTitle(_infobit) {
        _infobit.title = infobit.title
      }
    },

    _moveSubtree({state}, {rootNodeId, parentNodeId, predNodeId}) {
      // remove from source
      var found = findNode(rootNodeId)
      if (!found) {
        throw "Node " + rootNodeId + " not found in tree"
      }
      var node = found.nodes.splice(found.i, 1)[0]
      // insert at target
      insertNode(node, parentNodeId, predNodeId)
    },

    _copySubtree({state}, {tree, parentNodeId, predNodeId}) {
      insertNode(tree, parentNodeId, predNodeId)
    }
  }
})

store.watch(
  state => state.treePanel.selectedUser,
  username => store.dispatch("selectTree", username)
)

export default store



// === Helper ===

function insertNode(node, parentNodeId, predNodeId) {
  let nodes   // nodes to insert to
  let i       // insertion index
  if (predNodeId == -1) {
    if (parentNodeId == store.state.treePanel.tree.id) {
      nodes = store.state.treePanel.tree.nodes
    } else {
      let found = findNode(parentNodeId)
      nodes = found.nodes[found.i].nodes
    }
    i = 0   // insert at begin
  } else {
    let found = findNode(predNodeId)
    nodes = found.nodes
    i = found.i + 1
  }
  nodes.splice(i, 0, node)
}

function findInfobitInInbox(id, callback) {
  var i = store.state.inbox.infobits.findIndex(i => i.id == id)
  if (i != -1) {
    callback(store.state.inbox.infobits[i], i)
  }
}

function findInfobitInTree(id, callback) {

  findInfobitInNodes(store.state.treePanel.tree.nodes)

  function findInfobitInNodes(nodes) {
    nodes.forEach(node => {
      if (node.infobit.id == id) {
        callback(node.infobit)
      }
      findInfobitInNodes(node.nodes)
    })
  }
}

function findNode(nodeId) {

  return findNodeInNodes(store.state.treePanel.tree.nodes)

  function findNodeInNodes(nodes) {
    for (var i = 0, node; node = nodes[i]; i++) {
      if (node.id == nodeId) {
        return {nodes, i}
      } else {
        var found = findNodeInNodes(node.nodes)
        if (found) {
          return found
        }
      }
    }
  }
}
