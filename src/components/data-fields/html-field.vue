<template>
  <div v-if="mode == 'info'" v-html="value"></div>
</template>

<script>
export default {
  props: ["mode", "value"]
}
</script>
