<template>
  <div id="detail-panel" v-if="infobit">
    <h3>{{infobit.title}}</h3>
    <div class="field" v-for="detail in types[infobit.type].details">
      <div class="label">{{detail.label}}</div>
      <component :is="compName(detail)"
        :mode="mode" :value="infobit.details[detail.prop]">
      </component>
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
  data() {
    return {
      infobit: undefined,
      mode: "info",   // "info" or "form"
      types: {
        "infobits.type.infobit": {
          titleLabel: "Infobit Title",
          details: [
            {
              prop: "text",
              label: "Notes",
              dataType: "HTML"
            }
          ]
        },
        "infobits.type.person": {
          titleLabel: "Person Name",
          details: [
            {
              prop: "birthDate",
              label: "Year of birth",
              dataType: "Number"
            },
            {
              prop: "birthPlace",
              label: "Place of birth",
              dataType: "Text"
            },
            {
              prop: "text",
              label: "Notes",
              dataType: "HTML"
            }
          ]
        },
        "infobits.type.question": {
          titleLabel: "Question",
          details: [
            {
              prop: "text",
              label: "Notes",
              dataType: "HTML"
            }
          ]
        },
        "infobits.type.structural_element": {
          titleLabel: "Structural Element",
          details: [
            {
              prop: "text",
              label: "Notes",
              dataType: "HTML"
            }
          ]
        }
      }
    }
  },
  methods: {
    compName: detail => detail.dataType.toLowerCase() + '-field'
  },
  watch: {
    "$root.$data.infobitId": function(id) {
      http.get("/infobits/infobit/" + id)
        .then(response => this.infobit = response.data)
    }
  }
}
</script>

<style>
#detail-panel {
  flex-basis: 30%;
  overflow: auto;
  background-color: white;
}

#detail-panel .field {
  margin-top: 1em;
}

#detail-panel .field > .label {
  font-size: 75%;
  color: grey;
}
</style>
