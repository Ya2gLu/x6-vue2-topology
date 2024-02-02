<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 16:09:11
 * @LastEditTime : 2024-01-02 17:05:05
 * @LastEditors  : ya2glu
 * @Description  : 标题工具栏
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\TitleBar.vue
-->
<template>
  <div w-full h-full col-span-24 row-span-2>
    <div flex justify-between items-center h-full w-full z-99 backdrop-blur
      class="bg-neutral-900/75 border-b-2 border-b-solid  border-neutral-700/30">

      <div flex justify-end items-center h-full w="22%">
        <a-tooltip title="Drag" :mouseEnterDelay=".5">
          <div :class="{ active: this.$store.state.titleBar.dragToggle }" border="1 solid rounded-md dark-200" p="y-1 x-2"
            cursor="pointer" @click="toggleRight">
            <i class="y-material-symbols:left-panel-open-outline p-2.5"></i>
          </div>
        </a-tooltip>
      </div>

      <div flex justify-start items-center p="x-0 y-10" h-full w="55%">
        <div v-for="(i, index) in toolsList" :key="index" :class="{ active: index === selectIndex && isRubberband }"
          border="1 solid rounded-md dark-200" p="y-1 x-2" m="x-1" cursor="pointer" @click="onToolsClick(i.type, index)">
          <a-tooltip :title="i.label" :mouseEnterDelay="0.5">
            <i :class="i.icon" class="p-2.5" ></i>
          </a-tooltip>
        </div>
      </div>

      <div flex justify-start items-center h-full w="25%">
        <a-tooltip title="settings" :mouseEnterDelay="0.5">
          <div :class="{ active: this.$store.state.titleBar.sideToggle }" border="1 solid rounded-md dark-200" p="y-1 x-2"
            cursor="pointer" @click="toggleLeft">
            <i class="y-material-symbols:right-panel-open-outline-rounded  p-2.5"></i>
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
  computed: {},
  mounted() {
    this.initToolsBar();

    // 启用历史记录
    this.graph.use(
      new History({
        enabled: true
      })
    )
  },
  methods: {
    ...mapMutations("titleBar", ["toggleLeft", "toggleRight"]),

    initToolsBar() {
      if (this.graph) {
        this.graph.use(
          new Selection({
            enabled: true,
            rubberband: this.isRubberband, // 是否启用框选节点功能
            showNodeSelectionBox: true, // 是否显示节点的选择框
            // 如果打开 showNodeSelectionBox 时，会在节点上方盖一层元素，导致节点的事件无法响应，此时可以配置 pointerEvents: none 来解决，默认值是 auto
            pointerEvents: "none",
          })
        );
      }
    },

    handleNodesDelete(nodes) {
      if (nodes.length > 1) {
        const cellIds = nodes.map((items) => items.id)
        return this.graph.removeCells(cellIds)
      } else if (nodes.length == 1) {
        const cellId = nodes[0].id.toString()
        return this.graph.removeCell(cellId)
      } else {
        return null
      }

    },

    onToolsClick(key, index) {
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
};
</script>
<style lang="less" scoped>
.active {
  border: 1px solid rgba(0, 0, 0, 0);
  border-top: 1px solid rgb(51, 51, 51);
  border-radius: 6px;
  box-shadow: 0px 2px 6px 0px rgba(16, 16, 16, 0.25);
  background: rgba(49, 49, 49, .55);
}
</style>
