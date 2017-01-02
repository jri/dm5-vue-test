<template>
  <span :class="['infobit', 'clickable', {highlight: isSelected}, 'fa', iconClass]" @click="select">
    <span class="title">{{infobit.title}}</span>
    <span class="remove-button fa fa-remove" @click="remove"></span>
  </span>
</template>

<script>
export default {
  props: ["infobit", "removeId"],
  computed: {
    isSelected() {
      return this.$store.state.infobitId == this.infobit.id
    },
    iconClass() {
      return "fa-" + this.$store.state.typeDefs[this.infobit.type].icon
    }
  },
  methods: {
    select() {
      this.$store.dispatch("selectInfobit", this.infobit.id)
    },
    remove() {
      this.$emit("remove", this.removeId)
    }
  }
}
</script>

<style>
.infobit {
  position: relative;
}

.infobit .title {
  margin-left: 0.4em;
  line-height: 1.3em;
}

.infobit .remove-button {
  position: absolute;
  bottom: 0;
  right: 0;
  visibility: hidden;
  background-color: white;
}

.infobit:hover .remove-button {
  visibility: visible;
}

.infobit .remove-button:hover {
  background-color: lightgray;
}
</style>
