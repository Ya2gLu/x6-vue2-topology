<template>
  <div class="topology-background">this is topology background. you can add some dynamic effects.</div>
</template>

<script>
export default {
  name: 'TopologyBackground'
}
</script>

<style scoped>
.topology-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: auto;
  overflow: hidden;
}
</style>
