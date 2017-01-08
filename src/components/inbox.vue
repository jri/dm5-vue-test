<template>
  <div id="inbox">
    <h3>Inbox</h3>
    <ul v-dragula="infobits" bag="infobits">
      <li class="inbox-item" v-for="infobit in infobits" :key="infobit.id">
        <infobit :infobit="infobit">
          <span class="action-button fa fa-fw fa-remove" @click="remove(infobit.id)"></span>
        </infobit>
        <span class="debug">{{infobit.id}}</span>
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
    remove(infobitId) {
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
  box-sizing: border-box;
  padding-left: 1em;
  padding-right: 1em;
}

#inbox ul {
  padding-left: 0;
}

/* Note: rule is independent from DOM structure in order to apply to mirror element as well */
.inbox-item {
  list-style-type: none;
  margin-top: 0.8em;      /* should match "li.tree-node" style in tree-node.vue */
}
</style>
