<template>
  <span :class="['infobit', 'clickable', {highlight: isSelected}]" @click="select">
    <span :class="['fa', 'fa-fw', iconClass]"></span>
    <span class="title">{{infobit.title}}</span>
    <span class="button-panel">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  props: ["infobit"],
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
    }
  }
}
</script>

<style>
.infobit {
  position: relative;
}

.infobit .title {
  line-height: 1.3em;
}

.infobit .button-panel {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: white;
  visibility: hidden;
}

.infobit:hover .button-panel {
  visibility: visible;
}

.infobit .button-panel .action-button:hover {
  background-color: lightgray;
}
</style>
