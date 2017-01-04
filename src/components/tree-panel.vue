<template>
  <div id="tree-panel">
    <h3>Tree</h3>
    <user-select></user-select>
    <vue-tree :tree="tree"></vue-tree>
  </div>
</template>

<script>
export default {
  computed: {
    tree: function() {
      return this.$store.state.treePanel.tree
    }
  },
  components: {
    "user-select": require("./user-select.vue"),
    "vue-tree":    require("./vue-tree.vue")
  }
}
</script>

<style>
#tree-panel {
  flex-basis: 40%;
  overflow: auto;
  box-sizing: border-box;
  padding-left: 1em;
  padding-right: 1em;
}
</style>
