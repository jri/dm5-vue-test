<template>
  <!-- Note: child nodes rendering involves code doubling with tree-node.vue here -->
  <!-- We can't introduce a <child-nodes> component as Webpack can't handle indirect recursive ES6 default imports -->
  <!-- The result would be "[Vue warn]: Failed to mount component: template or render function not defined" -->
  <!-- https://github.com/webpack/webpack/issues/1788 -->
  <ul class="infobits-tree" v-dragula="tree.nodes" bag="infobits">
    <tree-node v-for="node in tree.nodes" :node="node" :key="node.id"></tree-node>
  </ul>
</template>

<script>
export default {
  props: ["tree"],
  components: {
    "tree-node": require("./tree-node.vue")
  }
}
</script>

<style>
ul.infobits-tree {
  padding-left: 0;
}
</style>
