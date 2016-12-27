<template>
  <div id="toolbar">
    <h2>Infobits 2</h2>
    <div id="create-panel">
      <a class="type-name" v-for="(typeDef, type) in typeDefs" @click="newInfobit(type)" href="#">
        {{typeDef.name}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    typeDefs() {
      return this.$store.state.typeDefs
    }
  },
  methods: {
    newInfobit(type) {
      this.$store.dispatch("newInfobit", type)
    }
  }
}
</script>

<style>
#toolbar {
  flex: none;
  display: flex;
  align-items: baseline;
  background-color: #f8f8f8;
}

#toolbar h2 {
  margin: 0;
}

#toolbar #create-panel {
  flex: auto;
  margin-left: 3em;
}

#toolbar #create-panel .type-name {
  margin-left: 1em;
}
</style>
