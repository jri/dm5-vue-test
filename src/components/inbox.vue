<template>
  <div id="inbox">
    <h3>Inbox</h3>
    <ul v-dragula="infobits" bag="infobits">
      <li v-for="infobit in infobits" :key="infobit.id" :class="{highlight: isSelected(infobit.id)}"
                                                        @click="select(infobit.id)">
        <infobit :infobit="infobit" @remove="remove"></infobit>
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
    },
    remove: function(infobitId) {
      this.$store.dispatch("removeInfobitFromInbox", infobitId)
    }
  },
  components: {
    infobit: require("./infobit.vue")
  }
}
</script>

<style>
#inbox {
  flex-basis: 30%;
  overflow: auto;
}
</style>
