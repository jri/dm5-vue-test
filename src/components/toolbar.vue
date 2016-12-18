<template>
  <div id="toolbar">
    <h2>Infobits 2</h2>
    <div id="create-panel">
      <a class="type-name" v-for="(typeDef, type) in types" @click="newInfobit(type)" href="#">
        {{typeDef.name}}
      </a>
    </div>
    <login-dialog id="login"></login-dialog>
  </div>
</template>

<script>
export default {
  components: {
    "login-dialog": require("./login-dialog.vue")
  },
  computed: {
    types() {
      return this.$store.state.types
    }
  },
  methods: {
    newInfobit(type) {
      this.$store.commit("newInfobit", type)
    }
  }
}
</script>

<style>
#toolbar {
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

#toolbar #login {
  margin-left: 3em;
}
</style>
