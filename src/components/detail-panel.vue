<template>
  <div id="detail-panel" :class="mode" v-if="infobit">
    <h3>{{infobit.title}}</h3>
    <!-- Title Field (form mode only) -->
    <div class="field" v-if="formMode">
      <div class="label">{{titleLabel}}</div>
      <text-field class="text-field" :mode="mode" :model="infobit" prop="title">
      </text-field>
    </div>
    <!-- Details -->
    <div class="field" v-for="detailDef in detailDefs">
      <div class="label">{{detailDef.label}}</div>
      <component :is="compName(detailDef)" :class="compName(detailDef)"
        :mode="mode" :model="infobit.details" :prop="detailDef.prop">
      </component>
    </div>
    <!-- Meta Data -->
    <div class="field" v-if="infoMode">
      <div class="label">Created: {{infobit.created | datetime}}</div>
      <div class="label">Creator: {{infobit.creator}}</div>
    </div>
    <!-- Button -->
    <button :class="['submit', {clickable: buttonEnabled}]" :disabled="!buttonEnabled" @click="buttonAction">
      {{buttonLabel}}
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    infobit() {
      return this.detailPanel.infobit
    },
    editable() {
      return this.detailPanel.editable
    },
    detailPanel() {
      return this.$store.state.detailPanel
    },
    detailDefs() {
      return this.typeDef.detailDefs
    },
    titleLabel() {
      return this.typeDef.titleLabel
    },
    mode() {
      return this.detailPanel.mode
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
    },
    buttonEnabled() {
      return this.formMode || this.editable
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
  },
  filters: {
    datetime: function(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  },
  components: {
    "text-field":   require("./data-fields/text-field.vue"),
    "number-field": require("./data-fields/number-field.vue"),
    "html-field":   require("./data-fields/html-field.vue")
  }
}
</script>

<style>
#detail-panel {
  flex-basis: 30%;
  overflow: auto;
  box-sizing: border-box;
  padding-left: 1em;
  padding-right: 1em;
}

#detail-panel .field {
  margin-top: 1em;
}

#detail-panel .field > .label {
  font-size: 75%;
  color: gray;
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
