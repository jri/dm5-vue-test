<template>
  <div v-if="mode=='info'" v-html="model[prop]">
  </div>
  <div v-else-if="mode=='form'">
    <textarea v-model="model[prop]" rows="10"></textarea>
  </div>
</template>

<script>
export default {
  props: ["mode", "model", "prop"]
}
</script>
