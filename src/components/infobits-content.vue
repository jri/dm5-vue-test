<template>
  <div id="infobits-content">
    <tree-panel></tree-panel>
    <inbox></inbox>
    <detail-panel></detail-panel>
  </div>
</template>

<script>
import Vue from "vue"
import VueDragula from "vue-dragula"

Vue.use(VueDragula)

export default {
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
      var droppedId = dropTarget.model[dropIndex].id   // either a node ID (source=tree) or an infobit ID (source=inbox)
      var parentNodeId
      var predNodeId
      if (dropTarget.el.classList.contains("vue-tree")) {
        parentNodeId = this.$store.state.treePanel.tree.id            // dropped on first-level childs
      } else {
        parentNodeId = dropTarget.el.parentElement.__vue__.node.id    // dropped on deeper-level childs
      }
      predNodeId = dropIndex > 0 ? dropTarget.model[dropIndex - 1].id : -1
      //
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
    "tree-panel":   require("./tree-panel.vue"),
    "inbox":        require("./inbox.vue"),
    "detail-panel": require("./detail-panel.vue")
  }
}
</script>

<style src="dragula/dist/dragula.css"></style>

<style>
#infobits-content {
  flex: auto;
  display: flex;
  min-height: 0;
}
</style>
