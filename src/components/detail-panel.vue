<template>
  <div id="detail-panel" v-if="infobit">
    <h3>{{infobit.title}}</h3>
    <div class="field" v-for="detail in types[infobit.type].details">
      <div class="label">{{detail.label}}</div>
      <div v-if="detail.dataType == 'Text' ||
                 detail.dataType == 'Number'">
        {{infobit.details[detail.prop]}}
      </div>
      <div v-else-if="detail.dataType == 'HTML'" v-html="infobit.details[detail.prop]">
      </div>
      <div v-else class="error">
        "{{detail.dataType}}" is an unsupported data type
      </div>
  </div>
</template>

<script>
import http from "axios"

export default {
  data() {
    return {
      infobit: undefined,
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

#detail-panel .field > .label {
  font-size: 75%;
  color: grey;
}

#detail-panel .error {
  font-size: 75%;
  color: red;
}
</style>
