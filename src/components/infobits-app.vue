<template>
  <div id="infobits-app" :style="{cursor: cursor}">
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
  computed: {
    cursor() {
      return this.$store.state.cursor
    }
  },
  components: {
    "toolbar":      require("./toolbar.vue"),
    "tree-panel":   require("./tree-panel.vue"),
    "inbox":        require("./inbox.vue"),
    "detail-panel": require("./detail-panel.vue")
  }
}
</script>

<style src="font-awesome/css/font-awesome.css"></style>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  overflow: hidden;       /* avoid window bounce when scrolling reaches top/bottom */
  word-wrap: break-word;  /* avoid horizontal scrollbar in case of very long words */
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

input, textarea {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 1em;
}

#infobits-app {
  height: 100%;
  display: flex;
  flex-flow: column;
}

#infobits-app #content {
  flex: auto;
  display: flex;
  min-height: 0;
}

.highlight {
  background-color: yellow;
}

.debug {
  font-size: 75%;
  color: grey;
}
</style>
