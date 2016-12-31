<template>
  <div id="toolbar">
    <h2>Infobits 2</h2>
    <div id="create-panel">
      <span :class="['type-name', 'fa', iconClass(type)]" v-for="(typeDef, type) in typeDefs"
            @click="newInfobit(type)">
        {{typeDef.name}}
      </span>
    </div>
    <div id="login-state">
      Logged in as {{user}}<br>
      <a @click.prevent="logout" href="#">Logout</a>
    </div>
  </div>
</template>

<script>
import http from "axios"

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
    iconClass(type) {
      return "fa-" + this.typeDefs[type].icon
    },
    newInfobit(type) {
      this.$store.dispatch("newInfobit", type)
    },
    logout() {
      http.post("/accesscontrol/logout")
      this.$router.push("/login")
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
