<script>
import { Dnd } from "@antv/x6-plugin-dnd"
import { TopoNode, topoRegister, ServerNode, serverRegister } from "./utils/registerShape"
import { Graph } from "@antv/x6";
topoRegister()
serverRegister()
export default {
  components: {
    TopoNode,
    ServerNode
  },
  props: {
    graph: {
      type: Graph,
      required: true
    },
    deviceList: {
      type: Array,
      default: () => {
        return [
          {
            type: "routers",
            label: "路由器",
            icon: "y-solar:wi-fi-router-minimalistic-linear",
            list: [{ key: "1", label: "router-n1c1", icon: "y-solar:wi-fi-router-minimalistic-linear", isInteraction: true }, { key: "2", label: "router-n1c2" }, { key: "3", label: "n1c3" }, { key: '4', label: "n1c4" }],
          },
          {
            type: "switches",
            label: "交换机",
            icon: "y-clarity:network-switch-outline-badged",
            list: [{}]
          },
          {
            type: "computers",
            label: "电脑",
            icon: "y-majesticons:desktop-computer-line",
            list: []
          },
          {
            type: "mobiles",
            label: "手机",
            icon: "y-ph:device-mobile-camera-light",
            list: []
          }
        ];
      },
    },
  },
  data() {
    return {
      dnd: null,
      params: {},
      detailList: [], // 设备详情列表
      subTitle: '',
      isShow: false,
      showSearch: false,
      selectionIndex: -1
    };
  },
  computed: {},
  mounted() {
    // 实例化拖拽
    this.initDnd()
  },
  methods: {

    initDnd() {
      this.dnd = new Dnd({
        target: this.graph,
        dndContainer: this.$refs.popover,
        getDragNode: (node) => {
          return node.clone();
        }
      })
    },

    open(items, nodePos) {
      this.params = items;
      this.isShow = true
      this.$nextTick(() => {
        this.setPosition(nodePos);
      });
    },

    close() {
      return (this.isShow = false);
    },

    startDrag(items, e) {
      console.log("drag items -->", items, e);
      let node = {}
      if (items.isInteraction == true) {
        node = this.graph.createNode({
          shape: "server-vue-node",
          component: ServerNode,
          width: 160,
          height: 66,
          data: {
            item: items
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
            ],
          },
        })
      } else {
        node = this.graph.createNode({
          shape: "topo-vue-node",
          component: TopoNode,
          width: 66,
          height: 66,
          data: {
            types: items.icon
          }
        })
      }
      // const label = node.
      return this.dnd.start(node, e);
    },

    setPosition(nodePos) {
      if (!nodePos) {
        return null;
      } else {
        const popover = this.$refs.popover;
        const { x, y, width } = nodePos;
        const pHeight = popover.getBoundingClientRect().height || 364;
        const finalX = x - width - 25;
        const finalY = y - pHeight - 20;
        popover.setAttribute(
          "style",
          `--top: ${finalY}px; --left: ${finalX}px`
        );
      }
    },

    handleDeviceClick(items, idx) {
      this.selectionIndex = idx
      this.subTitle = items.label
      //TODO: 处理图标：图标设置成前端处理，遍历动态添加，后端不用维护
      this.detailList = items.list
    },

    handleScrollX(event) {
      const content = this.$refs.contentXRef
      const delta = Math.sign(event.deltaY)
      content.scrollLeft += delta * 10
    },

    toggleSearch() {
      this.showSearch = !this.showSearch
      if (this.showSearch == true) {
        this.$nextTick(() => {
          this.$refs.searchRef.focus()
        })
      }
    },

  },
};
</script>
<template>
  <transition name="slide-fade" mode="out-in">
    <div ref="popover" class="wrapper w-18em h-26em bg-dark-400 z-99 rounded-2xl" v-show="isShow">
      <div class="p-2">
        <div ref="contentXRef" class="flex overflow-x-hidden rounded-2xl" @wheel="handleScrollX">
          <div v-for="(items, idx) in deviceList" :key="idx"
            class="bg-dark-800 w-64px h-64px mx-1 mb-2 flex flex-shrink-0 justify-center items-center rounded-2xl cursor-pointer"
            @click="handleDeviceClick(items, idx)" :class="{ active: idx === selectionIndex }">
            <div :class="items.icon" class="p-4"></div>
          </div>
        </div>
        <div class="border-t-2 border-t-solid border-t-dark-50"></div>
        <div class="flex justify-between items-center my-1">
          <div>{{ subTitle }}</div>
          <div class="flex items-center justify-center h-8">
            <transition name="search">
              <input ref="searchRef" v-if="showSearch" name="search" placeholder="请输入搜索关键字"
                class="search-box bg-transparent w-0 h-8 pl-3 border-dark-800 outline-none border-2 border-solid rounded-xl" />
            </transition>
            <i class="y-iconamoon:search p-3 cursor-pointer absolute right-3.5" @click="toggleSearch"></i>
          </div>
        </div>
        <div class="h-17em overflow-y-scroll rounded-2xl">
          <div v-for="items in detailList"
            class="flex h-64px my-2 mr-1 bg-dark-800 rounded-2xl items-center cursor-pointer border-1"
            @mousedown="startDrag(items, $event)">
            <div class="px-4">
              <div class="y-solar:wi-fi-router-minimalistic-linear p-4"></div>
            </div>
            <div>{{ items.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style lang="less" scoped>
.active {
  background-color: #3A78DB;
}

.wrapper {
  position: fixed;
  top: var(--top);
  left: var(--left);
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.search-box {
  width: 10rem;
  transition: width 0.3s ease;
}

.search-enter {
  width: 0;
}

.search-enter-to {
  width: 10rem;
}

.search-enter-active,
.search-leave-active {
  transition: width 0.3s ease;
}

.search-leave {
  width: 10rem
}

.search-leave-to {
  width: 0;
}
</style>
