<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-26 17:56:29
 * @LastEditTime : 2023-06-28 11:47:57
 * @LastEditors  : ya2glu
 * @Description  : 图标拖拽面板
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/DragPanel.vue
-->
<template>
  <transition name="slide-fade">
    <div ref="dnd-container" class="wrapper flex flex-wrap content-start gap-4 p-2" v-show="sideState">
      <div v-for="(item, i) in nodeList" :key="i">
        <a-tooltip :title="item.label" :mouseEnterDelay="0.5" placement="bottom">
          <div class="bg-dark-800 flex justify-center items-center h-64px w-64px rounded-2xl cursor-pointer" @mousedown="startDrag(item.type, $event)">
            <div :class="item.type" class="p-4 bg-light-200"></div>
          </div>
        </a-tooltip>
      </div>
    </div>
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
    nodeList: {
      type: Array,
      default: () => {
        return [
          {
            key: 'computer',
            type: 'y-ri:computer-line',
            label: '客户端'
          },
          {
            key: 'server',
            type: 'y-ri:server-line',
            label: '服务器'
          },
          {
            key: 'router',
            type: 'y-tabler:router',
            label: '路由器',
          },
          {
            key: 'disk',
            type: 'y-carbon:vmdk-disk',
            label: '硬盘',
          },
          {
            key: 'terminal',
            type: 'y-solar:programming-outline',
            label: '终端',
          },
        ]
      }
    }
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
    // 开始拖拽时显示拖拽节点
    startDrag(type, $event) {
      console.log("startDrag -->", type, $event);
      // 创建节点，需要指定节点宽高，不然不会显示拖拽节点
      const node = this.graph.createNode({
        shape: "topo-vue-node",
        component: TopoNode,
        width: 64,
        height: 64,
        data: {
          types: type
        },
        // ports连接桩
        ports: {
          items: [
            {
              group: "top",
              args: {
                dx: 1.5,
                dy: -1.5,
              },
            },
            {
              group: "bottom",
              args: {
                dx: 1.5,
                dy: 5,
              },
            },
            {
              group: "left",
              args: {
                dx: -1.5,
              },
            },
            {
              group: "right",
              args: {
                dx: 5,
              },
            },
          ],
        },
      });

      return this.dnd.start(node, $event);
    }
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

  background-color: rgba(31, 31, 31, 1);
  // padding: 10px;
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
