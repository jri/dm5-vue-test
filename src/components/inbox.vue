<template>
  <div id="inbox">
    <h3>Inbox</h3>
    <ul v-dragula="infobits" bag="infobits">
      <li v-for="infobit in infobits" :key="infobit.id">
        <div class="content">
          <infobit :infobit="infobit" :removeId="infobit.id" class="infobit" @remove="remove"></infobit>
          <span class="debug">{{infobit.id}}</span>
        </div>
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

#inbox ul > li {
  list-style-type: none;
  margin-top: 0.8em;      /* should match "li.tree-node" style in tree-node.vue */
}

/* Note: the flex content wrapper is needed in conjunction with the infobit icon (pseudo element). */
/* Otherwise work-wrap would not be effective */
#inbox ul > li .content {
  display: flex;
}

#inbox ul > li .content .infobit {
  min-width: 0;     /* make word-wrap effective in a flex layout */
}
</style>
