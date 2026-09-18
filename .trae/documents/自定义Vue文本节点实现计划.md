# 自定义 Vue 文本节点实现计划

## Context

`Topology.vue` 的 `createTextNode` 中存在 TODO：`// TODO: 使用自定义vue节点创建text文本块`，且 `// component: TextShape,` 被注释。当前文本节点用的是 X6 内置 `text-block` 形状，而 [TextShape.vue](file:///d:/workspace/code/x6-vue2-topology/src/components/Topology/src/modules/shapes/TextShape.vue) 虽已在 [registerShape.ts](file:///d:/workspace/code/x6-vue2-topology/src/components/Topology/src/utils/registerShape.ts#L21-L26) 注册为 `vue-text-shape`，但内部是空壳，从未被实际使用。

本次需求：
1. 真正实现 `TextShape.vue` 为可用的 Vue2 自定义文本节点
2. 文本节点可拖拽**嵌入父节点**（embed），作为子节点跟随父节点移动
3. 文本展示时**自动换行**（word-wrap），不需要手动 Enter 换行的复杂编辑逻辑

## 设计要点

- **编辑方式**：双击文本节点进入 `contenteditable` 编辑，blur 或 Enter 退出，文本存到 `node.data.text`。拦截 Enter 防止手动换行（符合"仅展示自动换行"选择），换行由 CSS `word-break` 在超宽时自动发生。
- **嵌入父节点**：启用 X6 的 `embedding` 配置，拖动文本节点到其他非文本节点上方时自动 `embed` 为子节点，父节点移动时子节点跟随（X6 默认行为）。
- **不用 X6 label / node-editor**：文本完全由 Vue 组件渲染，避免与 X6 内置 label 重复显示。去掉 `topology.json` 中的 `attrs.label` 和 `tool.node-editor`。
- **不引入新依赖**：复用现有 `@antv/x6-vue-shape` 注册机制和 X6 内置 `embedding` 能力。

## 改动文件

### 1. `src/components/Topology/src/modules/shapes/TextShape.vue`（重写）

参考 [TopoNode.vue](file:///d:/workspace/code/x6-vue2-topology/src/components/Topology/src/modules/TopoNode.vue#L23-L61) 的 `inject: ["getNode", "getGraph"]` 模式。

核心逻辑：
- `mounted` 中从 `node.getData().text` 读取初始文本，监听 `node.on("change:data")` 同步外部修改
- `dblclick` 进入编辑：`isEditing = true`，`contenteditable` 生效，`$nextTick` 聚焦并全选
- `blur` 或 `keydown.enter.exact.prevent` 退出编辑：读取 `innerText` 写回 `node.setData({ text })`
- CSS：`white-space: pre-wrap; word-break: break-word;` 实现超宽自动换行；编辑态加蓝色虚线边框；非编辑态 `cursor: move` 让 X6 接管拖拽
- 文本白色 18px，背景透明，padding 4-6px

### 2. `src/config/topology.json`（修改 textNode 节）

把 [textNode](file:///d:/workspace/code/x6-vue2-topology/src/config/topology.json#L68-L86) 改为：

```json
"textNode": {
  "shape": "vue-text-shape",
  "width": 120,
  "height": 40,
  "data": { "text": "双击编辑" },
  "selection": {
    "borderRadius": 0,
    "border": "1px dashed #3A78DB"
  }
}
```

删除 `attrs`（body/label 由 Vue 组件渲染）和 `tool`（编辑逻辑移入组件）。

### 3. `src/views/Topology/Topology.vue`（修改三处）

**(a) `initGraph` 中新增 `embedding` 配置**（[L153-L183](file:///d:/workspace/code/x6-vue2-topology/src/views/Topology/Topology.vue#L153-L183)）：

```js
embedding: {
  enabled: true,
  findParent: ({ node }) => {
    if (node.shape === "vue-text-shape") {
      return this.graph
        .getNodesUnderNode(node)
        .filter((n) => n.shape !== "vue-text-shape");
    }
    return [];
  },
},
```

仅文本节点拖到其他类型节点上方时吸附嵌入，避免文本节点互相嵌套。

**(b) `createTextNode` 改用新形状**（[L210-L228](file:///d:/workspace/code/x6-vue2-topology/src/views/Topology/Topology.vue#L210-L228)）：

- `shape` 改为 `topoConfig.textNode.shape`（即 `vue-text-shape`）
- 删除被注释的 `// component: TextShape`（registerShape 已绑定组件）
- 删除 `attrs` 与 `tools` 字段
- 新增 `data: { text: topoConfig.textNode.data.text }`

**(c) shape 判断字符串替换**：
- [L86](file:///d:/workspace/code/x6-vue2-topology/src/views/Topology/Topology.vue#L86) `node:selected` 中 `node.shape == "text-block"` → `"vue-text-shape"`
- [L116](file:///d:/workspace/code/x6-vue2-topology/src/views/Topology/Topology.vue#L116) `cell:change:attrs` 监听里的 `cell.shape == "text-block"` → `"vue-text-shape"`；该分支读取 `current.text.text` 的逻辑改为读取 `cell.getData().text`（因为不再用 attrs.text 存储），同步写回 `setData`

### 4. `src/components/Topology/src/utils/registerShape.ts`（无需改动）

`vue-text-shape` 已注册，复用现有定义。

## 不在范围内

- 不新增 ports（嵌入父节点不需要 magnet 端口）
- 不新增 `@antv/x6-plugin-snapline` 依赖
- 不重构 `TitleBar.vue` 文本按钮触发逻辑（保持现状）

## 验证方式

1. `npm run dev` 启动开发服务器
2. 进入拓扑图页面，点击工具栏「文本」按钮，按钮高亮
3. 在画布空白处双击 → 出现文本节点，默认显示「双击编辑」
4. 双击文本节点 → 进入编辑态（蓝色虚线边框），输入文字，按 Enter 或点击外部退出
5. 输入较长文字 → 文本在节点宽度内自动换行显示
6. 拖动文本节点到 TopoNode/ServerNode 上方 → 自动嵌入为子节点（肉眼可见无视觉变化，但移动父节点时文本节点跟随移动）
7. 拖动文本节点离开父节点 → 解除嵌入
8. 选中文本节点 → 选择框为蓝色虚线（`text-node-selection` 样式）
9. 切换深色/浅色主题 → 文本颜色随主题变化（用 CSS 变量 `--app-fg`）
