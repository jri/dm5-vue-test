<template>
  <li class="vue-tree-node">
    <div :class="['arrow', hasChilds ? isCollapsed ? 'collapsed' : 'expanded' : '']" @click="setCollapsed"></div>
    <span v-if="node.infobit" :class="{highlight: isSelected}" @click="setSelected">
      {{node.infobit.title}}
    </span>
    <span class="debug">{{node.id}}</span>
    <ul v-if="hasChilds && !isCollapsed">
      <vue-tree-node v-for="node in node.nodes" :node="node"></vue-tree-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "vue-tree-node",
  props: ["node"],
  computed: {
    hasChilds: function() {
      return this.node.nodes.length
    },
    isSelected: function() {
      return this.$root.$data.infobitId == this.node.infobit.id;
    },
    isCollapsed: function() {
      return this.node.collapsed
    }
  },
  methods: {
    setSelected: function() {
      this.$root.$data.infobitId = this.node.infobit.id
    },
    setCollapsed: function() {
      this.node.collapsed = !this.isCollapsed
      this.$root.$emit("set-collapsed", this.node)
    }
  }
}
</script>

<style>
li.vue-tree-node {
  list-style-type: none;
}

li.vue-tree-node > .arrow {
  display: inline-block;
  width: 11px;
  height: 11px;
  margin-right: 0.2em;
}

li.vue-tree-node > .arrow.collapsed {
  background-image: url(assets/collapsed.png);
}

li.vue-tree-node > .arrow.expanded {
  background-image: url(assets/expanded.png);
}

li.vue-tree-node .debug {
  font-size: 75%;
  color: grey;
}
</style>
