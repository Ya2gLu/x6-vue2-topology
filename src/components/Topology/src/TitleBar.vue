<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 16:09:11
 * @LastEditTime : 2023-06-02 18:25:06
 * @LastEditors  : ya2glu
 * @Description  : TitleBar
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/TitleBar.vue
-->
<template>
  <div class="title-bar-container">
    <div class="item-left">1</div>
    <div class="item-center">2</div>
    <div class="item-right">
      <a-tooltip title="侧边栏" :mouseEnterDelay="0.8">
        <div class="toggle-right">
          <icon-park class="icons" type="right-bar" theme="outline" size="20" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
  import { IconPark } from '@icon-park/vue/es/all'
  export default {
    components: {
      IconPark,
    },
    data() {
      return {}
    },
  }
</script>
<style lang="less" scoped>
  .title-bar-container {
    height: 100%;
    width: 100%;

    z-index: 99;

    background-color: rgba(31, 31, 31, 0.3);
    backdrop-filter: blur(10px);
    border-bottom: 2px solid rgba(49, 49, 49, 0.3);

    display: flex;
    justify-content: space-between;
    align-items: center;

    .item-left {
      height: 100%;
      width: 20%;
      // border: 1px dashed #fff;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item-center {
      height: 100%;
      width: 30%;
      // border: 1px dashed #fff;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .item-right {
      height: 100%;
      width: 20%;
      // border: 1px dashed #fff;

      display: flex;
      justify-content: start;
      align-items: center;

      .toggle-right {
        cursor: pointer;
        border: 2px solid rgb(53, 51, 52);
        border-radius: 10px;

        padding: 5px 10px;

        .icons {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        &:hover {
          background-color: rgb(53, 51, 52);
        }
      }
    }
  }
</style>