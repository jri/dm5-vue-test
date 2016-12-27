<template>
  <div id="toolbar">
    <h2>Infobits 2</h2>
    <div id="create-panel">
      <span class="type-name" v-for="(typeDef, type) in typeDefs" @click="newInfobit(type)">
        {{typeDef.name}}
      </span>
    </div>
    <div id="login-state">
      Logged in as {{user}}<br>
      <a href="#">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user
    },
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
  align-items: center;
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

#toolbar #login-state {
  font-size: 75%;
}
</style>
