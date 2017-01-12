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
      // drag state (affects cursor shape)
      dragging:   false,
      acceptDrop: false,
      copy:       false,
      //
      events: {
        "drop-model": this.dropModel,
        "drag":       this.drag,
        "dragend":    this.dragend,
        "cloned":     this.cloned,
        "shadow":     this.shadow,
      }
    }
  },

  computed: {
    altKey() {
      return this.$store.state.modKeys.altKey
    }
  },

  created() {
    this.$dragula.options("infobits", {
      accepts: (el, target, source, sibling) => {
        var onTree = this.panel(target) == "tree"
        var onSelf = el.contains(target)
        var acceptDrop = onTree && !onSelf
        this.acceptDrop = acceptDrop
        this.updateCursor()
        return acceptDrop
      },
      copy: (el, source) => {
        if (this.panel(source) == "inbox") {
          this.copy = false
          return true
        } else {
          this.copy = this.altKey
          return this.copy
        }
      }
    })
    //
    this.eventHandlers("$on")
  },

  beforeDestroy() {
    this.eventHandlers("$off")
  },

  methods: {
    dropModel(bagName, el, dropTarget, dropSource, dropIndex) {
      var droppedId = dropTarget.model[dropIndex].id   // either a node ID (source=tree) or an infobit ID (source=inbox)
      var parentNodeId
      var predNodeId
      var cl = dropTarget.el.classList
      if (cl.contains("infobits-tree") || cl.contains("empty-tree-drop-area")) {
        parentNodeId = this.$store.state.treePanel.tree.id            // dropped between top-level childs
      } else if (cl.contains("child-nodes")) {
        parentNodeId = dropTarget.el.parentElement.__vue__.node.id    // dropped between deeper-level childs
      } else if (cl.contains("drop-area")) {
        parentNodeId = dropTarget.el.parentElement.parentElement.__vue__.node.id
      } else {
        throw "Unknown drop target: " + dropTarget.el
      }
      predNodeId = dropIndex > 0 ? dropTarget.model[dropIndex - 1].id : -1
      //
      if (this.panel(dropSource.el) == "inbox") {
        console.log("insertInfobitInTree(infobitId, parentNodeId, predNodeId)", droppedId, parentNodeId, predNodeId)
        this.$store.dispatch("insertInfobitInTree", {infobitId: droppedId, parentNodeId, predNodeId})
      } else {
        if (this.copy) {
          console.log("copySubtree(rootNodeId, parentNodeId, predNodeId)", droppedId, parentNodeId, predNodeId)
          this.$store.dispatch("copySubtree", {rootNodeId: droppedId, parentNodeId, predNodeId})
        } else {
          console.log("moveSubtree(rootNodeId, parentNodeId, predNodeId)", droppedId, parentNodeId, predNodeId)
          this.$store.dispatch("moveSubtree", {rootNodeId: droppedId, parentNodeId, predNodeId})
        }
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

    // Fired once after drag start when the mirror element is cloned from the original element.
    // The "mirror element" is the element that follows the mouse while dragging.
    cloned(bagName, clone, original, type) {
      // remove infobit hover behavior from mirror element
      if (type == "mirror") {
        clone.querySelector(".infobit").classList.add("no-events")
      }
    },

    // Fired each time when the "feedback shadow" element (also called "visual aid shadow") is placed while a drag.
    // "el" is the shadow element.
    shadow(bagName, el, container, source) {
      // when dragged from inbox adapt shadow element to tree style
      if (this.panel(source) == "inbox") {
        el.classList.add("inbox-transit")
      }
    },

    panel(el) {
      if (el.classList.contains("infobits-tree") ||
          el.classList.contains("child-nodes")   ||
          el.classList.contains("drop-area")     ||
          el.classList.contains("empty-tree-drop-area")) {
        return "tree"
      } else if (el.parentElement.id == "inbox") {
        return "inbox"
      } else {
        throw "Unknown Dragula container: " + el
      }
    },

    updateCursor() {
      // Note: updating the cursor shape via binding the style attribute does not work properly. I don't know why.
      // See the stash "cursor-style-binding". It does only work when setting the body style, but the body element
      // is not covered by our Vue root instance. So we do the update programmatically here.
      var cursor = this.dragging ? this.acceptDrop ? this.copy ? "copy" : "move" : "no-drop" : "auto"
      document.body.style.cursor = cursor
    },

    eventHandlers(funcName) {
      var eb = this.$dragula.eventBus
      for (var event in this.events) {
        eb[funcName].call(eb, event, this.events[event])
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
