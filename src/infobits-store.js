import Vue from "vue"
import Vuex from "vuex"
import http from "axios"
import types from "./infobit-types"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types,
    infobitId: undefined,
    infobit: undefined,
    detailPanel: {
      mode: "info",           // "info" or "form"
      formAction: undefined   // "create" or "update"
    }
  },
  mutations: {
    selectInfobit(state, infobitId) {
      state.infobitId = infobitId
      // ### FIXME: vuex doesn't allow async mutations. Use an action instead.
      http.get("/infobits/infobit/" + infobitId)
        .then(response => state.infobit = response.data)
    },
    newInfobit(state, type) {
      console.log("newInfobit", type)
      state.infobitId = undefined
      state.infobit = {
        type,
        details: {}
      }
      state.detailPanel.mode = "form"
      state.detailPanel.formAction = "create"
    },
    editInfobit(state) {
      state.detailPanel.mode = "form"
      state.detailPanel.formAction = "update"
    },
    submitInfobit(state) {
      console.log("submitInfobit", state.infobit)
      state.detailPanel.mode = "info"
      switch (state.detailPanel.formAction) {
      case "create":
        http.post("/infobits/infobit", state.infobit); break
      case "update":
        http.put("/infobits/infobit/" + state.infobit.id, state.infobit); break
      }
    }
  }
})
