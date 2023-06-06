<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 14:46:20
 * @LastEditTime : 2023-06-06 15:45:22
 * @LastEditors  : ya2glu
 * @Description  : SideBar
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/SidePanel.vue
-->
<template>
  <transition name="slide-fade">
    <div class="side-container" v-show="sideState">侧边栏</div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data() {
      return {}
    },
    computed: {
      ...mapState({
        sideState: state => state.titleBar.sideToggle,
      }),
    },
    mounted() {
      // console.log('toggleSide', this.$store.state.titleBar.sideToggle)
    },
  }
</script>
<style lang="less">
  .side-container {
    grid-row: 2 / span 22;
    grid-column: 1 / span 11;
    z-index: 99;

    border-radius: 20px;
    box-shadow: 2px 2px 8px 3px #0d0d0d;
    backdrop-filter: blur(10px);
    background-color: rgba(31, 31, 31, 0.3);

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
    transform: translateX(10px);
    opacity: 0;
  }
</style>
