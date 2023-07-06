<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:21:01
 * @LastEditTime : 2023-07-01 23:34:00
 * @LastEditors  : ya2glu
 * @Description  : 在线设备
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/OnlinePanel.vue
-->
<template>
  <div class="dnd-container">
    <div v-for="(items, i) in onlineList" :key="i" :ref="getRef(i)"
      class="group/item flex flex-col items-center cursor-pointer" @click="handleNodeClick(items, i)">
      <div class="bg-dark-800 h-64px w-64px flex justify-center items-center rounded-2xl group-hover/item:bg-dark-200">
        <div :class="items.type" class="p-4 bg-light-400"></div>
      </div>
      <div class="text-light-400 pt-1" :class="{ active: i === selectIndex }">{{ items.label }}</div>
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
      selectIndex: -1,
      isSelected: false,
      refs: {}
    };
  },

  mounted() {
    for (const index in this.onlineList) {
      this.refs[index] = this.getRef(index)
    }
  },

  methods: {
    getRef(i) {
      return `nodeRef${i}`
    },

    handleNodeClick(items, index) {
      this.selectIndex = index
      // MEMO: 这里i是 string, index 是 number.
      for (let i in this.refs) {
        // console.log('i', i, 'index', index);
        if (index == i) {

          const refName = this.refs[i]
          const node = this.$refs[refName][0]
          // MEMO: 这里获取的是点击的元素相对于视口的位置.
          const nodePos = node.getBoundingClientRect()
          return this.$emit('handleOnlineNode', items, nodePos)

        }
      }
      return
    }
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
  background-color: rgba(56, 56, 56, 0.3);

  display: flex;
  align-items: center;
  justify-content: space-around;
}

.active {
  color: #3A78DB;
}
</style>
