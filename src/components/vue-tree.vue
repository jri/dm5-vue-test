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
    this.$dragula.options("tree-bag", {
      accepts: (el, target, source, sibling) => {
        // console.log("### accepts(el, target, source, sibling(succ))", el, target, source, sibling)
        if (this.panel(target) == "inbox") {
          // console.log("Drop on inbox NOT accepted!")
          return false
        } else {
          // console.log("Drop on tree IS accepted!")
          return true
        }
      }
    })
    this.$dragula.eventBus.$on("drop-model", this.dropModel)
  },
  beforeDestroy() {
    this.$dragula.eventBus.$off("drop-model", this.dropModel)
  },
  methods: {
    dropModel(bagName, el, dropTarget, dropSource, dropIndex) {
      // console.log("### dropModel(bagName, el, dropTarget, dropSource, dropIndex)", bagName, el, dropTarget, dropSource, dropIndex)
      var parentNodeId = dropTarget.el.parentElement.__vue__.node.id
      var predNodeId = dropIndex > 0 ? dropTarget.model[dropIndex - 1].id : -1
      if (this.panel(dropSource.el) == "inbox") {
        var infobitId = dropTarget.model[dropIndex].id
        console.log("=> insertInfobitInTree (infobitId, parentNodeId, predNodeId)", infobitId, parentNodeId, predNodeId)
      } else {
        var rootNodeId = dropTarget.model[dropIndex].id
        console.log("=> moveSubtree (rootNodeId, parentNodeId, predNodeId)", rootNodeId, parentNodeId, predNodeId)
        // this.$store.dispatch("moveSubtree", {rootNodeId, parentNodeId, predNodeId})
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

<style src="../../styles/dragula.css"></style>

<style>
ul.vue-tree {
  padding-left: 0;
}
</style>
