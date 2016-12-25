<template>
  <div v-if="mode=='info'" v-html="model[prop]">
  </div>
  <div v-else-if="mode=='form'">
    <quill-editor v-model="model[prop]" :config="quillConfig"></quill-editor>
  </div>
</template>

<script>
export default {
  props: ["mode", "model", "prop"],
  data() {
    return {
      quillConfig: {
        modules: {
          toolbar: [
            ["bold", "italic", "blockquote", "code-block"],
            [{"list": "ordered"}, {"list": "bullet"}],
            [{"header": [1, 2, 3, false]}],
            ["link", "image", "video"]
          ]
        },
        placeholder: undefined
      }
    }
  },
  components: {
    "quill-editor": require("vue-quill-editor/editor.vue")
  }
}
</script>
