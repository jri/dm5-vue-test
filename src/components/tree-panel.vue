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
    // Note: when Webpack redeploys this component ("Hot Module Replacement") the created()
    // hook is triggered again, resulting in the event listeners registered multiple times.
    // Explicit unregistering is required.
    this.$root.$off("select-user",   this.selectUser)
    this.$root.$off("set-collapsed", this.setCollapsed)
  },
  methods: {
    selectUser(username) {
      // Note: if the http callback would be defined with function() inside that function "this" would be
      // undefined. Usually vue.js binds "this" to the component when calling an event handler or watcher.
      // But the http callback is *not* called by vue.js but by axios. We work around this by using the
      // arrow notation for defining the http callback. This way "this" remains to be bound to the component.
      http.get("/infobits/tree/infobits.tree." + username)
        .then(response => this.tree = response.data)
    },
    setCollapsed(node) {
      http.put("/infobits/tree/node/" + node.id + "/collapsed/" + node.collapsed)
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
