<template>
  <li class="tree-node">
    <!-- Node -->
    <div class="content">
      <div v-if="hasChilds" :class="['arrow', isCollapsed ? 'collapsed' : 'expanded']" @click="toggleCollapsed"></div>
      <div v-else class="drop-area" v-dragula="[]" bag="infobits"></div>
      <infobit :infobit="node.infobit">
        <span class="action-button fa fa-fw fa-level-up" @click="setSubtreeFilter"></span>
        <span class="action-button fa fa-fw fa-remove" @click="remove"></span>
      </infobit>
      <span class="debug">{{node.id}}</span>
    </div>
    <!-- Child nodes -->
    <ul class="child-nodes" v-if="hasChilds && !isCollapsed" v-dragula="node.nodes" bag="infobits">
      <tree-node v-for="node in node.nodes" :node="node" :key="node.id"></tree-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "tree-node",
  props: ["node"],
  computed: {
    isCollapsed() {
      return this.node.collapsed
    },
    hasChilds() {
      return this.node.nodes.length
    }
  },
  methods: {
    setSubtreeFilter() {
      this.$store.dispatch("setSubtreeFilter", this.node)
    },
    remove() {
      this.$store.dispatch("removeNodeFromTree", this.node.id)
    },
    toggleCollapsed() {
      this.$store.dispatch("setCollapsed", {
        node: this.node,
        collapsed: !this.isCollapsed
      })
    }
  },
  components: {
    infobit: require("./infobit.vue")
  }
}
</script>

<style>
li.tree-node {
  list-style-type: none;
  margin-top: 0.8em;      /* should match "ul > li" style in inbox.vue */
}

li.tree-node .content {
  display: flex;
}

li.tree-node .content .drop-area {
  flex: 0 0 9px;
  margin-right: 0.4em;    /* should match ".arrow" style below */
  border: 1px dotted lightgray;
}

li.tree-node .content .arrow {
  flex: 0 0 11px;
  margin-right: 0.4em;    /* should match ".drop-area" style above */
  background-repeat: no-repeat;
  background-position: 0px 5px;
  opacity: 0.4;
}

li.tree-node .content .arrow:hover {
  opacity: 1;
}

li.tree-node .content .arrow.collapsed {
  background-image: url("assets/collapsed.png");
}

li.tree-node .content .arrow.expanded {
  background-image: url("assets/expanded.png");
}

li.tree-node .content .infobit {
  min-width: 0;           /* make word-wrap effective in a flex layout */
}

.inbox-transit {
  margin-left: 17.4px;    /* should match ".arrow" style: 11px width + 0.4em margin */
}
</style>
