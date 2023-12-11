<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:21:22
 * @LastEditTime : 2023-12-11 17:04:13
 * @LastEditors  : ya2glu
 * @Description  : 自定义vue节点
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\modules\TopoNode.vue
-->
<template>
  <div>
    <div class="w-66px h-66px flex justify-center items-center bg-dark-400 rounded-2xl" @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave">
      <div>
        <div :class="type" class="p-4">vue</div>
      </div>
    </div>
    <!-- <div>{{ item.label }}</div> -->
  </div>
</template>

<script>
export default {
  name: "topo-node",
  inject: ["getNode", "getGraph"],
  components: {
  },
  props: {},
  data() {
    return {
      type: this.getNode().data.types,
    };
  },
  mounted() { },
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

<style lang="less" scoped></style>
