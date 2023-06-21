<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:21:11
 * @LastEditTime : 2023-06-02 18:29:58
 * @LastEditors  : ya2glu
 * @Description  : 左侧ToolsBar
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/ToolsBar.vue
-->
<template>
  <div class="tools-container">
    <div class="icon-box" v-for="(ico, index) in list" :key="index">
      <div
        @click="onMenuClick(ico.key, index)"
        :class="{ selection: index === selectIndex && isSelection }"
      >
        <icon-park class="icons" :type="ico.type" theme="outline" size="24" />
      </div>
    </div>
  </div>
</template>

<script>
import { Graph } from "@antv/x6";
import { IconPark } from "@icon-park/vue/es/all";
import { Selection } from "@antv/x6-plugin-selection";
export default {
  name: "ToolsBar",
  components: {
    IconPark,
  },
  props: {
    graph: {
      type: Graph,
    },
    list: {
      type: Array,
      default: () => {
        return [
          {
            key: "focus",
            label: "focus",
            type: "Add-four",
          },
          {
            key: "selection",
            label: "selection",
            type: "Zoom-internal",
          },

          {
            key: "zoom-in",
            label: "zoom-in",
            type: "Zoom-in",
          },
          {
            key: "zoom-out",
            label: "zoom-out",
            type: "Zoom-out",
          },
          {
            key: "delete",
            label: "delete",
            type: "Close-one",
          },
          {
            key: "undo",
            label: "undo",
            type: "Undo",
          },
          {
            key: "redo",
            label: "redo",
            type: "Redo",
          },
          {
            key: "export",
            label: "export",
            type: "Logout",
          },
          {
            key: "keyboard",
            label: "keyboard",
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

  mounted() {
    this.initToolsBar();
    this.graph.on("cell:selected", ({ cell }) => {
      console.log("selected->", cell);
    });
  },

  methods: {
    initToolsBar() {
      if (this.graph)
        this.graph.use(
          new Selection({
            // className:'selection-box',
            enabled: true,
            rubberband: true,
            showNodeSelectionBox: true,
            pointerEvents: "none",
          })
        );
    },
    onMenuClick(key, index) {
      switch (key) {
        case "focus":
          this.graph.centerContent();
          break;
        case "selection":
          this.isSelection = !this.isSelection;
          this.selectIndex = index;
          if (this.graph) {
            this.graph.toggleRubberband(this.isSelection);
          }
          break;
        case "zoom-in":
          this.graph.zoom(0.3);
          break;

        case "zoom-out":
          this.graph.zoom(-0.3);
          break;

        case "delete":
          break;
        case "undo":
          break;
        case "redo":
          break;
        case "export":
          break;
        case "keyboard":
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tools-container {
  grid-row: 5 / span 16;
  grid-column: 12 / span 5;

  border-radius: 25px;
  box-shadow: -2px 2px 10px 3px #0d0d0d;

  z-index: 99;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  backdrop-filter: blur(10px);
  background-color: rgba(31, 31, 31, 0.8);

  .icon-box {
    .icons {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        cursor: pointer;

        border-radius: 15px;
        background-color: #141414;
      }
    }
    .selection {
      border-radius: 10px;
      background-color: #141414;
    }
  }
}
</style>
