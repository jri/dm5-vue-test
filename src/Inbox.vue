<template>
  <div id="inbox">
    <ul>
      <li v-for="infobit in infobits">{{infobit.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infobits: [
        {
          title: "TTIP"
        },
        {
          title: "Demokratie"
        }
      ]
    }
  }
}
</script>

<style>
</style>
