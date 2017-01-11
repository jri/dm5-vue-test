<template>
  <div class="spinner">
    <span class="fa fa-circle-o-notch fa-spin fa-2x" v-if="show"></span>
  </div>
</template>

<script>
export default {
  props: ["show"]
}
</script>

<style>
.spinner {
  margin-top: 1em;
}
</style>