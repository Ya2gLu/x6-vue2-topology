<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 16:09:11
 * @LastEditTime : 2023-06-27 15:28:13
 * @LastEditors  : ya2glu
 * @Description  : TitleBar
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/TitleBar.vue
-->
<template>
  <div class="title-bar-container">
    <div class="item-left">
      <div border="2 solid rounded-md dark-200" p="y-1 x-2" cursor="pointer"
        :class="{ active: this.$store.state.titleBar.dragToggle }" @click="toggleRight">
        <div class="y-material-symbols:left-panel-open-outline  p-2.5"></div>
      </div>
    </div>
    <div class="item-center">
      <div v-for="(i, index) in toolsList" :key="index" :class="{ active: index === selectIndex && isSelection }"
        border="2 solid rounded-md dark-200" p="y-1 x-2" m="y-0 x-1" cursor="pointer" active="bg-dark-200"
        @click="onToolsClick(i.type, index)">
        <a-tooltip :title="i.label" :mouseEnterDelay="0.5">
          <div :class="i.icon" class=" p-2.5"></div>
        </a-tooltip>
      </div>
    </div>
    <div class="item-right">
      <a-tooltip title="侧边栏" :mouseEnterDelay="0.5">
        <div :class="{ active: this.$store.state.titleBar.sideToggle }" border="2 solid rounded-md dark-200" p="y-1 x-2"
          cursor="pointer" @click="toggleLeft">
          <div class="y-material-symbols:right-panel-open-outline-rounded  p-2.5"></div>
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { Selection } from "@antv/x6-plugin-selection";
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
      isSelection: false, // 是否框选
    };
  },
  computed: {},
  mounted() {
    this.initToolsBar();

    this.graph.on("cell:selected", () => {
      console.log();
    });
  },
  methods: {
    ...mapMutations("titleBar", ["toggleLeft", "toggleRight"]),

    initToolsBar() {
      if (this.graph) {
        this.graph.use(
          new Selection({
            enabled: true,
            rubberband: this.isSelection, // 是否启用框选节点功能
            showNodeSelectionBox: true,
            pointerEvents: "none",
          })
        );
      }
    },

    onToolsClick(key, index) {
      switch (key) {
        case "Focus":
          this.graph.centerContent();
          break;
        case "Selection":
          this.isSelection = !this.isSelection;
          this.selectIndex = index;
          if (this.graph) {
            this.graph.toggleRubberband(this.isSelection);
          }
          break;
        case "Zoom-in":
          this.graph.zoom(0.3);
          break;
        case "Zoom-out":
          this.graph.zoom(-0.3);
          break;
        case "Delete":
          break;
        case "Undo":
          break;
        case "Redo":
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
.title-bar-container {
  height: 100%;
  width: 100%;

  z-index: 99;

  background-color: rgba(31, 31, 31, 0.3);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid rgba(49, 49, 49, 0.3);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .item-left {
    height: 100%;
    width: 21%;
    // border: 1px dashed #fff;

    display: flex;
    justify-content: end;
    align-items: center;
  }

  .item-center {
    height: 100%;
    width: 55%;
    // border: 1px dashed #fff;

    display: flex;
    justify-content: start;
    align-items: center;

    padding: 0 10px;
  }

  .item-right {
    height: 100%;
    width: 25%;
    // border: 1px dashed #fff;

    display: flex;
    justify-content: start;
    align-items: center;
  }
}

.icons {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.active {
  background-color: rgb(53, 51, 52);
}

.icon-box {
  margin: 0 5px;
}
</style>
