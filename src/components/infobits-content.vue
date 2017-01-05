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
        var onSelf = el.contains(target)
        var accept = onTree && !onSelf
        // console.log("accepts(onTree, onSelf, accept)", onTree, onSelf, accept)
        this.setCursor(accept ? "move" : "not-allowed")
        return accept
      },
      copy: (el, source) => this.panel(source) == "inbox"
    })
    this.$dragula.eventBus.$on("drop-model", this.dropModel)
    this.$dragula.eventBus.$on("shadow",     this.shadow)
    this.$dragula.eventBus.$on("drag",       this.drag)
    this.$dragula.eventBus.$on("dragend",    this.dragend)
  },

  beforeDestroy() {
    this.$dragula.eventBus.$off("drop-model", this.dropModel)
    this.$dragula.eventBus.$off("shadow",     this.shadow)
    this.$dragula.eventBus.$off("drag",       this.drag)
    this.$dragula.eventBus.$off("dragend",    this.dragend)
  },

  methods: {
    dropModel(bagName, el, dropTarget, dropSource, dropIndex) {
      var droppedId = dropTarget.model[dropIndex].id   // either a node ID (source=tree) or an infobit ID (source=inbox)
      var parentNodeId
      var predNodeId
      var cl = dropTarget.el.classList
      if (cl.contains("infobits-tree")) {
        parentNodeId = this.$store.state.treePanel.tree.id            // dropped between top-level childs
      } else if (cl.contains("child-nodes")) {
        parentNodeId = dropTarget.el.parentElement.__vue__.node.id    // dropped between deeper-level childs
      } else if (cl.contains("drop-area")) {
        parentNodeId = dropTarget.el.parentElement.parentElement.__vue__.node.id
      } else {
        throw "Unexpected drop target: " + dropTarget.el
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
        el.classList.add("tree-node", "inbox-transit")
      }
    },

    drag(bagName, el, source) {
      this.setCursor("move")
    },

    dragend(bagName, el) {
      this.setCursor("auto")
    },

    panel(el) {
      if (el.classList.contains("infobits-tree") ||
          el.classList.contains("child-nodes")   ||
          el.classList.contains("drop-area")) {
        return "tree"
      } else if (el.parentElement.id == "inbox") {
        return "inbox"
      } else {
        throw "Unknown Dragula container: " + el
      }
    },

    setCursor(cursor) {
      document.body.style.cursor = cursor
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
