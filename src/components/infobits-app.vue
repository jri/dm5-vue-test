<template>
  <div id="infobits-app">
    <toolbar></toolbar>
    <div id="infobits-content">
      <tree-panel></tree-panel>
      <inbox></inbox>
    </div>
  </div>
</template>

<script>
import Toolbar     from "./toolbar.vue"
import TreePanel   from "./tree-panel.vue"
import Inbox       from "./inbox.vue"

export default {
  components: {
    Toolbar,
    TreePanel,
    Inbox
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#infobits-app {
  height: 100%;
  display: flex;
  flex-flow: column;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#infobits-content {
  display: flex;
  flex: auto;
  min-height: 0;
}
</style>
