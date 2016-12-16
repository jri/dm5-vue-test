<template>
  <select v-model="selected">
    <option v-for="user in users">{{user.value}}</option>
  </select>
</template>

<script>
import http from "axios"

export default {
  data() {
    return {
      users: [],
      selected: undefined
    }
  },
  watch: {
    selected: function(username) {
      this.$root.$emit("select-user", username)
    }
  },
  created() {
    http.get("/core/topic/by_type/dm4.accesscontrol.username")
      .then(response => this.users = response.data)
  }
}
</script>
