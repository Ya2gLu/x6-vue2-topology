<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-26 17:56:29
 * @LastEditTime : 2023-06-26 18:19:26
 * @LastEditors  : ya2glu
 * @Description  : 图标拖拽面板
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/DragPanel.vue
-->
<template>
  <transition name="slide-fade">
    <div class="wrapper" v-show="sideState">拖拽栏</div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sideState: (state) => state.titleBar.dragToggle,
    }),
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.wrapper {
  grid-row: 2 / span 23;
  grid-column: 1 / span 24;
  z-index: 99;

  background-color: rgba(31, 31, 31, 1);
  padding: 10px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
