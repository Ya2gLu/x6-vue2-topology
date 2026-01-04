<script>
import { mapState } from "vuex";
import { Dnd } from "@antv/x6-plugin-dnd"
import { TopoNode, topoRegister } from "./utils/registerShape"
import { Graph } from "@antv/x6";
import { shapeList as mockShapeList, deviceTreeList as mockDeviceTreeList } from "./mock/dragData"
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
    secondTitle: {
      type: String,
      required: false,
      default: () => { return "设备列表" }
    },
    shapeList: {
      type: Array,
      // required: true,
      default: () => {
        return mockShapeList
      }
    },
    deviceTreeList: {
      type: Array,
      required: false,
      default: () => {
        return mockDeviceTreeList
      }
    }
  },
  data() {
    return {
      dnd: null,
      status: null,
      cIndex: -1,
    };
  },
  computed: {
    ...mapState({
      sideState: (state) => state.titleBar.dragToggle,
    }),
  },
  methods: {
    /**
     * 初始化拖拽
     */
    initDnd() {
      this.dnd = new Dnd({
        target: this.graph,
        dndContainer: this.$refs.ShapeContainer,
        // 拖拽开始时，获取被拖拽的节点
        getDragNode: (node) => {
          return node.clone();
        }
      })
    },
    /**
     * 拖拽开始时，获取被拖拽的节点 
     * @param {object} items 拖拽元素
     * @param {$event} e 鼠标事件
     * @description 拖拽开始时，获取被拖拽的节点
     */
    startDrag(items, e) {
      let node = {};
      if (items.isTopo) {
        node = this.graph.createNode({
          shape: 'topo-vue-node',
          component: TopoNode,
          width: 66,
          height: 66,
          data: {
            record: items
          },
          ports: {
            items: [
              {
                group: "top",
                args: {
                  dx: 1.5,
                  dy: 2,
                },
              },
              {
                group: "bottom",
                args: {
                  dx: 1.5,
                  dy: -2,
                },
              },
              {
                group: "left",
                args: {
                  dx: 2,
                },
              },
              {
                group: "right",
                args: {
                  dx: -2,
                },
              },

            ]
          }
        })
        return this.dnd.start(node, e);
      } else {
        //TODO: 基础形状的图形节点
        console.log('基础形状', items);
        return items.name == '' ? console.error('shape参数名为空！') : this.createBaseShape(items.name);
      }
    },

    createBaseShape(shapeName) {
      if (shapeName == "" || shapeName.length == 0) return;
      const that = this;
      const ShapeType = {
        rect: rightAngleRect,
        square: radiusRect,
        line: noLine,
        arrow: ArrowLine
      }

      function rightAngleRect() {
        console.log('rect..');
        // that.graph.addNode({})
      };

      function radiusRect() {
        console.log('square.');
      };

      function noLine() {
        console.log('line...');
      };

      function ArrowLine() {
        console.log('Arrow...');
      };

      const handleShape = ShapeType[shapeName]
      return handleShape();
    },

    /**
     * 下拉内容显示切换
     * @param {$event} e 标签内置事件
     * @param {object} record 当前点击项
     */
    toggleState(e, record) {
      return record.status = e.newState
    },
  },
  mounted() {
    this.initDnd();
  },
}
</script>

<template>
  <transition name="slide-fade">
    <div ref="ShapeContainer" row-start-3 row-span-23 col-start-1 col-span-5 w-full h-full z-99
      class="bg-[linear-gradient(135deg,rgba(30,30,30,0.85)_0%,rgba(20,20,20,0.9)_100%)] border-r-2 border-r-solid border-white/10 backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
      v-show="sideState">
      <div h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden>
        <!-- 图形列表开始 -->
        <div flex flex-col>
          <!-- 
            TIPS: 使用<details>标签和<summary>标签实现下拉列表，详情见:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
           -->
          <details v-for="(shape, index) in shapeList" @toggle="toggleState($event, shape)" :key="shape.id" w-full
            class="group">
            <summary :class="[
              'list-none px-3 py-2 mx-2 text-neutral-400 select-none rounded-lg cursor-pointer',
              'transition-all duration-300 ease-out will-change-[background-color,color,transform]',
              'hover:bg-white/5 hover:text-neutral-300 hover:translate-x-1',
              'active:scale-[0.98]',
              index === 0 ? 'mt-2' : ''
            ]">
              <span class="flex items-center justify-between">
                <span class="font-medium">{{ shape.summary }}</span>
                <i :class="[
                  'align-middle transition-transform duration-300 ease-out will-change-transform',
                  shape.status === 'open' ? 'y-icon-park-solid:down-one rotate-0' : 'y-icon-park-solid:right-one rotate-0'
                ]"></i>
              </span>
            </summary>
            <div class="flex flex-wrap justify-start mx-2 mt-2 mb-3 min-h-20 transition-all duration-300 ease-out"
              :class="shape.status === 'open' ? 'opacity-100' : 'opacity-0'">
              <template v-if="shape.children">
                <div v-for="i in shape.children" @mousedown="startDrag(i, $event)" :class="[
                  'w-10 h-10 mx-2 my-2 rounded-lg flex justify-center items-center cursor-grab active:cursor-grabbing',
                  'bg-gradient-to-br from-white/10 to-white/5 border border-white/10',
                  'transition-all duration-300 ease-out will-change-[transform,background-color,border-color,box-shadow]',
                  'hover:scale-110 hover:bg-gradient-to-br hover:from-white/20 hover:to-white/10',
                  'hover:border-white/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset]',
                  'active:scale-95'
                ]">
                  <a-tooltip :title="i.label" :mouseEnterDelay="0.3" placement="right">
                    <i :class="['w-3/4 h-3/4 text-white/90 transition-transform duration-300 ease-out', i.icon]"></i>
                  </a-tooltip>
                </div>
              </template>
            </div>
          </details>
        </div>
        <!-- 图形列表结束 -->
        <!-- 设备列表下拉开始 -->
        <div class="border-t border-white/10">
          <details class="w-full group">
            <summary :class="[
              'list-none px-4 py-3 text-neutral-400 cursor-pointer',
              'transition-all duration-300 ease-out will-change-[background-color,color]',
              'hover:bg-white/5 hover:text-neutral-300'
            ]">
              <span class="flex items-center justify-between font-medium">
                <span>{{ secondTitle }}</span>
                <i
                  class="y-icon-park-solid:down-one align-middle transition-transform duration-300 ease-out group-open:rotate-180"></i>
              </span>
            </summary>
            <div class="min-h-70 mx-2 py-2 transition-all duration-300 ease-out">
              <details class="group/sub">
                <summary
                  :class="['list-none px-4 py-2 text-neutral-500 cursor-pointer rounded-lg transition-all duration-300 ease-out hover:bg-white/5 hover:text-neutral-400']">
                  test</summary>
                <details class="group/sub2">
                  <summary
                    :class="['list-none px-6 py-1.5 text-neutral-500 cursor-pointer rounded-lg transition-all duration-300 ease-out hover:bg-white/5 hover:text-neutral-400']">
                    subtitle</summary>
                </details>
              </details>
            </div>
          </details>
        </div>
        <!-- 设备列表下拉结束 -->
      </div>
    </div>
  </transition>
</template>
<style lang="less" scoped>
.slide-fade-enter-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
}

.slide-fade-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 1, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 1, 1);
  will-change: transform, opacity;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 优化滚动条样式 */
:deep(.overflow-y-auto) {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

:deep(.overflow-y-auto)::-webkit-scrollbar {
  width: 6px;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
