<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-07-03 09:24:01
 * @LastEditTime : 2025-04-06 17:55:58
 * @LastEditors  : ya2glu
 * @Description  : Server节点
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\modules\ServerNode.vue
-->
<template>
  <div class="wrapper">
    <div class="node-wrapper w-160px h-66px flex items-center bg-dark-400 rounded-2xl" @mouseenter="onMouseEnter"
      @mouseleave="onMouseleave">
      <div :class="record.icon" class="p-4 mx-4"></div>
      <div>{{ record.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "server-node",
  inject: ["getNode", "getGraph"],
  data() {
    return {
      record: this.getNode().data.record
    }
  },
  mounted() { },
  methods: {
    /**
     * 鼠标移入节点时的处理函数
     * @returns {void}
     */
    onMouseEnter() {
      const node = this.getNode();
      const ports = node.getPorts();
      // 设置ports的样式，突出显示连接桩
      ports.forEach((port) => {
        node.setPortProp(port.id, "attrs/circle", {
          fill: "#141414",
          stroke: "#1565c0",
        })
      })
      return;
    },
    /**
     * 鼠标移出节点时的处理函数
     * @returns {void}
     */
    onMouseleave() {
      const node = this.getNode();
      const ports = node.getPorts();
      // 还原ports的样式，恢复默认外观
      ports.forEach((port) => {
        node.setPortProp(port.id, 'attrs/circle', {
          stroke: "transparent",
          fill: "transparent"
        })
      })
      return;
    }
  },
}
</script>
<style lang="less" scoped></style>