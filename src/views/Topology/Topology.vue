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
      grid: topoConfig.grid,
      // 高亮选项
      highlighting: topoConfig.highlighting,
    };
  },

  mounted() {

    this.initGraph();
    /**
     * 监听画布鼠标点击事件
     */
    this.graph.on("blank:click", ({ e }) => {
      // 画布空白区域点击事件，关闭右键菜单
      if (this.$refs.ctxMenu && this.$refs.ctxMenu.isOpened) {
        this.$refs.ctxMenu.isOpened = false;
      }
    });

    /**
     * 监听画布双击事件
     */
    this.graph.on("blank:dblclick", ({ e, x, y }) => {
      // 点击画布时取消文本编辑状态
      console.log('画布双击...', x, y);
      if (this.$store.state.titleBar.textToggle) {

        this.toggleText();

        // 添加文本节点
        // TODO: 使用自定义vue节点创建text文本块
        this.createTextNode(x, y);
      }

    })



    // Cell节点右键回调
    this.graph.on("cell:contextmenu", this.contextMenu);

    /**
     * 画布中节点选中事件
     */
    this.graph.on("node:selected", ({ node, options }) => {
      const EdgesArr = this.graph.getConnectedEdges(node);
      EdgesArr.forEach(ele => {
        ele.setAttrs({
          line: {
            stroke: topoConfig.edgeDefaultAttrs.line.stroke
          }
        })
      });
      // 判断节点类型
      // 1.判断节点类型
      if (node.shape == "text-block") {
        // 2.设置文本节点选中的样式
        // 使用CSS变量和类名来设置样式，而不是直接操作DOM
        const selectionDom = document.querySelector('.x6-widget-selection-box-node');
        if (selectionDom) {
          // 应用文本节点的特殊选择样式
          selectionDom.style.setProperty('--text-selection-border-radius', String(topoConfig.textNode.selection.borderRadius));
          selectionDom.style.setProperty('--text-selection-border', topoConfig.textNode.selection.border);
          selectionDom.classList.add('text-node-selection');
        }
        // console.log('selectionDom:', selectionDom); 
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
            stroke: "#343434"
          }
        })
      })
    })

    this.graph.on("cell:change:attrs", ({ cell, current, previous }) => {
      console.log('节点触发');
      if (cell.isNode() && cell.shape == "text-block") {
        const newText = current.text.text || previous.text.text;
        console.log('文本节点内容更改为:', newText);
        cell.setAttrs({
          label: {
            text: newText
          }
        })
      }
    });
  },

  methods: {
    ...mapMutations("titleBar", ["toggleText"]),
    initGraph() {
      const that = this;
      window.__x6_instances__ = [] // 开发时控制台调试使用
      that.graph = new Graph({
        container: document.getElementById("svg-container"),
        autoResize: true, // 是否监听容器大小改变，并自动更新画布大小
        grid: that.grid,  // 网格，默认使用 10px 的网格，但不绘制网格背景。
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
        highlighting: that.highlighting,
      });
      window.__x6_instances__.push(that.graph)
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

      this.graph.addNode({
        shape: topoConfig.textNode.shape, // 使用注册的文本形状
        // component: TextShape,
        x: x || 100, // 默认位置
        y: y || 100,
        width: topoConfig.textNode.width,
        height: topoConfig.textNode.height,
        attrs: topoConfig.textNode.attrs,
        tools: [
          topoConfig.textNode.tool
        ]
      });
    },
  },
  watch: {},
};
</script>

<template>
  <!-- root container -->
  <div class="topology-container max-w-full min-h-screen w-screen h-screen overflow-hidden relative grid grid-rows-24 grid-cols-24">
    <!-- background container -->
    <div id="bgc-svg" class="absolute w-full h-full" style="z-index: 0;">
      <div id="svg-container" class="relative h-full w-full"></div>
    </div>
    <!-- titlebar component -->
    <title-bar v-if="graph" :graph="graph" />
    <!-- dragPanel component -->
    <drag-panel v-if="graph" :graph="graph" />
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
</style>