<template>
  <div id="inbox">
    <h3>Inbox</h3>
    <ul>
      <li v-for="infobit in infobits" @click="$root.$data.infobitId = infobit.id"
                                      :class="{highlight: $root.$data.infobitId == infobit.id}">
        {{infobit.title}}
      </li>
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
#inbox {
  flex-basis: 30%;
  overflow: auto;
  background-color: white;
}
</style>
