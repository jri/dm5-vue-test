<template>
  <div id="infobits-app">
    <toolbar></toolbar>
    <div id="content">
      <tree-panel></tree-panel>
      <inbox></inbox>
      <detail-panel></detail-panel>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "toolbar":      require("./toolbar.vue"),
    "tree-panel":   require("./tree-panel.vue"),
    "inbox":        require("./inbox.vue"),
    "detail-panel": require("./detail-panel.vue")
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
  overflow: hidden;   /* avoid window bounce when scrolling */
}

input, textarea {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 1em;
}

#infobits-app {
  height: 100%;
  display: flex;
  flex-flow: column;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#infobits-app #content {
  display: flex;
  flex: auto;
  min-height: 0;
}

.highlight {
  background-color: yellow;
}
</style>
