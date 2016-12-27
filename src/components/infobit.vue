<template>
  <span :class="['infobit', {hovered}]" @click="select"
        @mouseenter="hovered=true" @mouseleave="hovered=false">
    <span :class="{highlight: isSelected}">{{infobit.title}}</span>
    <span class="remove-button" @click="remove">R</span>
  </span>
</template>

<script>
export default {
  props: ["infobit", "removeId"],
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    isSelected() {
      return this.$store.state.infobitId == this.infobit.id
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

.infobit .remove-button {
  position: absolute;
  bottom: 0;
  right: 0;
  visibility: hidden;
}

.infobit.hovered .remove-button {
  visibility: visible;
}
</style>
