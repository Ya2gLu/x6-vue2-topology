<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 14:46:20
 * @LastEditTime : 2023-12-22 14:01:52
 * @LastEditors  : ya2glu
 * @Description  : SideBar
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\SidePanel.vue
-->
<template>
  <transition name="slide-fade">
    <div w-full h-full row-start-3 row-span-23 col-start-19 col-span-7 
      class="border-l-2 border-l-solid border-dark-400 bg-dark-400/50 backdrop-blur" v-show="sideState">
      <div class="side-container " >side panel</div>
    </div>
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
      sideState: (state) => state.titleBar.sideToggle,
    }),
  },
  mounted() {
    // console.log('toggleSide', this.$store.state.titleBar.sideToggle)
  },
};
</script>
<style lang="less" scoped>
.side-container {
  grid-row: 1 / span 24;
  grid-column: 2 / span 23;
  z-index: 99;

  // border-radius: 20px;
  // box-shadow: 2px 2px 8px 3px #0d0d0d;
  backdrop-filter: blur(10px);
  background-color: rgba(31, 31, 31, .5);

  padding: 10px;
  // border-left: 2px solid #fff
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to

/* .slide-fade-leave-active for below version 2.1.8 */
  {
  transform: translateX(10px);
  opacity: 0;
}</style>
