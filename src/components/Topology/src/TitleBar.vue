<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-02 16:09:11
<<<<<<< HEAD
 * @LastEditTime : 2023-06-20 09:27:04
=======
 * @LastEditTime : 2023-06-09 15:27:10
>>>>>>> e400eb53d1d2ba9bb9cc563bc98fde1131445f4e
 * @LastEditors  : ya2glu
 * @Description  : TitleBar
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/TitleBar.vue
-->
<template>
  <div class="title-bar-container">
    <div class="item-left">
<<<<<<< HEAD
      <div class="btn-toggle">
        <icon-park class="icons" type="left-bar" theme="outline" size="20" />
      </div>
    </div>
    <div class="item-center">
      <div v-for="(ico, index) in toolsList" :key="index">
        <div class="icon-box btn-toggle">
          <icon-park class="icons" :type="ico.type" theme="outline" size="20" />
        </div>
      </div>
    </div>
=======
      <div class="toggle-left">
        <icon-park class="icons" type="left-bar" theme="outline" size="20" />
      </div>
    </div>
    <div class="item-center">2</div>
>>>>>>> e400eb53d1d2ba9bb9cc563bc98fde1131445f4e
    <div class="item-right">
      <a-tooltip title="侧边栏" :mouseEnterDelay="0.8">
        <div
          class="btn-toggle"
          @click="toggleLeft"
          :class="{ active: this.$store.state.titleBar.sideToggle }"
        >
          <icon-park class="icons" type="right-bar" theme="outline" size="20" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { IconPark } from "@icon-park/vue/es/all";
export default {
  components: {
    IconPark,
  },
  props: {
    toolsList: {
      type: Array,
      default: () => {
        return [
          {
            key: "focus",
            label: "focus",
            type: "Add-four",
          },
          {
            key: "selection",
            label: "selection",
            type: "Zoom-internal",
          },

          {
            key: "zoom-in",
            label: "zoom-in",
            type: "Zoom-in",
          },
          {
            key: "zoom-out",
            label: "zoom-out",
            type: "Zoom-out",
          },
          {
            key: "delete",
            label: "delete",
            type: "Close-one",
          },
          {
            key: "undo",
            label: "undo",
            type: "Undo",
          },
          {
            key: "redo",
            label: "redo",
            type: "Redo",
          },
          {
            key: "export",
            label: "export",
            type: "Logout",
          },
          {
            key: "keyboard",
            label: "keyboard",
            type: "Keyboard",
          },
        ];
      },
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapMutations("titleBar", ["toggleLeft"]),
  },
};
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
    width: 21%;
    // border: 1px dashed #fff;

    display: flex;
    justify-content: end;
    align-items: center;
  }

  .item-center {
    height: 100%;
    width: 55%;
    // border: 1px dashed #fff;

    display: flex;
    justify-content: start;
    align-items: center;
  }

  .item-right {
    height: 100%;
    width: 25%;
    // border: 1px dashed #fff;

    display: flex;
    justify-content: start;
    align-items: center;
  }
}
.icons {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.active {
  background-color: rgb(53, 51, 52);
}

.btn-toggle {
  cursor: pointer;
  border: 2px solid rgb(53, 51, 52);
  border-radius: 10px;
  padding: 5px 10px;
}
.icon-box {
  margin: 0 5px;
}
</style>
