<template>
  <div v-if="mode=='info'" v-html="model[prop]">
  </div>
  <div v-else-if="mode=='form'">
    <quill-editor v-model="model[prop]"></quill-editor>
  </div>
</template>

<script>
export default {
  props: ["mode", "model", "prop"],
  components: {
    "quill-editor": require("vue-quill-editor/editor.vue")
  }
}
</script>
