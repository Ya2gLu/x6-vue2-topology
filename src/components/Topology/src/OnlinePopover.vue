<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-29 11:07:09
 * @LastEditTime : 2025-04-08 14:22:06
 * @LastEditors  : ya2glu
 * @Description  : 在线设备弹框
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\OnlinePopover.vue
-->

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
            list: [{ key: "1", label: "router-n1c1", icon: "y-solar:wi-fi-router-minimalistic-linear", isInteraction: true }, { key: "2", label: "router-n1c2", icon: "y-solar:wi-fi-router-minimalistic-linear", }, { key: "3", label: "n1c3" }, { key: '4', label: "n1c4" }],
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
            icon: "y-circum:mobile-3",
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
      selectionIndex: -1,
      searchKeyword: '' // 搜索关键词
    };
  },
  computed: {
    // 过滤后的设备列表
    filteredDetailList() {
      if (!this.searchKeyword.trim()) {
        return this.detailList;
      }
      const keyword = this.searchKeyword.toLowerCase();
      return this.detailList.filter(item => 
        item.label && item.label.toLowerCase().includes(keyword)
      );
    }
  },
  mounted() {
    this.initDnd()
  },
  methods: {
    initDnd() {
      this.dnd = new Dnd({
        target: this.graph,
        // 在初始化dnd时，由于popover还未渲染，所以无法得到dom实例。
        // dndContainer: this.$refs.popover,
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
      // console.log("drag items -->", items, e);
      let node = {}
      if (items.isInteraction === true) {
        node = this.graph.createNode({
          shape: "server-vue-node",
          component: ServerNode,
          width: 160,
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
            ],
          },
        })
      }
      return this.dnd.start(node, e);
    },

    setPosition(nodePos) {
      if (!nodePos) {
        return null;
      } else {

        const popover = this.$refs.popover;

        // 在open事件触发时，popover dom渲染，再一次从dnd实例中设置dndContainer即可。
        this.dnd.options.dndContainer = popover;

        const { x, y, width } = nodePos;
        // 使用固定高度 26rem = 416px (1rem = 16px)
        const pHeight = 416;
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
    /**
     * 监听鼠标滚轮内容横向滚动
     * @param {Event} event DOM Event
     */
    handleScrollX(event) {
      let content = this.$refs.contentXRef
      // Math.sign()返回一个数字的符号，即正数，负数和0
      let delta = Math.sign(event.deltaY)
      content.scrollLeft += delta * 10
    },

    toggleSearch() {
      this.showSearch = !this.showSearch
      if (this.showSearch) {
        this.$nextTick(() => {
          this.$refs.searchRef?.focus()
        })
      } else {
        this.searchKeyword = ''
      }
    },

    handleSearch() {
      // 搜索逻辑已通过 computed 属性 filteredDetailList 处理
    },

  },
};
</script>

<template>
  <transition name="slide-fade" mode="out-in">
    <div 
      ref="popover" 
      class="popover-wrapper z-99" 
      v-if="isShow"
    >
      <div class="popover-container">
        <!-- 设备类型选择区域 -->
        <div class="device-types-section">
          <div 
            ref="contentXRef" 
            class="device-types-scroll" 
            @wheel="handleScrollX"
          >
            <div 
              v-for="(items, idx) in deviceList" 
              :key="idx"
              class="device-type-item"
              :class="{ 'device-type-active': idx === selectionIndex }"
              @click="handleDeviceClick(items, idx)"
            >
              <div :class="items.icon" class="device-type-icon"></div>
              <div class="device-type-label">{{ items.label }}</div>
            </div>
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 标题和搜索区域 -->
        <div class="header-section">
          <div class="header-title">{{ subTitle || '请选择设备类型' }}</div>
          <div class="search-container">
            <transition name="search-expand">
              <input 
                ref="searchRef" 
                v-if="showSearch" 
                name="search" 
                placeholder="搜索设备..." 
                class="search-input"
                v-model="searchKeyword"
                @input="handleSearch"
              />
            </transition>
            <div 
              class="search-icon-wrapper"
              :class="{ 'search-active': showSearch }"
              @click="toggleSearch"
            >
              <i class="y-iconamoon:search search-icon"></i>
            </div>
          </div>
        </div>

        <!-- 设备列表区域 -->
        <div class="device-list-section">
          <div 
            v-if="filteredDetailList.length === 0" 
            class="empty-state"
          >
            <div class="empty-icon">📦</div>
            <div class="empty-text">{{ searchKeyword ? '未找到匹配的设备' : '暂无设备' }}</div>
          </div>
          <div 
            v-for="(item, index) in filteredDetailList"
            :key="item.key || index"
            class="device-item"
            @mousedown="startDrag(item, $event)"
          >
            <div class="device-item-icon-wrapper">
              <div 
                :class="item.icon || deviceList[selectionIndex]?.icon" 
                class="device-item-icon"
              ></div>
            </div>
            <div class="device-item-content">
              <div class="device-item-label">{{ item.label }}</div>
              <div v-if="item.description" class="device-item-desc">{{ item.description }}</div>
            </div>
            <div class="device-item-drag-hint">
              <i class="y-material-symbols:drag-indicator drag-hint-icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.popover-wrapper {
  position: fixed;
  top: var(--top);
  left: var(--left);
  width: 18rem;
  height: 26rem;
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.98) 100%);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
  overflow: hidden;
}

