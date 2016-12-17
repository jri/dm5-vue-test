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
      mode: "info"
    }   // "info" or "form"
  },
  mutations: {
    setSelected(state, infobitId) {
      state.infobitId = infobitId
      http.get("/infobits/infobit/" + infobitId)
        .then(response => state.infobit = response.data)
    },
    setDetailPanelMode(state, mode) {
      state.detailPanel.mode = mode
    }
  }
})
