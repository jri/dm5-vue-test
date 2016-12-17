<template>
  <div id="tree-panel">
    <h3>Tree</h3>
    <user-select></user-select>
    <vue-tree :tree="tree"></vue-tree>
  </div>
</template>

<script>
import http from "axios"
import UserSelect from "./user-select.vue"
import VueTree    from "./vue-tree.vue"

export default {
  components: {
    UserSelect, VueTree
  },
  data() {
    return {
      tree: undefined
    }
  },
  created() {
    this.$root.$on("select-user",   this.selectUser)
    this.$root.$on("set-collapsed", this.setCollapsed)
  },
  beforeDestroy() {
    // Note 1: when Webpack redeploys this component ("Hot Module Replacement") the created() hook is triggered
    // again, resulting in the event listeners registered multiple times (at the global event hub). Explicit
    // unregistering is required.
    // Note 2: explicit unregistering would *not* be required if the source component would dispatch the event
    // to the direct parent component (instead of using the global event hub). The parent component would register
    // the event handler directly in its template then, resulting in a more "visible" event flow.
    // ### TODO: think about the tradeoffs of each approach (global event hub vs. direct-parent dispatch).
    // Should we decide for one or the other, or would a mixed approach be reasonable as well?
    this.$root.$off("select-user",   this.selectUser)
    this.$root.$off("set-collapsed", this.setCollapsed)
  },
  methods: {
    selectUser(username) {
      // Note: if the http callback would be defined with function() inside that function "this" would be
      // undefined. Usually vue.js binds "this" to the component when calling an event handler or watcher.
      // But the http callback is *not* called by vue.js but by axios. We work around this by using the
      // arrow notation for defining the http callback. This way "this" remains to be bound to the component.
      console.log("### selectUser", username)
      http.get("/infobits/tree/infobits.tree." + username)
        .then(response => this.tree = response.data)
    },
    setCollapsed(nodeId, collapsed) {
      console.log("### setCollapsed", nodeId, collapsed)
      http.put("/infobits/tree/node/" + nodeId + "/collapsed/" + collapsed)
    }
  }
}
</script>

<style>
#tree-panel {
  flex-basis: 40%;
  overflow: auto;
  background-color: white;
}
</style>
