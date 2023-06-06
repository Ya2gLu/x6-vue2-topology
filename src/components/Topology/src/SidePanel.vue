<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 14:46:20
 * @LastEditTime : 2023-06-05 17:43:49
 * @LastEditors  : ya2glu
 * @Description  : SideBar
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/SidePanel.vue
-->
<template>
  <div class="side-container">侧边栏</div>
</template>

<script>
  export default {
    data() {
      return {}
    },
  }
</script>
<style lang="less">
  .side-container {
    grid-row: 2 / span 22;
    grid-column: 1 / span 11;
    z-index: 99;

    border-radius: 20px;
    box-shadow: 2px 2px 8px 5px #0d0d0d;
    backdrop-filter: blur(10px);
    background-color: rgba(31, 31, 31, 0.3);

    padding: 10px;
  }
</style>
