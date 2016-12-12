import Vue from "vue"
import LoginDialog from "./components/login-dialog.vue"
import TreePanel   from "./components/tree-panel.vue"
import Inbox       from "./components/inbox.vue"

new Vue({
  el: "#app",
  components: {
    LoginDialog,
    TreePanel,
    Inbox
  }
})
