<template>
  <span :class="['infobit', {hovered}]" @mouseenter="hovered=true" @mouseleave="hovered=false">
    {{infobit.title}}
    <span class="debug">{{infobit.id}}</span>
    <span class="remove-button" @click="remove">R</span>
  </span>
</template>

<script>
export default {
  props: ["infobit"],
  data() {
    return {
      hovered: false
    }
  },
  methods: {
    remove() {
      this.$emit("remove", this.infobit.id)
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
