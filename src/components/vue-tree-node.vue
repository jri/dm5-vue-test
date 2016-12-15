<template>
  <li>
    <span v-if="node.infobit" @click="$root.$data.infobitId = node.infobit.id"
                              :class="{highlight: $root.$data.infobitId == node.infobit.id}">
      {{node.infobit.title}}
    </span>
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
