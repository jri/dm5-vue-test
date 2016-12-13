<template>
  <div id="detail-panel">
    <h3>Detail Panel</h1>
  </div>
</template>

<script>
export default {
  watch: {
    "$root.$data.infobitId": function(newId) {
      console.log("### detail-panel: infobitId", newId)
    }
  }
}
</script>

<style>
#detail-panel {
  flex: auto;
  overflow: auto;
  background-color: #eef;
}
</style>
