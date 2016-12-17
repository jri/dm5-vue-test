<template>
  <li class="vue-tree-node">
    <div class="content">
      <div :class="['arrow', hasChilds ? isCollapsed ? 'collapsed' : 'expanded' : '']" @click="toggleCollapsed"></div>
      <div :class="['title', {highlight: isSelected}]" v-if="node.infobit" @click="setSelected">
        {{node.infobit.title}}
      </div>
      <div class="debug">{{node.id}}</div>
    </div>
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
      return this.$store.state.infobitId == this.node.infobit.id
    },
    isCollapsed: function() {
      return this.node.collapsed
    }
  },
  methods: {
    setSelected: function() {
      this.$store.commit("setSelected", this.node.infobit.id)
    },
    toggleCollapsed: function() {
      this.node.collapsed = !this.isCollapsed
      this.$root.$emit("set-collapsed", this.node.id, this.isCollapsed)
    }
  }
}
</script>

<style>
li.vue-tree-node {
  list-style-type: none;
  margin-top: 0.6em;
}

li.vue-tree-node .content {
  display: flex;
}

li.vue-tree-node .content .arrow {
  flex: 0 0 11px;
  margin-right: 0.6em;
  background-repeat: no-repeat;
  background-position: 0px 5px;
}

li.vue-tree-node .content .arrow.collapsed {
  background-image: url(assets/collapsed.png);
}

li.vue-tree-node .content .arrow.expanded {
  background-image: url(assets/expanded.png);
}

li.vue-tree-node .content .title {
  word-wrap: break-word;  /* avoid horizontal scrollbar in case of long words */
  min-width: 0;           /* make word-wrap effective in a flex layout */
}

li.vue-tree-node .debug {
  font-size: 75%;
  color: grey;
}
</style>
