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
    console.log("Registering Dragula event handlers")
    Vue.vueDragula.eventBus.$on("drop", this.drop)
    //Vue.vueDragula.eventBus.$on("dropModel", this.dropModel)
  },
  beforeDestroy() {
    console.log("Unregistering Dragula event handlers")
    Vue.vueDragula.eventBus.$off("drop", this.drop)
    //Vue.vueDragula.eventBus.$off("dropModel", this.dropModel)
  },
  methods: {
    drop(args) {
      console.log("### drop(bag, el, target, source, sibling(succ))", args)
      var rootNodeId = args[1].__vue__.node.id
      var parentNodeId = args[2].parentNode.__vue__.node.id
      var previousSibling = args[1].previousSibling
      var predNodeId = previousSibling != null ? previousSibling.__vue__.node.id : -1
      console.log("rootNodeId", rootNodeId, "parentNodeId", parentNodeId, "predNodeId", predNodeId)
      this.$store.dispatch("moveSubtree", {rootNodeId, parentNodeId, predNodeId})
    }/*,
    dropModel(args, a2, a3, a4) {
      console.log("### dropModel(bag, el, target, source, sibling(succ))", args, a2, a3, a4)
    }*/
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
