<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-27 19:15:15
 * @LastEditTime : 2023-06-29 10:56:24
 * @LastEditors  : ya2glu
 * @Description  : 在线设备列表Modal
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/OnlinePopover.vue
-->
<template>
  <transition name="slide-fade">
    <div ref="popover" class="wrapper w-16em h-26em bg-dark-400 z-99 rounded-2xl" v-show="isShow">
      {{ params.label }}
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex"
export default {
  data() {
    return {
      params: {},
      isShow: false,
      getSelfHeight: null,
    }
  },
  computed: {
    // ...mapState('onlineModal', ['isShow'])
  },
  methods: {
    open(items, nodePos) {
      // console.log('eee ->', items, nodePos);
      this.params = items
      this.$nextTick(() => {
        this.setPosition(nodePos)
      })
      return this.isShow = true
    },

    setPosition(nodePos) {

      if (!nodePos) {
        return null
      } else {
        const popover = this.$refs.popover
        const { x, y, width } = nodePos
        const pHeight = popover.getBoundingClientRect().height || 364
        const finalX = x - width - 15
        const finalY = y - pHeight - 20
        popover.setAttribute("style", `--top: ${finalY}px; --left: ${finalX}px`)
      }

    },

    close() {
      return this.isShow = false;
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  position: fixed;
  top: var(--top);
  left: var(--left);
}
.slide-fade-enter-active {
  transition: all .5s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

</style>