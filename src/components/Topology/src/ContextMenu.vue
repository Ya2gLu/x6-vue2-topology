<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-27 14:24:18
 * @LastEditTime : 2025-03-15 13:49:30
 * @LastEditors  : ya2glu
 * @Description  : 右键菜单
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\ContextMenu.vue
-->
<template>
  <div ref="ctxMenu" v-show="isOpened">
    <ul class="context-menu">
      <li class="context-menu-item" v-for="(items, index) in menuItems" :key="index">
        <button class="context-menu-button" @click="handleClick(items.key)">
          {{ items.content }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",

  data() {
    return {
      isOpened: false,
      target: "",
      menuItems: [
        {
          key: "edit",
          content: "编辑",
          events: {},
        },
        {
          key: "copy",
          content: "复制",
          events: {},
        },
        {
          key: "delete",
          divider: "top",
          content: "删除",
          events: {},
        },
        {
          key: "panel",
          content: "详情",
          events: {},
        },
      ],
      menuItemsNode: [],
    };
  },

  mounted() {},

  methods: {
    openMenu(e) {
      console.log("e ->", e);
      const ctxMenu = this.$refs.ctxMenu;
      if (!e) {
        return;
      } else {
        const { x, y } = e.originalEvent;
        ctxMenu.setAttribute(
          "style",
          `--top: ${y}px;
            --left: ${x}px;
            `
        );
        return (this.isOpened = true);
      }
    },
    closeMenu() {
      this.isOpened = false;
    },

    handleClick(key) {
      console.log(`click menu of ${key}`);
      return null;
    },
  },
};
</script>

<style lang="less" scoped>
.context-menu {
  position: fixed;
  top: var(--top);
  left: var(--left);

  min-height: 180px;
  min-width: 120px;

  background: var(--panel-float-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--panel-edge);

  animation: menuAnimation 0.4s 0s both;
  transform-origin: left;
  list-style: none;
  margin: 4px;
  padding: 0;

  display: flex;
  flex-direction: column;
  z-index: 999;
  box-shadow: var(--panel-float-shadow);
  &-item {
    position: relative;
    padding: 4px;
  }

  &-item[data-divider="top"] {
    border-top: 1px solid;
  }

  &-item[data-divider="bottom"] {
    border-bottom: 1px solid;
  }

  &-item[data-divider="top-bottom"] {
    border-top: 1px solid;
    border-bottom: 1px solid;
  }

  &-item[data-divider] {
    border-color: var(--panel-divider);
  }

  &-button {
    color: var(--panel-icon);
    background: transparent;
    border: 0;
    white-space: nowrap;
    width: 100%;
    border-radius: 4px;
    padding: 6px 24px 6px 7px;
    text-align: left;

    display: flex;
    align-items: center;
    font-size: 14px;
    width: 100%;
    animation: menuItemAnimation 0.2s 0s both;
    font-family: "Inter", sans-serif;
    cursor: pointer;

    &:hover {
      background-color: var(--panel-summary-hover-bg);
    }
  }
}
@keyframes menuAnimation {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }

  100% {
    height: var(--height);
    opacity: 1;
    border-radius: 8px;
    transform: scale(1);
  }
}

@keyframes menuItemAnimation {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
