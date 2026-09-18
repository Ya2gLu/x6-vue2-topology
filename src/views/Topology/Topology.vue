<script>
import { Graph } from "@antv/x6";
import {
  OnlinePanel,
  ContextMenu,
  TitleBar,
  SidePanel,
  DragPanel,
  OnlinePopover
} from "@/components/Topology";
import { textShapeRegister, TextShape } from "../../components/Topology/src/utils/registerShape";
import { mapMutations } from "vuex";
import topoConfig from "@/config/topology.json";
import { getCssVar } from "@/theme/applyTheme";
textShapeRegister() // 注册文本节点形状，必须在 Graph 实例化前注册
export default {
  name: "y-topology",
  components: {
    OnlinePanel,
    ContextMenu,
    TitleBar,
    SidePanel,
    DragPanel,
    OnlinePopover,
    TextShape
  },

  data() {
    return {
      onlineKey: '', // 记录在线点击的key
      graph: null,
      // DragPanel 选中的基础图形；存在时可在画布空白处拖动绘制。
      selectedBaseShape: null,
      // 当前拖动创建的临时 Cell，用于 mousemove 更新和 mouseup 收尾。
      baseShapeDraft: null,
      // 高亮选项
      highlighting: topoConfig.highlighting,
    };
  },

  mounted() {

    this.initGraph();
    /**
     * 监听画布空白区域点击事件
     */
    this.graph.on("blank:click", ({ x, y }) => {
      if (this.$refs.ctxMenu && this.$refs.ctxMenu.isOpened) {
        this.$refs.ctxMenu.isOpened = false;
      }
      if (this.$store.state.titleBar.textToggle) {
        this.createTextNode(x, y);
        this.toggleText();
      }
    });

    // 基础图形的绘制生命周期：按下创建、移动更新、松开完成。
    this.graph.on("blank:mousedown", this.startBaseShapeDraw);
    this.graph.on("blank:mousemove", this.updateBaseShapeDraw);
    this.graph.on("blank:mouseup", this.finishBaseShapeDraw);



    // Cell节点右键回调
    this.graph.on("cell:contextmenu", this.contextMenu);

    /**
     * 画布中节点选中事件
     */
    this.graph.on("node:selected", ({ node }) => {
      const EdgesArr = this.graph.getConnectedEdges(node);
      EdgesArr.forEach(ele => {
        ele.setAttrs({
          line: {
            stroke: topoConfig.edgeDefaultAttrs.line.stroke
          }
        })
      });
      if (node.shape === "vue-text-shape") {
        node.addTools([
          {
            name: "boundary",
            args: {
              padding: 2,
              rotate: false,
              attrs: {
                fill: "transparent",
                stroke: "#3A78DB",
                "stroke-width": 1,
                "stroke-dasharray": "3 3",
                rx: 0,
                ry: 0,
              },
              handleAttrs: {
                fill: "#fff",
                stroke: "#3A78DB",
                "stroke-width": 1,
                r: 3,
              },
            },
          },
        ]);
        const selectionDom = document.querySelector('.x6-widget-selection-box-node');
        if (selectionDom) {
          selectionDom.classList.add('text-node-selection');
        }
      }
    })

    /**
     * 画布中节点取消选中事件
     */
    this.graph.on("node:unselected", ({ node }) => {
      const EdgesArr = this.graph.getConnectedEdges(node)
      EdgesArr.forEach(ele => {
        ele.setAttrs({
          line: {
            stroke: topoConfig.edgeDefaultAttrs.line.stroke
          }
        })
      })
      if (node.shape === "vue-text-shape") {
        node.removeTools();
      }
    })

    this.graph.on("cell:change:data", ({ cell }) => {
      if (cell.isNode() && cell.shape === "vue-text-shape") {
        console.log('文本节点内容更改为:', cell.getData().text);
      }
    });
  },

  methods: {
    ...mapMutations("titleBar", ["toggleText", "setTextToggle"]),
    /**
     * 同步侧栏选择状态；基础图形绘制与文本输入模式互斥。
     */
    selectBaseShape(shape) {
      this.selectedBaseShape = shape;
      if (shape && this.$store.state.titleBar.textToggle) {
        this.setTextToggle(false);
      }
    },

    /**
     * 在空白画布按下时创建临时图形，后续由 mousemove 调整几何信息。
     */
    startBaseShapeDraw({ x, y }) {
      if (!this.selectedBaseShape || this.$store.state.titleBar.textToggle) {
        return;
      }

      const stroke = getCssVar("--accent") || "#3A78DB";
      const fill = getCssVar("--node-surface") || "transparent";
      const { name } = this.selectedBaseShape;
      let cell;

      // 线条和箭头是 Edge；矩形和圆形使用 Node 承载尺寸。
      if (name === "line" || name === "arrow") {
        cell = this.graph.addEdge({
          source: { x, y },
          target: { x, y },
          attrs: {
            line: {
              stroke,
              strokeWidth: 2,
              targetMarker: name === "arrow" ? { name: "classic" } : null,
            },
          },
        });
      } else {
        cell = this.graph.addNode({
          shape: name === "circle" ? "ellipse" : "rect",
          x,
          y,
          width: 1,
          height: 1,
          attrs: {
            body: {
              fill,
              fillOpacity: 0.85,
              stroke,
              strokeWidth: 2,
              rx: name === "square" ? 10 : 0,
              ry: name === "square" ? 10 : 0,
            },
          },
        });
      }

      this.baseShapeDraft = { cell, name, startX: x, startY: y };
    },

    /**
     * 拖动过程中实时更新图形终点或节点边界。
     */
    updateBaseShapeDraw({ x, y }) {
      const draft = this.baseShapeDraft;
      if (!draft) {
        return;
      }

      if (draft.name === "line" || draft.name === "arrow") {
        draft.cell.setTarget({ x, y });
        return;
      }

      // 圆形始终保持宽高一致，并按拖拽方向确定左上角。
      if (draft.name === "circle") {
        const width = x - draft.startX;
        const height = y - draft.startY;
        const size = Math.max(Math.abs(width), Math.abs(height), 1);
        draft.cell.position(
          width < 0 ? draft.startX - size : draft.startX,
          height < 0 ? draft.startY - size : draft.startY,
        );
        draft.cell.resize(size, size);
        return;
      }

      draft.cell.position(Math.min(draft.startX, x), Math.min(draft.startY, y));
      draft.cell.resize(Math.max(Math.abs(x - draft.startX), 1), Math.max(Math.abs(y - draft.startY), 1));
    },

    /**
     * 松开鼠标后完成绘制；过短拖动视为误触，删除临时图形。
     */
    finishBaseShapeDraw({ x, y }) {
      const draft = this.baseShapeDraft;
      if (!draft) {
        return;
      }

      const distance = Math.hypot(x - draft.startX, y - draft.startY);
      if (distance < 4) {
        this.graph.removeCell(draft.cell);
      }
      this.baseShapeDraft = null;
      // 每次绘制操作结束后回到默认指针，避免连续误绘制。
      this.selectedBaseShape = null;
    },
    getGridOptions() {
      const g = topoConfig.grid;
      const color = getCssVar("--graph-grid-color") || g.args.color;
      return {
        ...g,
        args: {
          ...g.args,
          color,
        },
      };
    },

    syncGraphPaperAndGrid() {
      if (!this.graph) {
        return;
      }
      const paper = getCssVar("--app-bg");
      if (paper) {
        this.graph.drawBackground({ color: paper });
      }
      this.graph.drawGrid(this.getGridOptions());
    },

    initGraph() {
      const that = this;
      window.__x6_instances__ = [] // 开发时控制台调试使用
      that.graph = new Graph({
        container: document.getElementById("svg-container"),
        autoResize: true, // 是否监听容器大小改变，并自动更新画布大小
        grid: that.getGridOptions(),
        panning: topoConfig.panning, // 支持鼠标右键平移
        selecting: topoConfig.selecting,
        // 设置画布缩放级别
        scaling: topoConfig.scaling,
        // Edge Options
        connecting: {
          ...topoConfig.connecting,
          /**
           * 创建从节点中拉出的边 
           */
          createEdge() {
            return this.createEdge({
              shape: "edge",
              attrs: {
                ...topoConfig.edgeDefaultAttrs
              },
            });
          },
        },
        embedding: {
          enabled: true,
          findParent: ({ node }) => {
            if (node.shape === "vue-text-shape" && that.graph) {
              return that.graph
                .getNodesUnderNode(node)
                .filter((n) => n.shape !== "vue-text-shape");
            }
            return [];
          },
        },
        highlighting: that.highlighting,
      });
      window.__x6_instances__.push(that.graph)
      that.syncGraphPaperAndGrid();
    },

    editNode() {
      console.log("edit...");
      return null;
    },

    /**
     * 节点右键菜单事件处理函数
     * @param param0 { cell, view, e }
     */
    contextMenu({ cell, view, e }) {
      return this.$refs.ctxMenu.openMenu(e);
    },


    handleOnlineNode(items, nodePos) {
      console.log(items);
      if (this.onlineKey !== items.key) {
        this.onlineKey = items.key
        return this.$refs.popover.open(items, nodePos)
      } else {
        this.onlineKey = ""
        return this.$refs.popover.close()
      }
    },

    createTextNode(x, y) {
      if (!this.graph) {
        console.error("Graph instance is not available.");
        return;
      }

      const node = this.graph.addNode({
        shape: topoConfig.textNode.shape,
        x: x || 100,
        y: y || 100,
        width: topoConfig.textNode.width,
        height: topoConfig.textNode.height,
        attrs: {
          body: {
            fill: "transparent",
            stroke: "transparent",
            strokeWidth: 0,
          },
        },
        data: { text: "", autoFocus: true },
      });

      this.$nextTick(() => {
        const view = this.graph.findViewByCell(node);
        if (view && view.$vm) {
          view.$vm.enterEdit();
        }
      });
    },
  },
  watch: {
    "$store.state.titleBar.theme"() {
      this.syncGraphPaperAndGrid();
    },
    "$store.state.titleBar.textToggle"(active) {
      const container = document.getElementById("svg-container");
      if (container) {
        if (active) {
          container.classList.add("text-edit-mode");
        } else {
          container.classList.remove("text-edit-mode");
        }
      }
    },
  },
  beforeDestroy() {
    if (this.graph) {
      this.graph.off("blank:mousedown", this.startBaseShapeDraw);
      this.graph.off("blank:mousemove", this.updateBaseShapeDraw);
      this.graph.off("blank:mouseup", this.finishBaseShapeDraw);
    }
  },
};
</script>

