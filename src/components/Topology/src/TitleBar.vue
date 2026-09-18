<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 16:09:11
 * @LastEditTime : 2026-09-10 09:19:25
 * @LastEditors  : ya2glu
 * @Description  : title components
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\TitleBar.vue
-->
<template>
  <!-- title container -->
  <div w-full h-full col-span-24 row-span-2>
    <div flex justify-between items-center h-full w-full z-99 backdrop-blur
      class="title-bar bg-neutral-850/75 border-b-2 border-b-solid  border-neutral-700/30">

      <div flex justify-end items-center h-full w="22%">
        <a-tooltip title="Drag" :mouseEnterDelay=".5">
          <div :class="{ active: this.$store.state.titleBar.dragToggle }" border="1 solid rounded-md dark-200"
            p="y-1 x-2" cursor="pointer" @click="toggleRight">
            <i class="y-material-symbols-light:play-shapes-outline p-2.5"></i>
          </div>
        </a-tooltip>
      </div>

      <div flex justify-start items-center p="x-0 y-10" h-full w="55%">
        <div v-for="(i, index) in toolsList" :key="index" :class="textActive(i, index)"
          border="1 solid rounded-md dark-200" p="y-1 x-2" m="x-1" cursor="pointer"
          @click="onToolsClick(i.type, index)">
          <a-tooltip :title="i.label" :mouseEnterDelay="0.5">
            <i :class="i.icon" class="p-2.5"></i>
          </a-tooltip>
        </div>
      </div>

      <div flex justify-start items-center h-full w="25%">
        <a-tooltip :title="this.$store.state.titleBar.theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'" :mouseEnterDelay="0.5">
          <div border="1 solid rounded-md dark-200" p="y-1 x-2" cursor="pointer" @click="toggleTheme" m="r-1">
            <i :class="this.$store.state.titleBar.theme === 'dark' ? 'y-solar:sun-bold' : 'y-solar:moon-bold'" class="p-2.5"></i>
          </div>
        </a-tooltip>
        <a-tooltip title="settings" :mouseEnterDelay="0.5">
          <div :class="{ active: this.$store.state.titleBar.sideToggle }" border="1 solid rounded-md dark-200"
            p="y-1 x-2" cursor="pointer" @click="toggleLeft">
            <i class="y-icon-park-outline:setting-config  p-2.5"></i>
          </div>
        </a-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Selection } from "@antv/x6-plugin-selection";
