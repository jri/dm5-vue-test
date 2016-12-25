<template>
  <ul class="vue-tree" v-if="tree">
    <vue-tree-node :node="tree"></vue-tree-node>
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
      // console.log("### dropModel(bagName, el, dropTarget, dropSource, dropIndex)", bagName, el, dropTarget,
      //     dropSource, dropIndex)
      // Note: depending on source droppedId is either a node ID (source=tree) or an infobit ID (source=inbox).
      var droppedId = dropTarget.model[dropIndex].id
      var parentNodeId = dropTarget.el.parentElement.__vue__.node.id
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
      // console.log("### shadow(bagName, el, container, source)", bagName, el, container, source)
      if (this.panel(source) == "inbox") {
        el.classList.add("vue-tree-node", "inbox-transit")
      }
    },
    panel(el) {
      if (el.parentElement.classList.contains("vue-tree-node")) {
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
