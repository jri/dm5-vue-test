<template>
  <!-- Note: for 2-way binding to work with store state the easiest way
       is to go through the parent object (treePanel) in the binding -->
  <select class="clickable" v-model="treePanel.selectedUser">
    <option v-for="user in users">{{user.value}}</option>
  </select>
</template>

<script>
export default {
  computed: {
    treePanel: function() {
      return this.$store.state.treePanel
    },
    users: function() {
      return this.treePanel.users
    }
  }
}
</script>
