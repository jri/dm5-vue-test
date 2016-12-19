import Vue from "vue"
import Vuex from "vuex"
import http from "axios"
import typeDefs from "./infobit-typedefs"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infobitId: undefined,     // selected infobit
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
      http.get("/infobits/inbox")
        .then(response => state.inbox.infobits = response.data.infobits)
    },
    selectInfobit({state}, infobitId) {
      state.infobitId = infobitId
      http.get("/infobits/infobit/" + infobitId)
        .then(response => state.detailPanel.infobit = response.data)
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
    }
  }
})
