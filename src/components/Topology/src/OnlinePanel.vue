<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:21:01
 * @LastEditTime : 2025-12-06 17:24:21
 * @LastEditors  : ya2glu
 * @Description  : online components
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\OnlinePanel.vue
-->
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

<template>
  <!-- online container -->
  <div grid grid-rows-12 grid-cols-12 w-full h-full row-start-20 row-span-3 col-start-6 col-span-12>
    <!-- dnd container -->
    <div 
      class="online-panel-shell row-start-6 row-span-12 col-start-3 col-span-20 z-[99] flex items-center justify-around p-6 gap-6 rounded-3xl">
      <div 
        v-for="(items, i) in onlineList" 
        :key="i" 
        :ref="getRef(i)"
        class="group flex flex-col items-center justify-center cursor-pointer p-4 rounded-2xl min-w-20 will-change-transform"
        :class="[
          'transition-transform duration-300 ease-out hover:-translate-y-1',
          i === selectIndex ? 'device-item-active' : ''
        ]"
        @click="handleNodeClick(items, i)">
        <div 
          class="online-panel-well w-16 h-16 flex items-center justify-center rounded-2xl relative overflow-hidden will-change-[background-color,border-color,box-shadow,transform]"
          :class="[
            'transition-[background-color,border-color,box-shadow] duration-300 ease-out'
          ]">
          <div 
            class="online-panel-gloss absolute inset-0 pointer-events-none will-change-opacity"
            :class="[
              'transition-opacity duration-300 ease-out',
              i === selectIndex ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            ]"></div>
          <i 
            :class="[
              items.type,
              'online-panel-icon text-[1.75rem] z-[1] relative will-change-[transform,opacity,filter]',
              'transition-[transform,opacity,filter] duration-300 ease-out',
              i === selectIndex ? 'opacity-100 drop-shadow-[0_0_8px_rgba(58,120,219,0.6)]' : 'opacity-85 group-hover:scale-110 group-hover:opacity-100'
            ]"></i>
        </div>
        <div class="hidden">
          {{ items.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.online-panel-shell {
  background: var(--panel-float-bg);
  border: 1px solid var(--panel-edge);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: var(--panel-float-shadow);
}

.online-panel-well {
  background: var(--panel-tile-bg);
  border: 1px solid var(--panel-tile-border);
  .group:hover:not(.device-item-active) & {
    background: linear-gradient(
      135deg,
      rgba(58, 120, 219, 0.2) 0%,
      rgba(58, 120, 219, 0.15) 100%
    );
    border-color: rgba(58, 120, 219, 0.5);
    box-shadow: 0 8px 24px rgba(58, 120, 219, 0.25),
      0 0 0 1px rgba(58, 120, 219, 0.2) inset;
  }
  .group.device-item-active & {
    background: linear-gradient(
      135deg,
      rgba(58, 120, 219, 0.3) 0%,
      rgba(58, 120, 219, 0.2) 100%
    );
    border-color: var(--accent);
    box-shadow: 0 0 0 2px rgba(58, 120, 219, 0.3), 0 8px 24px rgba(58, 120, 219, 0.35),
      0 0 0 1px rgba(58, 120, 219, 0.2) inset;
  }
}

.online-panel-gloss {
  background: var(--panel-well-gloss);
}

.online-panel-icon {
  color: var(--panel-icon);
}
</style>
