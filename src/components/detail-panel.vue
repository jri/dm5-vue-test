<template>
  <div id="detail-panel" v-if="infobit">
    <h3>{{infobit.title}}</h3>
    <!-- Title -->
    <div class="field" v-if="mode=='form'">
      <div class="label">{{types[infobit.type].titleLabel}}</div>
      <text-field :mode="mode" :model="infobit" prop="title">
      </text-field>
    </div>
    <!-- Details -->
    <div class="field" v-for="detail in types[infobit.type].details">
      <div class="label">{{detail.label}}</div>
      <component :is="compName(detail)"
        :mode="mode" :model="infobit.details" :prop="detail.prop">
      </component>
    </div>
    <!-- Button -->
    <button      v-if="mode=='info'" @click="mode='form'">Edit</button>
    <button v-else-if="mode=='form'" @click="mode='info'; submit()">Submit</button>
  </div>
</template>

<script>
import http from "axios"
import types from "../infobit-types"
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
      types
    }
  },
  methods: {
    compName: function(detail) {
      return detail.dataType.toLowerCase() + '-field'
    },
    submit: function() {
      http.put("/infobits/infobit/" + this.infobit.id, this.infobit)
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
