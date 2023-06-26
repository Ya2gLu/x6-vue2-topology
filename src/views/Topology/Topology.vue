<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:23:50
 * @LastEditTime : 2023-06-25 14:50:51
 * @LastEditors  : ya2glu
 * @Description  : Topology
 * @FilePath     : /x6-vue2-topology/src/views/Topology/Topology.vue
-->
<template>
  <div>
    <div class="main">
      <div id="bgc-svg">
        <div id="svg-container" class="svg-panel" @click="handleGraphClick" />
      </div>
      <div class="layout-top">
        <title-bar v-if="graph" :graph="graph" />
      </div>
      <div class="layout-left">
        <!-- <tools-bar v-if="graph" :graph="graph" /> -->
        <drag-panel v-if="graph" />
      </div>
      <div class="layout-bottom">
        <online-panel v-if="graph" :graph="graph" />
      </div>
      <div class="layout-right">
        <side-panel v-if="graph" />
      </div>
    </div>
    <context-menu ref="ctxMenu" />
  </div>
</template>

<script>
import { Graph } from "@antv/x6";
import {
  OnlinePanel,
  ContextMenu,
  TitleBar,
  SidePanel,
  DragPanel,
} from "@/components/Topology";

// Graph.registerEdge("dag-edge", {
//   inherit: "edge",
//   attrs: {
//     attrs: {
//       line: {
//         stroke: "#C2C8D5",
//         strokeWidth: 2,
//         targetMarker: null,
//       },
//     },
//   },
// });
export default {
  name: "y-topology",
  components: {
    OnlinePanel,
    ContextMenu,
    TitleBar,
    SidePanel,
    DragPanel,
  },

  data() {
    return {
      graph: null,
      grid: {
        visible: true,
        size: 25,
        type: "dot",
        args: {
          color: "#373536",
          thickness: 4,
        },
      },
      // 高亮选项
      highlighting: {
        // 连接桩可以被连接时在连接桩外围渲染一个包围框
        magnetAvailable: {
          name: "stroke",
          args: {
            padding: 0,
            attrs: {
              "stroke-width": 2.5,
              stroke: "#3A78DB",
            },
          },
        },
        // 连接桩吸附连线时在连接桩外围渲染一个包围框
        magnetAdsorbed: {
          name: "stroke",
          args: {
            padding: 0,
            attrs: {
              "stroke-width": 2.5,
              stroke: "#3a78db",
            },
          },
        },
      },
    };
  },

  mounted() {
    this.initGraph();
    // Cell节点右键回调
    this.graph.on("cell:contextmenu", this.contextMenu);
  },

  methods: {
    initGraph() {
      const that = this;
      that.graph = new Graph({
        container: document.getElementById("svg-container"),
        autoResize: true,
        grid: that.grid,
        selecting: true,
        // 设置画布缩放级别
        scaling: {
          min: 0.09,
          max: 1.5,
        },
        // Edge Options
        connecting: {
          snap: {
            radius: 20,
          },
          highlight: true,
          allowNode: false, // 是否允许连接到画布空白位置的点
          allowLoop: false, // 是否允许创建循环连线，即边的起始点和终止节点为同一节点
          allowEdge: false, // 是否允许边连接到另一个边
          allowBlank: false, // 是否允许连接到画布空白位置的点
          allowPort: true, // 是否允许边连接到连接桩
          allowMulti: true, // 是否允许在相同的起始节点和终止之间创建多条边
          router: "manhattan", // 曼哈顿路由
          // 连接桩样式
          connector: {
            name: "rounded",
            args: {
              radius: 8,
            },
          },
          anchor: "center",
          connectionPoint: "boundary",
          // 创建从节点中拉出的边
          createEdge() {
            return this.createEdge({
              shape: "edge",
              attrs: {
                line: {
                  stroke: "#343434",
                  strokeDasharray: "5 5",
                  strokeWidth: 2,
                  // Marker style
                  targetMarker: {
                    name: "path",
                    width: 5,
                    height: 0,
                  },
                },
              },
            });
          },
        },
        highlighting: that.highlighting,
      });
    },
    editNode() {
      console.log("edit...");
      return null;
    },
    contextMenu({ cell, view, e }) {
      return this.$refs.ctxMenu.openMenu(e);
    },

    handleGraphClick() {
      // 关闭右键菜单
      if (this.$refs.ctxMenu.isOpened) this.$refs.ctxMenu.isOpened = false;
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.common(@width, @height) {
  width: @width;
  height: @height;
}
.commBorder() {
  border: 1px dashed #7f8c8d;
}
.main {
  max-width: 100%;
  min-height: 100vh;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
  position: relative;

  display: grid;
  grid-template-rows: repeat(24, 1fr);
  grid-template-columns: repeat(24, 1fr);

  #bgc-svg {
    position: absolute;
    width: 100%;
    height: 100%;

    .svg-panel {
      position: relative;
      height: 100%;
      width: 100%;
    }
  }

  .layout-top {
    .common(100%, 100%);
    // .commBorder();

    grid-row: 1 / span 2;
    grid-column: 1 / span 24;
  }
  .layout-left {
    .common(100%, 100%);
    .commBorder();

    grid-row: 2 / span 23;
    grid-column: 1 / span 5;

    display: grid;
    grid-template-rows: repeat(24, 1fr);
    grid-template-columns: repeat(24, 1fr);
  }
  .layout-bottom {
    .common(100%, 100%);
    .commBorder();

    grid-row: 20 / span 5;
    grid-column: 6 / span 13;

    display: grid;
    grid-template-rows: repeat(24, 1fr);
    grid-template-columns: repeat(24, 1fr);
  }
  .layout-right {
    .common(100%, 100%);
    .commBorder();

    grid-row: 2 / span 23;
    grid-column: 19 / span 7;

    display: grid;
    grid-template-rows: repeat(24, 1fr);
    grid-template-columns: repeat(24, 1fr);
  }
}
</style>
