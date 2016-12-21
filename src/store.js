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
      infobits: undefined     // array
    },
    detailPanel: {
      infobit: undefined,
      mode: "info",           // "info" or "form"
      formAction: undefined   // "create" or "update"
    },
    typeDefs
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

    // Tree Panel

    selectTree({state}, username) {
      console.log("selectTree", username)
      http.get("/infobits/tree/infobits.tree." + username)
        .then(response => state.treePanel.tree = response.data)
    },

    setCollapsed({state}, {nodeId, collapsed}) {
      console.log("setCollapsed", nodeId, collapsed)
      http.put("/infobits/tree/node/" + nodeId + "/collapsed/" + collapsed)
    },

    // Detail Panel

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
    }
  }
})

store.watch(function(state) {
  return state.treePanel.selectedUser
}, function(username) {
  store.dispatch("selectTree", username)
})

store.dispatch("init")

export default store
