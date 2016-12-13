<template>
  <div id="detail-panel" v-if="infobit">
    <h3>{{infobit.title}}</h3>
    <div v-html="infobit.details.text"></div>
  </div>
</template>

<script>
import http from "axios"

export default {
  data() {
    return {
      infobit: undefined
    }
  },
  watch: {
    "$root.$data.infobitId": function(id) {
      http.get("/infobits/infobit/" + id)
        .then(response => this.infobit = response.data)
    }
  }
}
</script>

<style>
#detail-panel {
  flex-basis: 30%;
  overflow: auto;
  background-color: white;
}
</style>
