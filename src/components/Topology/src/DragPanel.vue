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
    secondTitle: {
      type: String,
      required: false,
      default: () => { return "设备列表" }
    },
    shapeList: {
      type: Array,
      // required: true,
      default: () => {
        return [{
          id: 1,
          summary: '基础形状',
          status: 'closed',
          children: [
            {
              id: 1,
              name: 'rect',
              label: '矩形',
              icon: 'y-material-symbols-light:square-outline',
              isTopo: false
            },
            {
              id: 2,
              name: 'square',
              label: '圆角矩形',
              icon: 'y-material-symbols-light:square-outline-rounded',
              isTopo: false
            },
            {
              id: 3,
              name: 'line',
              label: '直线',
              icon: 'y-tabler:slash',
              isTopo: false
            },
            {
              id: 4,
              name: 'arrow',
              label: '箭头',
              icon: 'y-mynaui:arrow-long-up-right',
              isTopo: false
            }

          ]
        }, {
          id: 2,
          summary: '拓扑形状',
          status: 'closed',
          children: [
            {
              id: 1,
              name: 'router',
              label: '路由器',
              icon: 'y-solar:wi-fi-router-minimalistic-linear',
              isTopo: true
            },
            {
              id: 2,
              name: 'switch',
              label: '交换机',
              icon: 'y-clarity:network-switch-outline-badged',
              isTopo: true
            },
            {
              id: 3,
              name: 'server',
              label: '服务器',
              icon: 'y-solar:server-2-line-duotone',
              isTopo: true
            },
            {
              id: 4,
              name: 'pc',
              label: '电脑',
              icon: 'y-majesticons:desktop-computer-line',
              isTopo: true
            },
            {
              id: 5,
              name: 'laptop',
              label: '笔记本电脑',
              icon: 'y-material-symbols-light:computer-outline',
              isTopo: true
            },
            {
              id: 6,
              name: 'mobile',
              label: '手机',
              icon: 'y-circum:mobile-3',
              isTopo: true
            },
            {
              id: 7,
              name: 'firewall',
              label: '防火墙',
              icon: 'y-mdi:wall-fire',
              isTopo: true
            },
            {
              id: 8,
              name: 'wifi',
              label: '无线网络',
              icon: 'y-material-symbols-light:wifi-sharp',
              isTopo: true
            }
          ]
        }]
      }
    },
    deviceTreeList: {
      type: Array,
      required: false,
      default: () => {
        return [
          {
            id: 1,
            type: "",
            text: "Node1",
            children: []
          },
          {
            id: 2,
            type: "",
            text: "Node2",
            children: []
          }
        ];
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
        // dndContainer: this.$refs.ShapeContainer,
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
      console.log(`[LOG-LINE-145]_[20:18:19] Output:`, items, e);
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
        return null;
      }
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
    <div row-start-3 row-span-23 col-start-1 col-span-5 w-full h-full z-99
      class=" bg-dark-400/50 border-r-2 border-r-solid border-dark-400 backdrop-blur" v-show="sideState">
      <div h-full flex flex-col justify-between>
        <!-- 图形列表开始 -->
        <div flex flex-col>
          <!-- 
            TIPS: 使用<details>标签和<summary>标签实现下拉列表，详情见:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
           -->
          <details ref="ShapeContainer" v-for="(shape, index) in shapeList" @toggle="toggleState($event, shape)"
            :key="shape.id" w-full>
            <summary list-none px-2 py-1 mx-2 text-neutral-500 select-none rounded :class="{ 'm-t-2': index === 0 }"
              class="hover:outline-neutral-600/30 hover:outline hover:outline-1 hover:bg-neutral-800/30 hover:backdrop-blur hover:text-neutral-400">
              {{ shape.summary }}
              <i class="align-middle"
                :class="shape.status === 'open' ? 'y-icon-park-solid:down-one' : 'y-icon-park-solid:right-one'"></i>
            </summary>
            <div flex flex-wrap justify-start mx-2 m-t-2 min-h-20>
              <template v-if="shape.children">
                <div v-for="i in shape.children" @mousedown="startDrag(i, $event)" w-10 h-10 mx-2 my-2 bg-gradient-to-t
                  from-dark-800 to-dark-300 rounded flex justify-center items-center outline outline-2 outline-dark-100>
                  <a-tooltip :title="i.label" :mouseEnterDelay="0.5" placement="bottom">
                    <i class="w-3/4 h-3/4" :class="i.icon"></i>
                  </a-tooltip>
                </div>
              </template>
            </div>
          </details>
        </div>
        <!-- 图形列表结束 -->
        <!-- 设备列表下拉开始 -->
        <div>
          <details class="w-full">
            <summary
              class="list-none px-4 py-2 border-t-solid border-t-2 border-dark-400 text-neutral-500 hover:bg-neutral-800/30 hover:backdrop-blur">
              {{ secondTitle }}
            </summary>
            <div min-h-70 mx-2>
              <details>
                <summary class="list-none px-4">test</summary>
                <details>
                  <summary class="list-none px-6">subtitle</summary>
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
