<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:21:01
 * @LastEditTime : 2023-06-27 18:37:01
 * @LastEditors  : ya2glu
 * @Description  : 在线设备
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/OnlinePanel.vue
-->
<template>
  <div ref="dndContainer" class="dnd-container">
    <div v-for="(items, i) in onlineList" :key="i">
      <a-tooltip :title="items.label" :mouseEnterDelay="0.5" placement="top">
        <div class="bg-dark-900 h-64px w-64px flex justify-center items-center rounded-2xl cursor-pointer">
          <div :class="items.type" class="p-4 bg-light-400"></div>
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { Graph } from "@antv/x6";
export default {
  name: "OnlinePanel",
  components: {
  },
  props: {
    graph: {
      type: Graph,
      required: true,
    },
    onlineList: {
      type: Array,
      default: () => {
        return [
          {
            key: "device",
            label: "设备",
            type: "y-clarity:devices-line",
          },
          {
            key: "service",
            label: "服务器",
            type: "y-solar:server-2-line-duotone"
          },
          {
            key: "hardware",
            label: "硬件",
            type: "y-ion:hardware-chip-outline"
          }
        ]
      }
    }
  },
  data() {
    return {
      dnd: null,
    };
  },

  mounted() {
  },

  methods: {
  },
};
</script>

<style lang="less" scoped>
.dnd-container {
  grid-row: 6 / span 12;
  grid-column: 3 / span 20;
  z-index: 99;
  border-radius: 16px;
  box-shadow: 2px 2px 10px 5px #0d0d0d;
  backdrop-filter: blur(10px);
  background-color: rgba(37, 37, 37, 0.3);

  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
