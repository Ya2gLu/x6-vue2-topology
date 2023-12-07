<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-26 17:56:29
 * @LastEditTime : 2023-09-04 19:34:00
 * @LastEditors  : ya2glu
 * @Description  : 图标拖拽面板
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\DragPanel.vue
-->
<template>
  <transition name="slide-fade">
    <div ref="dnd-container" class="wrapper flex flex-wrap content-start gap-4 p-2 border-r-2 border-r-solid border-dark-400 " v-show="sideState"> drag panel</div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import { Dnd } from "@antv/x6-plugin-dnd"
import { TopoNode, topoRegister } from "./utils/registerShape"
import { Graph } from "@antv/x6";
topoRegister()
export default {
  components: {
    TopoNode
  },
  props: {
    graph: {
      type: Graph,
      required: true
    },
  },
  data() {
    return {
      dnd: null,
    };
  },
  computed: {
    ...mapState({
      sideState: (state) => state.titleBar.dragToggle,
    }),
  },
  methods: {
    initDnd() {
      this.dnd = new Dnd({
        target: this.graph,
        dndContainer: this.$refs.dndContainer,
        // 拖拽开始时，获取被拖拽的节点
        getDragNode: (node) => {
          return node.clone();
        }
      })
    },
  },
  mounted() {
    this.initDnd();
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  grid-row: 1 / span 24;
  grid-column: 1 / span 24;
  z-index: 99;

  background-color: rgba(31, 31, 31, .5);
  backdrop-filter: blur(10px);
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
  transform: translateX(-10px);
  opacity: 0;
}
</style>
