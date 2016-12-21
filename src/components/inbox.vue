<template>
  <div id="inbox">
    <h3>Inbox</h3>
    <ul>
      <li v-for="infobit in infobits" :class="{highlight: isSelected(infobit.id)}" @click="select(infobit.id)">
        {{infobit.title}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    infobits() {
      return this.$store.getters.sortedInboxInfobits
    }
  },
  methods: {
    isSelected: function(infobitId) {
      return this.$store.state.infobitId == infobitId
    },
    select: function(infobitId) {
      this.$store.dispatch("selectInfobit", infobitId)
    }
  }
}
</script>

<style>
#inbox {
  flex-basis: 30%;
  overflow: auto;
}
</style>
