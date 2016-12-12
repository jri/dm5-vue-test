<template>
  <div id="toolbar">
    <h1>Infobits 2</h1>
    <login-dialog></login-dialog>
  </div>
</template>

<script>
import LoginDialog from "./login-dialog.vue"

export default {
  components: {
    LoginDialog
  }
}
</script>

<style>
#toolbar {
  display: flex;
  background-color: #eee;
}

#toolbar > h1 {
  flex: auto;
  margin: 0;
}
</style>
