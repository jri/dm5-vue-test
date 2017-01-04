<template>
  <div id="infobits-app" :style="{cursor: cursor}">
    <toolbar></toolbar>
    <infobits-content></infobits-content>
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
    "toolbar":          require("./toolbar.vue"),
    "infobits-content": require("./infobits-content.vue"),
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

#app {
  height: 100%;
}

#infobits-app {
  height: 100%;
  display: flex;
  flex-flow: column;
}

.highlight {
  background-color: yellow;
}

.clickable:hover {
  color: #0cf;    /* should match Quill styles in html-field.vue (3x) */
  cursor: pointer;
}

.fa {
  color: #aaa;
}

.clickable:hover > .fa {
  color: #0cf;    /* should match Quill styles in html-field.vue (3x) */
}

.debug {
  font-size: 75%;
  color: gray;
}
</style>
