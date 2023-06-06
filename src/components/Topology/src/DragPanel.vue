<!--
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-24 16:21:01
 * @LastEditTime : 2023-06-05 17:34:53
 * @LastEditors  : ya2glu
 * @Description  : 图形拖拽区
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/DragPanel.vue
-->
<template>
  <div ref="dndContainer" class="dnd-container">
    <div v-for="(sub, index) in list" :key="index">
      <a-tooltip :title="sub.label" :mouseEnterDelay="0.8">
        <div class="sub-item" @mousedown="startDarg(sub.type, $event)">
          <icon-park :type="sub.type" theme="outline" size="28" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>

<script>
  import { Graph } from '@antv/x6'
  import { Dnd } from '@antv/x6-plugin-dnd'
  import { IconPark } from '@icon-park/vue/es/all'
  import ExampleNode from './modules/ExampleNode.vue'
  import { TopoNode, topoRegister } from './registerShape'
  // MEMO: Register VUE Node
  topoRegister()

  export default {
    name: 'DragPanel',
    components: {
      IconPark,
      TopoNode,
      ExampleNode,
    },
    props: {
      graph: {
        type: Graph,
        required: true,
      },
    },
    data() {
      return {
        dnd: null,
        list: [
          {
            id: '1',
            label: '客户端',
            type: 'new-computer',
          },
          {
            id: '2',
            label: '服务器',
            type: 'Server',
          },
          {
            id: '3',
            label: '路由器',
            type: 'Router-one',
          },
          {
            id: '4',
            label: '硬盘',
            type: 'Hard-disk',
          },
          {
            id: '5',
            label: '终端',
            type: 'Terminal',
          },
        ],
      }
    },

    mounted() {
      this.initDnd()
    },

    methods: {
      initDnd() {
        this.dnd = new Dnd({
          target: this.graph,
          dndContainer: this.$refs.dndContainer,
          // MEMO: 拖拽开始时，获取被拖拽的节点，
          getDragNode: node => {
            console.log('node -->', node)
            return node.clone()
          },
        })
      },
      // 开始拖拽时显示拖拽节点
      startDarg(type, $event) {
        console.log('startDarg -->', type, $event)
        // MEMO: 创建节点时需要指定节点宽高，不然不会显示拖拽节点
        const node = this.graph.createNode({
          shape: 'topo-vue-node',
          component: TopoNode,
          width: 64,
          height: 64,
          data: {
            types: type,
          },
          // ports默认不可见
          ports: {
            items: [
              {
                group: 'top',
                args: {
                  dx: 1.5,
                  dy: -1.5,
                },
              },
              {
                group: 'bottom',
                args: {
                  dx: 1.5,
                  dy: 5,
                },
              },
              {
                group: 'left',
                args: {
                  dx: -1.5,
                },
              },
              {
                group: 'right',
                args: {
                  dx: 5,
                },
              },
            ],
          },
        })

        this.dnd.start(node, $event)
      },
    },
  }
</script>

<style lang="less" scoped>
  .dnd-container {
    grid-row: 3 / span 4;
    grid-column: 3 / span 8;
    z-index: 99;

    border-radius: 20px;
    box-shadow: 2px 2px 10px 5px #0d0d0d;
    backdrop-filter: blur(10px);
    background-color: rgba(31, 31, 31, 0.3);

    display: flex;
    align-items: center;
    justify-content: space-around;

    .sub-item {
      width: 64px;
      height: 64px;
      background-color: #141414;
      border-radius: 20px;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
