<template>
  <div v-if="mode=='info'">
    {{model[prop]}}
  </div>
  <div v-else-if="mode=='form'">
    <input v-model="model[prop]" type="number">
  </div>
</template>

<script>
export default {
  props: ["mode", "model", "prop"]
}
</script>
