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

  data() {
    return {
      dragging: false,        // used for cursor calculation
      acceptDrop: false,      // used for cursor calculation
      altKey: false           // used for cursor calculation
    }
  },

  created() {
    this.$store.watch(
      state => state.modKeys.altKey,
      altKey => {
        console.log("Alt key", altKey)
        this.altKey = altKey
        this.updateCursor()
      }
    )
    //
    this.$dragula.options("infobits", {
      accepts: (el, target, source, sibling) => {
        var onTree = this.panel(target) == "tree"
        var onSelf = el.contains(target)
        var accept = onTree && !onSelf
        // console.log("acceptDrop", accept)
        this.acceptDrop = accept
        this.updateCursor()
        return accept
      },
      copy: (el, source) => this.panel(source) == "inbox"
    })
    this.$dragula.eventBus.$on("drop-model", this.dropModel)
    this.$dragula.eventBus.$on("shadow",     this.shadow)
    this.$dragula.eventBus.$on("drag",       this.drag)
    this.$dragula.eventBus.$on("dragend",    this.dragend)
    this.$dragula.eventBus.$on("cloned",     this.cloned)
  },

  beforeDestroy() {
    this.$dragula.eventBus.$off("drop-model", this.dropModel)
    this.$dragula.eventBus.$off("shadow",     this.shadow)
    this.$dragula.eventBus.$off("drag",       this.drag)
    this.$dragula.eventBus.$off("dragend",    this.dragend)
    this.$dragula.eventBus.$off("cloned",     this.cloned)
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

    // Fired each time when the "feedback shadow" element (also called "visual aid shadow") is replaced while a drag.
    // The "feedback shadow" element is a clone of the "mirror element", the element following the mouse while a drag.
    shadow(bagName, el, container, source) {
      if (this.panel(source) == "inbox") {
        el.classList.add("tree-node", "inbox-transit")
      }
    },

    drag(bagName, el, source) {
      // Note: el is the original element. To manipulate the mirror element use the "cloned" event.
      this.dragging = true
      this.updateCursor()
    },

    dragend(bagName, el) {
      this.dragging = false
      this.updateCursor()
    },

    cloned(bagName, clone, original, type) {
      if (type == "mirror") {
        // remove the infobit hover behavior from the mirror element
        clone.querySelector(".infobit").classList.add("no-events")
      }
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

    updateCursor() {
      var cursor = this.dragging ? this.acceptDrop ? this.altKey ? "copy" : "move" : "not-allowed" : "auto"
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
