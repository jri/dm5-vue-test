<template>
  <div id="inbox">
    <h3>Inbox</h3>
    <ul>
      <li v-for="infobit in infobits" :class="{highlight: isSelected(infobit.id)}" @click="setSelected(infobit.id)">
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
  },
  methods: {
    isSelected: function(infobitId) {
      return this.$store.state.infobitId == infobitId
    },
    setSelected: function(infobitId) {
      this.$store.commit("setSelected", infobitId)
    }
  }
}
</script>

<style>
#inbox {
  flex-basis: 30%;
  overflow: auto;
  background-color: white;
  word-wrap: break-word;  /* avoid horizontal scrollbar in case of long words */
}
</style>
