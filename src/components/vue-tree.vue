<template>
  <!-- Note: child nodes rendering involves code doubling with vue-tree-node.vue here -->
  <!-- We can't introduce a <child-nodes> component as Webpack can't handle indirect recursive ES6 default imports -->
  <!-- The result would be "[Vue warn]: Failed to mount component: template or render function not defined" -->
  <!-- https://github.com/webpack/webpack/issues/1788 -->
  <ul class="vue-tree child-nodes" v-dragula="tree.nodes" bag="infobits">
    <vue-tree-node v-for="node in tree.nodes" :node="node" :key="node.id"></vue-tree-node>
  </ul>
</template>

<script>
import Vue from "vue"
import VueDragula from "vue-dragula"

Vue.use(VueDragula)

export default {
  props: ["tree"],
  created() {
    this.$dragula.options("infobits", {
      accepts: (el, target, source, sibling) => {
        var onTree = this.panel(target) == "tree"
        var onSelf = /* el != target && */ el.contains(target)
        // console.log("### accepts(onSelf)", onSelf)
        var accept = onTree && !onSelf
        // this.$store.dispatch("setCursor", accept ? "auto" : "not-allowed")   // doesn't work
        return accept
      },
      copy: (el, source) => this.panel(source) == "inbox"
    })
    this.$dragula.eventBus.$on("drop-model", this.dropModel)
    this.$dragula.eventBus.$on("shadow", this.shadow)
  },
  beforeDestroy() {
    this.$dragula.eventBus.$off("drop-model", this.dropModel)
    this.$dragula.eventBus.$off("shadow", this.shadow)
  },
  methods: {
    dropModel(bagName, el, dropTarget, dropSource, dropIndex) {
      // Note: depending on source droppedId is either a node ID (source=tree) or an infobit ID (source=inbox).
      var droppedId = dropTarget.model[dropIndex].id
      if (dropTarget.el.classList.contains("vue-tree")) {
        var parentNodeId = this.tree.id
      } else {
        var parentNodeId = dropTarget.el.parentElement.__vue__.node.id
      }
      var predNodeId = dropIndex > 0 ? dropTarget.model[dropIndex - 1].id : -1
      if (this.panel(dropSource.el) == "inbox") {
        console.log("insertInfobitInTree(infobitId, parentNodeId, predNodeId)", droppedId, parentNodeId, predNodeId)
        this.$store.dispatch("insertInfobitInTree", {infobitId: droppedId, parentNodeId, predNodeId})
      } else {
        console.log("moveSubtree(rootNodeId, parentNodeId, predNodeId)", droppedId, parentNodeId, predNodeId)
        this.$store.dispatch("moveSubtree", {rootNodeId: droppedId, parentNodeId, predNodeId})
      }
    },
    shadow(bagName, el, container, source) {
      if (this.panel(source) == "inbox") {
        el.classList.add("vue-tree-node", "inbox-transit")
      }
    },
    panel(el) {
      if (el.classList.contains("child-nodes")) {
        return "tree"
      } else if (el.parentElement.id == "inbox") {
        return "inbox"
      } else {
        throw "Unknown Dragula container: " + el
      }
    }
  },
  components: {
    "vue-tree-node": require("./vue-tree-node.vue")
  }
}
</script>

<style src="dragula/dist/dragula.css"></style>

<style>
ul.vue-tree {
  padding-left: 0;
}
</style>
