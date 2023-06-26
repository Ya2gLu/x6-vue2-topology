<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:21:22
 * @LastEditTime : 2023-06-26 15:47:55
 * @LastEditors  : ya2glu
 * @Description  : 自定义vue节点
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/modules/TopoNode.vue
-->
<template>
  <div class="node">
    <div
      class="node-item"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <icon-park :type="type" theme="outline" size="28" />
    </div>
  </div>
</template>

<script>
import { IconPark } from "@icon-park/vue/es/all";
export default {
  name: "TopoNode",
  inject: ["getNode", "getGraph"],
  components: {
    IconPark,
  },
  props: {},
  data() {
    return {
      type: this.getNode().data.types,
    };
  },
  mounted() {},
  watch: {},
  methods: {
    // 鼠标进入矩形区域时显示连接桩
    onMouseEnter() {
      const node = this.getNode();
      const ports = node.getPorts();
      ports.forEach((port) => {
        node.setPortProp(port.id, "attrs/circle", {
          fill: "#141414",
          stroke: "#1565C0",
        });
      });
    },
    // 鼠标离开矩形区域时隐藏连接桩
    onMouseLeave() {
      const node = this.getNode();
      const ports = node.getPorts();
      ports.forEach((port) => {
        node.setPortProp(port.id, "attrs/circle", {
          stroke: "transparent",
          fill: "transparent",
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.node {
  width: 68px;
  height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-around;
  .node-item {
    width: 100%;
    height: 100%;
    background-color: #1b1b1b;
    border-radius: 20px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
