<template>
  <div id="toolbar">
    <h2>Infobits 2</h2>
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

#toolbar > h2 {
  flex: auto;
  margin: 0;
}
</style>
