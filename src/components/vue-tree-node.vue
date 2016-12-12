<template>
  <li>
    <span v-if="node.infobit">{{node.infobit.title}}</span>
    <ul v-if="node.nodes.length">
      <vue-tree-node v-for="node in node.nodes" :node="node"></vue-tree-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "vue-tree-node",
  props: ["node"]
}
</script>

<style>
</style>