<template>
  <!-- TODO:待优化，可将当前组件引用做成响应式布局.目前就一种布局 -->
  <!-- root container -->
  <div class="topology-container max-w-full min-h-screen w-screen h-screen overflow-hidden relative grid grid-rows-24 grid-cols-24">
    <!-- background container -->
    <div id="bgc-svg" class="absolute w-full h-full" style="z-index: 0;">
      <div id="svg-container" class="relative h-full w-full"
        :class="{ 'base-shape-draw-mode': selectedBaseShape }"></div>
    </div>
    <!-- titlebar component -->
    <title-bar v-if="graph" :graph="graph" />
    <!-- dragPanel component -->
    <drag-panel v-if="graph" :graph="graph" :active-base-shape="selectedBaseShape"
      @select-base-shape="selectBaseShape" />
    <!-- onlinePanel component -->
    <online-panel v-if="graph" :graph="graph" @handleOnlineNode="handleOnlineNode" />
    <!--  -->
    <side-panel v-if="graph" />
    <context-menu ref="ctxMenu" />
    <online-popover ref="popover" v-if="graph" :graph="graph" />
  </div>
</template>
<style lang="less" scoped>
.topology-container {
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
}
.text-edit-mode {
  cursor: text !important;
}
.base-shape-draw-mode {
  cursor: crosshair;
}
</style>
