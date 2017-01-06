<template>
  <div id="toolbar">
    <h2>Infobits 2</h2>
    <div id="create-panel">
      <span class="type-box clickable" v-for="(typeDef, type) in typeDefs" @click="newInfobit(type)">
        <span :class="['fa', iconClass(type)]"></span>
        <span class="type-name">{{typeDef.name}}</span>
      </span>
    </div>
    <div id="login-state">
      Logged in as {{user}}<br>
      <span id="logout-link" class="clickable" @click="logout">Logout</span>
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

#toolbar #create-panel .type-box {
  margin-left: 1.4em;
}

#toolbar #create-panel .type-box .type-name {
  margin-left: 0.2em;
}

#toolbar #login-state {
  font-size: 75%;
}

#toolbar #login-state #logout-link {
  text-decoration: underline;
}
</style>
