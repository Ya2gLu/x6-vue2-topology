<!--
 * @Author       : ya2glu@163.com
 * @Description  : 文本节点组件，用于在拓扑图中显示可编辑的多行文本
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\modules\shapes\TextShape.vue
-->
<template>
  <div
    ref="root"
    class="vue-text-shape"
    :class="classes"
    :contenteditable="isEditing"
    @dblclick="enterEdit"
    @blur="onBlur"
    @keydown.enter.exact.prevent="commitEdit"
    @keydown.esc.prevent="cancelEdit"
    @input="onInput"
  ></div>
</template>

<script>
import topoConfig from "@/config/topology.json";

const PLACEHOLDER = topoConfig.textNode.data.text;

export default {
  name: "text-shape",
  inject: ["getNode", "getGraph"],
  data() {
    return {
      text: "",
      isEditing: false,
      isNew: false,
    };
  },
  computed: {
    isPlaceholder() {
      return !this.text || this.text === PLACEHOLDER;
    },
    displayText() {
      return this.isPlaceholder ? PLACEHOLDER : this.text;
    },
    classes() {
      return {
        editing: this.isEditing,
        placeholder: this.isPlaceholder && !this.isEditing,
      };
    },
  },
  watch: {
    displayText(val) {
      if (!this.isEditing) {
        this.$refs.root.innerText = val;
      }
    },
  },
  mounted() {
    const node = this.getNode();
    const data = node.getData() || {};
    const initial = data.text;
    this.text = initial && initial !== PLACEHOLDER ? initial : "";
    this.$refs.root.innerText = this.displayText;
    if (data.autoFocus) {
      this.isNew = true;
      this.$nextTick(() => this.enterEdit());
    }
    node.on("change:data", ({ current }) => {
      if (!this.isEditing && current && typeof current.text === "string") {
        const val = current.text;
        this.text = val && val !== PLACEHOLDER ? val : "";
      }
    });
  },
  methods: {
    onInput() {
      // 输入时直接同步到 this.text，避免 Vue 渲染层干扰
      // 但不调用 setData，防止 change:data 反向触发重渲染
    },
    enterEdit() {
      const wasPlaceholder = this.isPlaceholder;
      this.isEditing = true;
      const el = this.$refs.root;
      el.innerText = wasPlaceholder ? "" : this.text;
      this.$nextTick(() => {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
    },
    onBlur() {
      if (!this.isEditing) return;
      const raw = this.$refs.root.innerText.replace(/\n+/g, "\n").trim();
      this.finalize(raw);
    },
    commitEdit() {
      if (!this.isEditing) return;
      const raw = this.$refs.root.innerText.replace(/\n+/g, "\n").trim();
      this.finalize(raw);
    },
    cancelEdit() {
      if (!this.isEditing) return;
      if (this.isNew) {
        this.removeSelf();
        return;
      }
      // 取消编辑：恢复原 text，不写入 setData 改变值
      this.isEditing = false;
      this.isNew = false;
      this.$refs.root.innerText = this.displayText;
    },
    finalize(raw) {
      if (!raw) {
        if (this.isNew) {
          this.removeSelf();
          return;
        }
        this.text = "";
        this.getNode().setData({ text: "" });
      } else {
        this.text = raw;
        this.getNode().setData({ text: raw });
      }
      this.isEditing = false;
      this.isNew = false;
    },
    removeSelf() {
      const node = this.getNode();
      node.removeTools();
      node.remove();
    },
  },
};
</script>

<style lang="less" scoped>
.vue-text-shape {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 4px 6px;
  color: var(--app-fg, #fff);
  font-size: 18px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
  outline: none;
  cursor: move;
  user-select: none;
  overflow: hidden;

  &.placeholder {
    color: var(--text-placeholder, rgba(255, 255, 255, 0.35));
  }

  &.editing {
    cursor: text;
    user-select: text;
    color: var(--app-fg, #fff);
    background: transparent;
    // outline: 1px dashed #3a78db;
    outline-offset: -1px;
  }
}
</style>
