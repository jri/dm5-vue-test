<template>
  <div>
    <h1>Infobits 2</h1>

    <h3>Login</h3>
    <login-dialog></login-dialog>

    <h3>Tree</h3>
    <tree-panel></tree-panel>

    <h3>Inbox</h3>
    <inbox></inbox>
  </div>
</template>

<script>
import LoginDialog from "./login-dialog.vue"
import TreePanel   from "./tree-panel.vue"
import Inbox       from "./inbox.vue"

export default {
  components: {
    LoginDialog,
    TreePanel,
    Inbox
  }
}
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>
