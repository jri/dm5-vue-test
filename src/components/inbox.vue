<template>
  <div>
    <ul>
      <li v-for="infobit in infobits">{{infobit.title}}</li>
    </ul>
  </div>
</template>

<script>
import http from "axios"

export default {
  data() {
    return {
      infobits: []
    }
  },
  created() {
    http.get("/infobits/inbox")
      .then(response => this.infobits = response.data.infobits)
  }
}
</script>

<style>
</style>
