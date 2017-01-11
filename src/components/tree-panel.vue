<template>
  <div id="tree-panel">
    <h3>Tree</h3>
    <user-select></user-select>
    <spinner :show="loading"></spinner>
    <!-- Subtree Filter -->
    <div class="subtree-filter" v-if="subtreeFilter">
      <infobit :infobit="subtree.infobit"></infobit>
      <button class="clickable" @click="resetSubtreeFilter">Reset</button>
    </div>
    <!-- Tree -->
    <infobits-tree :tree="subtree"></infobits-tree>
  </div>
</template>

<script>
export default {
  computed: {
    treePanel() {
      return this.$store.state.treePanel
    },
    subtree() {
      return this.treePanel.subtree
    },
    subtreeFilter() {
      return this.subtree != this.treePanel.tree
    },
    loading() {
      return this.treePanel.loading
    }
  },
  methods: {
    resetSubtreeFilter() {
      this.$store.dispatch("resetSubtreeFilter")
    }
  },
  components: {
    "user-select":   require("./user-select.vue"),
    "infobits-tree": require("./infobits-tree.vue"),
    "infobit":       require("./infobit.vue"),
    "spinner":       require("./spinner.vue")
  }
}
</script>

<style>
#tree-panel {
  flex-basis: 40%;
  overflow: auto;
  box-sizing: border-box;
  padding-left: 1em;
  padding-right: 1em;
}

#tree-panel .subtree-filter {
  display: flex;
  align-items: center;
  margin-top: 1em;
  border-top: 1px dotted gray;
  border-bottom: 1px dotted gray;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
}

#tree-panel .subtree-filter .infobit {
  flex: auto;
  min-width: 0;     /* make word-wrap effective in a flex layout */
}

#tree-panel .subtree-filter button {
  flex: none;
  visibility: hidden;
}

#tree-panel .subtree-filter:hover button {
  visibility: visible;
}
</style>
