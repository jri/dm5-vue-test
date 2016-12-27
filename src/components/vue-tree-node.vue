<template>
  <li class="vue-tree-node">
    <!-- Node -->
    <div class="content">
      <div :class="['arrow', hasChilds ? isCollapsed ? 'collapsed' : 'expanded' : '']" @click="toggleCollapsed">
      </div>
      <infobit class="infobit" :infobit="node.infobit" v-if="node.infobit" @remove="remove"></infobit>
      <span class="debug">{{node.id}}</span>
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
    },
    infobitId() {
      return this.node.infobit.id
    }
  },
  methods: {
    remove(infobitId) {
      console.log("### TODO: removeNodeFromTree, infobit", infobitId)
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

li.vue-tree-node .content .infobit {
  min-width: 0;           /* make word-wrap effective in a flex layout */
}

li.vue-tree-node.inbox-transit {
  margin-left: 20.6px;    /* must match the arrow style: 11px width + 0.6em margin */
}
</style>
