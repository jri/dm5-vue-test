<template>
  <li class="vue-tree-node">
    <!-- Node -->
    <div class="content">
      <div :class="['arrow', hasChilds ? isCollapsed ? 'collapsed' : 'expanded' : '']" @click="toggleCollapsed">
      </div>
      <infobit :infobit="node.infobit" :removeId="node.id" v-if="node.infobit" class="infobit" @remove="remove">
      </infobit>
      <!--span class="debug">{{node.id}}</span-->
    </div>
    <!-- Child nodes -->
    <ul v-if="hasChilds && !isCollapsed" v-dragula="node.nodes" bag="infobits">
      <vue-tree-node v-for="node in node.nodes" :node="node" :key="node.id"></vue-tree-node>
    </ul>
  </li>
</template>

<script>
export default {
  name: "vue-tree-node",
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
    remove(nodeId) {
      this.$store.dispatch("removeNodeFromTree", nodeId)
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
li.vue-tree-node {
  list-style-type: none;
  margin-top: 1em;
}

li.vue-tree-node .content {
  display: flex;
}

li.vue-tree-node .content .arrow {
  flex: 0 0 11px;
  margin-right: 0.6em;
  background-repeat: no-repeat;
  background-position: 0px 5px;
  opacity: 0.5;
}

li.vue-tree-node .content .arrow:hover {
  opacity: 1;
}

li.vue-tree-node .content .arrow.collapsed {
  background-image: url(assets/collapsed.png);
}

li.vue-tree-node .content .arrow.expanded {
  background-image: url(assets/expanded.png);
}

li.vue-tree-node .content .infobit {
  min-width: 0;           /* make word-wrap effective in a flex layout */
}

li.vue-tree-node.inbox-transit {
  margin-left: 20.6px;    /* must match the arrow style: 11px width + 0.6em margin */
}
</style>
