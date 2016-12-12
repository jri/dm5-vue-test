import Vue from "vue"
import LoginDialog from "./components/login-dialog.vue"
import UserSelect  from "./components/user-select.vue"
import Inbox       from "./components/inbox.vue"

new Vue({
  el: "#app",
  components: {
    LoginDialog,
    UserSelect,
    Inbox
  }
})
