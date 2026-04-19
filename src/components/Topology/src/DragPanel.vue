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
      class="drag-panel-shell"
      v-show="sideState">
      <div h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden>
        <!-- 图形列表开始 -->
        <div flex flex-col>
          <!-- 
            TIPS: 使用<details>标签和<summary>标签实现下拉列表，详情见:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
           -->
          <details v-for="(shape, index) in shapeList" @toggle="toggleState($event, shape)" :key="shape.id" w-full
            class="group drag-panel-details">
            <summary :class="[
              'drag-panel-summary list-none px-3 py-2 mx-2 select-none rounded-lg cursor-pointer',
              'transition-all duration-300 ease-out will-change-[background-color,color,transform]',
              'hover:translate-x-1',
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
                  'drag-panel-tile w-10 h-10 mx-2 my-2 rounded-lg flex justify-center items-center cursor-grab active:cursor-grabbing',
                  'transition-all duration-300 ease-out will-change-[transform,background-color,border-color,box-shadow]',
                  'hover:scale-110',
                  'active:scale-95'
                ]">
                  <a-tooltip :title="i.label" :mouseEnterDelay="0.3" placement="right">
                    <i :class="['drag-panel-tile-icon w-3/4 h-3/4 transition-transform duration-300 ease-out', i.icon]"></i>
                  </a-tooltip>
                </div>
              </template>
            </div>
          </details>
        </div>
        <!-- 图形列表结束 -->
        <!-- 设备列表下拉开始 -->
        <div class="drag-panel-divider border-t border-solid">
          <details class="drag-panel-details w-full group">
            <summary :class="[
              'drag-panel-summary list-none px-4 py-3 cursor-pointer',
              'transition-all duration-300 ease-out will-change-[background-color,color]'
            ]">
              <span class="flex items-center justify-between font-medium">
                <span>{{ secondTitle }}</span>
                <i
                  class="y-icon-park-solid:down-one align-middle transition-transform duration-300 ease-out group-open:rotate-180"></i>
              </span>
            </summary>
            <div class="min-h-70 mx-2 py-2 transition-all duration-300 ease-out">
              <details class="drag-panel-details group/sub">
                <summary
                  :class="['drag-panel-summary drag-panel-summary-sub list-none px-4 py-2 cursor-pointer rounded-lg transition-all duration-300 ease-out']">
                  test</summary>
                <details class="drag-panel-details group/sub2">
                  <summary
                    :class="['drag-panel-summary drag-panel-summary-sub list-none px-6 py-1.5 cursor-pointer rounded-lg transition-all duration-300 ease-out']">
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
.drag-panel-shell {
  background: var(--panel-bg);
  border-right: 2px solid var(--panel-edge);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: var(--panel-shadow-drag);
}

.drag-panel-summary {
  color: var(--panel-icon-muted);
  &:hover {
    color: var(--panel-icon);
    background: var(--panel-summary-hover-bg);
  }
}

.drag-panel-summary-sub {
  opacity: 0.95;
}

.drag-panel-tile {
  background: var(--panel-tile-bg);
  border: 1px solid var(--panel-tile-border);
  &:hover {
    background: var(--panel-tile-hover-bg);
    border-color: var(--panel-tile-hover-border);
    box-shadow: var(--panel-tile-hover-shadow);
  }
}

.drag-panel-tile-icon {
  color: var(--panel-icon);
}

.drag-panel-divider {
  border-top-color: var(--panel-divider);
  border-bottom-color: var(--panel-divider);
  border-left-color: var(--panel-divider);
  border-right-color: var(--panel-divider);
  border-top-width: 1px;
  border-bottom-width: 0px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-style: solid;
}

.drag-panel-details {
  border: none;
  outline: none;
  box-shadow: none;
}

.drag-panel-details > summary {
  border: none;
  outline: none;
  list-style: none;
  appearance: none;
  &::-webkit-details-marker {
    display: none;
  }
  &::marker {
    content: none;
  }
  &:focus,
  &:focus-visible {
    outline: none;
  }
}

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
  scrollbar-color: var(--panel-scrollbar-thumb) transparent;
}

:deep(.overflow-y-auto)::-webkit-scrollbar {
  width: 6px;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-track {
  background: transparent;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-thumb {
  background-color: var(--panel-scrollbar-thumb);
  border-radius: 3px;
  transition: background-color 0.3s ease;
}

:deep(.overflow-y-auto)::-webkit-scrollbar-thumb:hover {
  background-color: var(--panel-scrollbar-thumb-hover);
}
</style>
