<template>
  <li>
    <span v-if="node.infobit" @click="state.infobitId = node.infobit.id"
                              :class="{highlight: state.infobitId == node.infobit.id}">
      {{node.infobit.title}}
    </span>
    <ul v-if="node.nodes.length">
      <vue-tree-node v-for="node in node.nodes" :node="node" :state="state"></vue-tree-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "vue-tree-node",
  props: ["node", "state"]
}
</script>

<style>
</style>
