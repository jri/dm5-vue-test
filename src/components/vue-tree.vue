<template>
  <ul class="vue-tree" v-if="tree">
    <vue-tree-node :node="tree"></vue-tree-node>
  </ul>
</template>

<script>
export default {
  props: ["tree"],
  components: {
    "vue-tree-node": require("./vue-tree-node.vue")
  }
}
</script>

<style>
ul.vue-tree {
  padding-left: 0;
}
</style>
