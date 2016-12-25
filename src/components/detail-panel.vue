<template>
  <div id="detail-panel" :class="mode" v-if="infobit">
    <h3>{{infobit.title}}</h3>
    <!-- Title Field (form mode only) -->
    <div class="field" v-if="formMode">
      <div class="label">{{titleLabel}}</div>
      <text-field :mode="mode" :model="infobit" prop="title">
      </text-field>
    </div>
    <!-- Details -->
    <div class="field" v-for="detailDef in detailDefs">
      <div class="label">{{detailDef.label}}</div>
      <component :is="compName(detailDef)" :class="compName(detailDef)"
        :mode="mode" :model="infobit.details" :prop="detailDef.prop">
      </component>
    </div>
    <!-- Button -->
    <button class="submit" @click="buttonAction">{{buttonLabel}}</button>
  </div>
</template>

<script>
export default {
  components: {
    "text-field":   require("./data-fields/text-field.vue"),
    "number-field": require("./data-fields/number-field.vue"),
    "html-field":   require("./data-fields/html-field.vue")
  },
  computed: {
    infobit() {
      return this.$store.state.detailPanel.infobit
    },
    detailDefs() {
      return this.typeDef.detailDefs
    },
    titleLabel() {
      return this.typeDef.titleLabel
    },
    mode() {
      return this.$store.state.detailPanel.mode
    },
    infoMode() {
      return this.mode == "info"
    },
    formMode() {
      return this.mode == "form"
    },
    typeDefs() {
      return this.$store.state.typeDefs
    },
    typeDef() {
      return this.typeDefs[this.infobit.type]
    },
    buttonLabel() {
      return this.infoMode ? "Edit" : "Submit"
    }
  },
  methods: {
    compName(detailDef) {
      return detailDef.dataType.toLowerCase() + '-field'
    },
    buttonAction() {
      var action = this.infoMode ? "editInfobit" : "submitInfobit"
      this.$store.dispatch(action)
    }
  }
}
</script>

<style>
#detail-panel {
  flex-basis: 30%;
  overflow: auto;
}

#detail-panel .field {
  margin-top: 1em;
}

#detail-panel .field > .label {
  font-size: 75%;
  color: grey;
}

#detail-panel .field > .text-field   input,
#detail-panel .field > .number-field input {
  width: 100%;
  box-sizing: border-box;
}

#detail-panel.info p {
  margin-top: 0;
  margin-bottom: 0;
}

#detail-panel.info p + p {
  margin-top: 1em;
}

#detail-panel button.submit {
  margin-top: 2em;
}
</style>
