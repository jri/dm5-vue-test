<template>
  <div>
    Login
    <input v-model="username" @keyup.enter="submit">
    <input v-model="password" @keyup.enter="submit">
    <span>{{message}}</span>
  </div>
</template>

<script>
import http from "axios"

export default {
  data() {
    return {
      username: "",
      password: "",
      message: ""
    }
  },
  methods: {
    submit() {
      http.post("/accesscontrol/login", undefined, {auth: {
        username: this.username,
        password: this.password
      }})
      .then(response => this.message = "Login OK")
      .catch(error   => this.message = "Login failed")
    }
  }
}
</script>
