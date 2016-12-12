<template>
  <ul>
    <vue-tree-node :node="tree" :state="state"></vue-tree-node>
  </ul>
</template>

<script>
import VueTreeNode from "./vue-tree-node.vue"

export default {
  props: ["tree", "state"],
  components: {
    VueTreeNode
  }
}
</script>

<style>
</style>