import { History } from "@antv/x6-plugin-history"
import { Graph } from "@antv/x6";
export default {
  components: {},
  props: {
    graph: {
      type: Graph,
    },
    toolsList: {
      type: Array,
      default: () => {
        return [
          {
            icon: "y-iconamoon:type-duotone",
            label: '文本',
            type: 'text'
          },
          {
            icon: "y-mdi:image-filter-center-focus",
            label: "居中",
            type: "Focus",
          },
          {
            icon: "y-ph:selection-plus",
            label: "框选",
            type: "Selection",
          },

          {
            icon: "y-solar:magnifer-zoom-in-linear",
            label: "放大",
            type: "Zoom-in",
          },
          {
            icon: "y-solar:magnifer-zoom-out-linear",
            label: "缩小",
            type: "Zoom-out",
          },
          {
            icon: "y-material-symbols:delete-outline-rounded",
            label: "删除",
            type: "Delete",
          },
          {
            icon: "y-ic:round-undo",
            label: "撤销",
            type: "Undo",
          },
          {
            icon: "y-ic:outline-redo",
            label: "重做",
            type: "Redo",
          },
          {
            icon: "y-solar:export-linear",
            label: "导出",
            type: "Export",
          },
          {
            icon: "y-material-symbols:keyboard-onscreen-outline",
            label: "快捷键",
            type: "Keyboard",
          },
        ];
      },
    },
  },
  data() {
    return {
      selectIndex: 0,
      isRubberband: false, // 是否框选
    };
  },
  computed: {
  },
  mounted() {

    if (!this.graph) {
      console.error("The graph instance is required for the TitleBar component.");
      return;
    }

    this.initToolsBar();

    // 启用历史记录
    this.graph.use(
      new History({
        enabled: true
      })
    )

  },
  methods: {
    ...mapMutations("titleBar", ["toggleRight", "toggleLeft", "toggleText", "toggleTheme", "setTheme", "setTextToggle"]),
    textActive(i, index) {
      return {
        active: this.$store.state.titleBar.textToggle && i.type == "text" || this.isRubberband && index == this.selectIndex
      }
    },
    /**
     * 初始化工具栏功能
     * @description 该方法在 mounted 生命周期中调用，用于初始化工具栏功能
     */
    initToolsBar() {
      if (this.graph) {
        this.graph.use(
          new Selection({
            className: "selection",
            enabled: true,
            rubberband: this.isRubberband, // 是否启用框选节点功能
            showNodeSelectionBox: true, // 是否显示节点的选择框
            // 如果打开 showNodeSelectionBox 时，会在节点上方盖一层元素，导致节点的事件无法响应，此时可以配置 pointerEvents: none 来解决，默认值是 auto
            pointerEvents: "none",
          })
        );
      }
    },
    /**
     * 删除选中的节点方法
     * @param nodes {Array} 需要删除的节点数组
     */
    handleNodesDelete(nodes) {
      if (nodes.length > 1) {
        const cellIds = nodes.map((items) => items.id)
        return this.graph.removeCells(cellIds)
      } else if (nodes.length == 1) {
        const cellId = nodes[0].id.toString()
        return this.graph.removeCell(cellId)
      } else {
        return null;
      }
    },
    /**
     * 点击工具栏的操作按钮时触发的方法
     * @param key 操作类型
     * @param index 
     */
    onToolsClick(key, index) {
      // 1.高亮当前文本按钮
      // 2.当鼠标在编辑区双击时，插入文本框
      if (key === "text") {
        if (this.isRubberband) {
          this.isRubberband = false;
          if (this.graph) {
            this.graph.toggleRubberband(false);
          }
        }
        this.selectIndex = -1;
        this.toggleText();
        return null;
      }

      if (this.$store.state.titleBar.textToggle) {
        this.setTextToggle(false);
      }

      switch (key) {
        case "Focus":
          this.graph.centerContent();
          break;
        case "Selection":
          this.isRubberband = !this.isRubberband;
          this.selectIndex = index;
          if (this.graph) {
            this.graph.toggleRubberband(this.isRubberband);
          }
          break;
        case "Zoom-in":
          this.graph.zoom(0.3);
          break;
        case "Zoom-out":
          this.graph.zoom(-0.3);
          break;
        case "Delete":
          const nodes = this.graph.getSelectedCells()
          this.handleNodesDelete(nodes)
          break;
        case "Undo":
          this.graph.undo();
          break;
        case "Redo":
          this.graph.redo();
          break;
        case "Export":
          break;
        case "Keyboard":
          break;
        default:
          break;
      }
      return null;
    },
  },
}
</script>
<style lang="less" scoped>
.active {
  border: 1px solid rgba(0, 0, 0, 0);
  border-top: 1px solid rgb(51, 51, 51);
  border-radius: 6px;
  box-shadow: 0px 2px 6px 0px rgba(16, 16, 16, 0.25);
  background: rgba(49, 49, 49, .55);
}

// 浅色模式：柔化工具栏分隔线与按钮颜色
:root:not(.dark) .title-bar {
  border-bottom-color: rgba(0, 0, 0, 0.06);

  [border] {
    color: rgba(0, 0, 0, 0.55);
    border-color: rgba(0, 0, 0, 0.12);
    background-color: rgba(0, 0, 0, 0.025);
    transition: color 0.3s ease, border-color 0.3s ease, background-color 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      color: rgba(0, 0, 0, 0.72);
      border-color: rgba(0, 0, 0, 0.18);
      background-color: rgba(0, 0, 0, 0.05);
    }

    &.active,
    &.active:hover {
      color: var(--accent);
      border: 1px solid rgba(58, 120, 219, 0.45);
      background: rgba(58, 120, 219, 0.1);
      box-shadow: 0 2px 8px rgba(58, 120, 219, 0.12);
    }
  }
}
</style>
