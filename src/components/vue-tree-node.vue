<template>
  <li class="vue-tree-node">
    <div class="content">
      <div :class="['arrow', hasChilds ? isCollapsed ? 'collapsed' : 'expanded' : '']" @click="toggleCollapsed">
      </div>
      <div :class="['title', {highlight: isSelected}]" v-if="node.infobit" @click="select">
        {{node.infobit.title}}
      </div>
      <div class="debug">{{node.id}}</div>
    </div>
    <ul v-if="hasChilds && !isCollapsed" v-dragula="node.nodes" bag="what-is-a-bag">
      <vue-tree-node v-for="node in node.nodes" :node="node" :key="node.id"></vue-tree-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "vue-tree-node",
  props: ["node"],
  computed: {
    isSelected() {
      return this.$store.state.infobitId == this.infobitId
    },
    isCollapsed() {
      return this.node.collapsed
    },
    hasChilds() {
      return this.node.nodes.length
    },
    infobitId() {
      return this.node.infobit.id
    }
  },
  methods: {
    select() {
      this.$store.dispatch("selectInfobit", this.infobitId)
    },
    toggleCollapsed() {
      this.$store.dispatch("setCollapsed", {
        node: this.node,
        collapsed: !this.isCollapsed
      })
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
  min-width: 0;           /* make word-wrap effective in a flex layout */
}

li.vue-tree-node .debug {
  font-size: 75%;
  color: grey;
}
</style>
