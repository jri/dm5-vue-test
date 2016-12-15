<template>
  <ul>
    <vue-tree-node :node="tree"></vue-tree-node>
  </ul>
</template>

<script>
import VueTreeNode from "./vue-tree-node.vue"

export default {
  props: ["tree"],
  components: {
    VueTreeNode
  }
}
</script>
