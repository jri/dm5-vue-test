<template>
  <div id="detail-panel" v-if="infobit">
    <h3>{{infobit.title}}</h3>
    <!-- Title Field (form mode only) -->
    <div class="field" v-if="formMode">
      <div class="label">{{titleLabel}}</div>
      <text-field :mode="mode" :model="infobit" prop="title">
      </text-field>
    </div>
    <!-- Details -->
    <div class="field" v-for="detail in details">
      <div class="label">{{detail.label}}</div>
      <component :is="compName(detail)"
        :mode="mode" :model="infobit.details" :prop="detail.prop">
      </component>
    </div>
    <!-- Button -->
    <button      v-if="infoMode" @click="edit">Edit</button>
    <button v-else-if="formMode" @click="submit">Submit</button>
  </div>
</template>

<script>
import http from "axios"
import TextField   from "./data-fields/text-field.vue"
import NumberField from "./data-fields/number-field.vue"
import HtmlField   from "./data-fields/html-field.vue"

export default {
  components: {
    TextField, NumberField, HtmlField
  },
  computed: {
    infobit() {
      return this.$store.state.infobit
    },
    details() {
      return this.type.details
    },
    titleLabel() {
      return this.type.titleLabel
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
    types() {
      return this.$store.state.types
    },
    type() {
      return this.types[this.infobit.type]
    }
  },
  methods: {
    compName(detail) {
      return detail.dataType.toLowerCase() + '-field'
    },
    edit() {
      this.$store.commit("editInfobit")
    },
    submit() {
      this.$store.commit("submitInfobit")
    }
  }
}
</script>

<style>
#detail-panel {
  flex-basis: 30%;
  overflow: auto;
  background-color: white;
  word-wrap: break-word;  /* avoid horizontal scrollbar in case of long words */
}

#detail-panel .field {
  margin-top: 1em;
}

#detail-panel .field > .label {
  font-size: 75%;
  color: grey;
}

#detail-panel p {
  margin-top: 0;
  margin-bottom: 0;
}

#detail-panel p + p {
  margin-top: 1em;
}

#detail-panel button {
  margin-top: 2em;
}
</style>