.popover-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.75rem;
  gap: 0.75rem;
}

/* 设备类型选择区域 */
.device-types-section {
  flex-shrink: 0;
}

.device-types-scroll {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.device-type-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  min-width: 4.5rem;
  padding: 0.75rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(58, 120, 219, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(58, 120, 219, 0.2);
  }
  
  &.device-type-active {
    background: linear-gradient(135deg, rgba(58, 120, 219, 0.3) 0%, rgba(58, 120, 219, 0.2) 100%);
    border-color: #3A78DB;
    box-shadow: 
      0 0 0 2px rgba(58, 120, 219, 0.2),
      0 4px 12px rgba(58, 120, 219, 0.3);
  }
}

.device-type-icon {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.device-type-item:hover .device-type-icon,
.device-type-active .device-type-icon {
  opacity: 1;
  transform: scale(1.1);
}

.device-type-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.device-type-active .device-type-label {
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
}

/* 分隔线 */
.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 20%,
    rgba(255, 255, 255, 0.1) 80%,
    transparent 100%
  );
  margin: 0 -0.75rem;
}

/* 标题和搜索区域 */
.header-section {
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.header-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.search-input {
  width: 10rem;
  height: 2rem;
  padding: 0 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.75rem;
  outline: none;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: #3A78DB;
    box-shadow: 0 0 0 3px rgba(58, 120, 219, 0.1);
  }
}

.search-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(58, 120, 219, 0.5);
  }
  
  &.search-active {
    background: rgba(58, 120, 219, 0.2);
    border-color: #3A78DB;
  }
}

.search-icon {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;
}

.search-icon-wrapper:hover .search-icon,
.search-active .search-icon {
  color: rgba(255, 255, 255, 0.95);
}

/* 设备列表区域 */
.device-list-section {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  color: rgba(255, 255, 255, 0.5);
}

.empty-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  opacity: 0.6;
}

.empty-text {
  font-size: 0.75rem;
  text-align: center;
}

.device-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 0.75rem;
  cursor: grab;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(58, 120, 219, 0.5);
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    cursor: grabbing;
    transform: translateX(2px) scale(0.98);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
}

.device-item-icon-wrapper {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.device-item-icon {
  font-size: 1.25rem;
  opacity: 0.9;
}

.device-item-content {
  flex: 1;
  min-width: 0;
}

.device-item-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.device-item-desc {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.device-item-drag-hint {
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.device-item:hover .device-item-drag-hint {
  opacity: 0.5;
}

.drag-hint-icon {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.5);
}

/* 过渡动画 */
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px) scale(0.95);
  opacity: 0;
}

.search-expand-enter-active,
.search-expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-expand-enter,
.search-expand-leave-to {
  width: 0 !important;
  opacity: 0;
  margin-right: 0;
}
</style>
