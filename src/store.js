import Vue from "vue"
import Vuex from "vuex"
import http from "axios"
import typeDefs from "./infobit-typedefs"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    infobitId: undefined,     // selected infobit
    treePanel: {
      users: undefined,
      selectedUser: undefined,
      tree: undefined
    },
    inbox: {
      infobits: []            // set to empty (instead undefined) for initial sort
    },
    detailPanel: {
      infobit: undefined,
      mode: "info",           // "info" or "form"
      formAction: undefined   // "create" or "update"
    },
    typeDefs
  },

  getters: {
    sortedInboxInfobits: state => state.inbox.infobits.sort(
      (i1, i2) => i2.created - i1.created
    )
  },

  actions: {

    init({state}) {
      http.get("/core/topic/by_type/dm4.accesscontrol.username")
        .then(response => state.treePanel.users = response.data)
      http.get("/infobits/inbox")
        .then(response => state.inbox.infobits = response.data.infobits)
    },

    selectInfobit({state}, infobitId) {
      state.infobitId = infobitId
      http.get("/infobits/infobit/" + infobitId)
        .then(response => state.detailPanel.infobit = response.data)
    },

    selectTree({state}, username) {
      console.log("selectTree", username)
      http.get("/infobits/tree/infobits.tree." + username)
        .then(response => state.treePanel.tree = response.data)
    },

    setCollapsed({state}, {node, collapsed}) {
      console.log("setCollapsed", node.id, collapsed)
      node.collapsed = collapsed
      http.put("/infobits/tree/node/" + node.id + "/collapsed/" + collapsed)
    },

    insertInfobitInTree({state}, {infobitId, parentNodeId, predNodeId}) {
      http.put("/infobits/tree/infobit/" + infobitId + "/parent/" + parentNodeId + "/pred/" + predNodeId)
    },

    moveSubtree({state}, {rootNodeId, parentNodeId, predNodeId}) {
      http.put("/infobits/tree/node/" + rootNodeId + "/parent/" + parentNodeId + "/pred/" + predNodeId)
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

    // WebSocket messages

    addInfobitToInbox({state}, infobit) {
      state.inbox.infobits.push(infobit)
      state.infobitId = infobit.id
      state.detailPanel.infobit = infobit
    },

    updateInfobit({state}, infobit) {
      findInfobitInInbox(infobit.id, updateTitle)
      findInfobitInTree(infobit.id, updateTitle)

      function updateTitle(_infobit) {
        _infobit.title = infobit.title
      }
    }
  }
})

store.watch(function(state) {
  return state.treePanel.selectedUser
}, function(username) {
  store.dispatch("selectTree", username)
})

store.dispatch("init")

// === Helper ===

function findInfobitInInbox(id, callback) {
  var infobit = store.state.inbox.infobits.find(i => i.id == id)
  if (infobit) {
    callback(infobit)
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

export default store
