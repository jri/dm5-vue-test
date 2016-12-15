<template>
  <div v-if="mode == 'info'">{{value}}</div>
</template>

<script>
export default {
  props: ["mode", "value"]
}
</script>
