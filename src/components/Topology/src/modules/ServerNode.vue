<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-07-03 09:24:01
 * @LastEditTime : 2023-12-11 16:43:34
 * @LastEditors  : ya2glu
 * @Description  : Server节点
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\modules\ServerNode.vue
-->
<template>
  <div class="wrapper">
    <div class="node-wrapper w-160px h-66px flex items-center bg-dark-400 rounded-2xl" @mouseenter="onMouseEnter"
      @mouseleave="onMouseleave">
      <div :class="item.icon" class="p-4 mx-4"></div>
      <div>{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "server-node",
  inject: ["getNode", "getGraph"],
  data() {
    return {
      item: this.getNode().data.item
    }
  },
  mounted() { },
  methods: {
    // 鼠标进入节点区域时显示连接桩
    onMouseEnter() {
      const node = this.getNode();
      const ports = node.getPorts();
      ports.forEach((port) => {
        node.setPortProp(port.id, "attrs/circle", {
          fill: "#141414",
          stroke: "#1565c0",
        })
      })
    },
    // 鼠标离开节点区域时隐藏连接桩
    onMouseleave() {
      const node = this.getNode();
      const ports = node.getPorts();
      ports.forEach((port) => {
        node.setPortProp(port.id, 'attrs/circle', {
          stroke: "transparent",
          fill: "transparent"
        })
      })
    }
  },
}
</script>
<style lang="less" scoped></style>