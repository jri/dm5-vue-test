import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    infobitId: undefined
  },
  mutations: {
    setSelected: (state, infobitId) => state.infobitId = infobitId
  }
})
