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
      .then(response => {
        console.log("Login OK", this.username)
        this.message = "Login OK"
        this.$router.push("/infobits")
      })
      .catch(error => {
        console.log("Login failed", error)
        this.message = "Login failed"
      })
    }
  }
}
</script>
