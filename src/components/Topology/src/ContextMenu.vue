<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-29 16:10:53
 * @LastEditTime : 2023-06-06 17:19:59
 * @LastEditors  : ya2glu
 * @Description  : ContextMenu
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/ContextMenu.vue
-->
<template>
  <div ref="ctxMenu" v-show="isOpened">
    <ul class="context-menu">
      <li class="context-menu-item" v-for="(items, index) in menuItems">
        <button class="context-menu-button" @click="handleClick(items.key)">{{ items.content }}</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ContextMenu',

    data() {
      return {
        isOpened: false,
        target: '',
        menuItems: [
          {
            key: 'edit',
            content: 'Edit',
            events: {},
          },
          {
            key: 'copy',
            content: 'Copy',
            events: {},
          },
          {
            key: 'delete',
            content: 'Delete',
            events: {},
          },
          {
            key: 'panel',
            content: 'Panel',
            events: {}
          }
        ],
        menuItemsNode: [],
      }
    },

    mounted() {},

    methods: {
      openMenu(e) {
        console.log('e ->', e)
        const ctxMenu = this.$refs.ctxMenu
        if (!e) {
          return
        } else {
          const { x, y } = e.originalEvent
          ctxMenu.setAttribute(
            'style',
            `--top: ${y}px;
            --left: ${x}px;
            `
          )
          return (this.isOpened = true)
        }
      },
      closeMenu() {
        this.isOpened = false
      },

      handleClick(key) {
        console.log(`click menu of ${key}`);
        return null
      }
    },
  }
</script>

<style lang="less" scoped>
  .context-menu {
    --menu-border: rgba(255, 255, 255, 0.08);
    --menu-bg: linear-gradient(45deg, rgba(5, 9, 14, 0.2) 0%, rgba(5, 9, 14, 0.7) 100%);
    --item-border: rgba(255, 255, 255, 0.1);
    --item-color: #fff;
    --item-bg-hover: rgba(255, 255, 255, 0.1);

    position: fixed;
    top: var(--top);
    left: var(--left);

    min-height: 180px;
    min-width: 120px;
    
    // overflow: hidden;
    background: var(--menu-bg);
    backdrop-filter: blur(10px);
    
    animation: menuAnimation 0.4s 0s both;
    transform-origin: left;
    list-style: none;
    margin: 4px;
    padding: 0;

    display: flex;
    flex-direction: column;
    z-index: 999999999;
    box-shadow: 0 0 0 1px var(--menu-border), 0 2px 2px rgb(0 0 0 / 3%), 0 4px 4px rgb(0 0 0 / 4%), 0 10px 8px rgb(0 0 0 / 5%), 0 15px 15px rgb(0 0 0 / 6%), 0 30px 30px rgb(0 0 0 / 7%),
      0 70px 65px rgb(0 0 0 / 9%);

    &-item {
      position: relative;
      padding: 4px;
      
    }

    &-item[data-divider='top'] {
      border-top: 1px solid;
    }

    &-item[data-divider='bottom'] {
      border-bottom: 1px solid;
    }

    &-item[data-divider='top-bottom'] {
      border-top: 1px solid;
      border-bottom: 1px solid;
    }

    &-item[data-divider] {
      border-color: var(--item-border);
    }

    &-button {
      color: var(--item-color);
      background: 0;
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
      font-family: 'Inter', sans-serif;
      cursor: pointer;

      &:hover {
        background-color: var(--item-bg-hover);
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
