<script>
import { Graph } from "@antv/x6";
import {
    OnlinePanel,
    ContextMenu,
    TitleBar,
    SidePanel,
    DragPanel,
    OnlinePopover
} from "@/components/Topology";
export default {
    name: "y-topology",
    components: {
        OnlinePanel,
        ContextMenu,
        TitleBar,
        SidePanel,
        DragPanel,
        OnlinePopover
    },

    data() {
        return {
            onlineKey: '', // 记录在线点击的key
            graph: null,
            grid: {
                visible: true,
                size: 25,
                type: "dot",
                args: {
                    color: "#373536",
                    thickness: 4,
                },
            },
            // 高亮选项
            highlighting: {
                // 连接桩可以被连接时在连接桩外围渲染一个包围框
                magnetAvailable: {
                    name: "stroke",
                    args: {
                        padding: 0,
                        attrs: {
                            "stroke-width": 2.5,
                            stroke: "#3A78DB",
                        },
                    },
                },
                // 连接桩吸附连线时在连接桩外围渲染一个包围框
                magnetAdsorbed: {
                    name: "stroke",
                    args: {
                        padding: 0,
                        attrs: {
                            "stroke-width": 2.5,
                            stroke: "#3a78db",
                        },
                    },
                },
            },
        };
    },

    mounted() {
        this.initGraph();
        // Cell节点右键回调
        this.graph.on("cell:contextmenu", this.contextMenu);

        this.graph.on("node:selected", ({ node }) => {
            const EdgesArr = this.graph.getConnectedEdges(node);
            EdgesArr.forEach(ele => {
                ele.setAttrs({
                    line: {
                        stroke: "#3A78DB"
                    }
                })
            });
        })
        this.graph.on("node:unselected", ({ node }) => {
            const EdgesArr = this.graph.getConnectedEdges(node)
            EdgesArr.forEach(ele => {
                ele.setAttrs({
                    line: {
                        stroke: "#343434"
                    }
                })
            })
        })
    },

    methods: {
        initGraph() {
            const that = this;
            window.__x6_instances__ = [] // 开发时控制台调试使用
            that.graph = new Graph({
                container: document.getElementById("svg-container"),
                autoResize: true, // 是否监听容器大小改变，并自动更新画布大小
                grid: that.grid,  // 网格，默认使用 10px 的网格，但不绘制网格背景。
                panning: { // 支持鼠标右键平移
                    enabled: true,
                    eventTypes: ['rightMouseDown']
                },
                selecting: true,
                // 设置画布缩放级别
                scaling: {
                    min: 0.9,
                    max: 1.5,
                },
                // Edge Options
                connecting: {
                    snap: {
                        radius: 20,
                    },
                    highlight: true,
                    allowNode: false,  // 是否允许连接到画布空白位置的点
                    allowLoop: false,  // 是否允许创建循环连线，即边的起始点和终止节点为同一节点
                    allowEdge: false,  // 是否允许边连接到另一个边
                    allowBlank: false, // 是否允许连接到画布空白位置的点
                    allowPort: true,   // 是否允许边连接到连接桩
                    allowMulti: true,  // 是否允许在相同的起始节点和终止之间创建多条边
                    router: "manhattan", // 曼哈顿路由
                    // 连接桩样式
                    connector: {
                        name: "rounded",
                        args: {
                            radius: 8,
                        },
                    },
                    anchor: "center",
                    connectionPoint: "boundary",
                    // 创建从节点中拉出的边
                    createEdge() {
                        return this.createEdge({
                            shape: "edge",
                            attrs: {
                                line: {
                                    stroke: "#343434",
                                    strokeDasharray: "5 5",
                                    strokeWidth: 2,
                                    // Marker style
                                    targetMarker: {
                                        name: "path",
                                        width: 5,
                                        height: 0,
                                    },
                                    style: {
                                        animation: 'ant-line 31s infinite linear',
                                    }
                                },
                            },
                        });
                    },
                },
                highlighting: that.highlighting,
            });
            window.__x6_instances__.push(that.graph)
        },
        editNode() {
            console.log("edit...");
            return null;
        },

        contextMenu({ cell, view, e }) {
            return this.$refs.ctxMenu.openMenu(e);
        },

        handleGraphClick() {
            // 关闭右键菜单
            if (this.$refs.ctxMenu.isOpened) this.$refs.ctxMenu.isOpened = false;
        },

        handleOnlineNode(items, nodePos) {
            console.log(items);
            if (this.onlineKey !== items.key) {
                this.onlineKey = items.key
                return this.$refs.popover.open(items, nodePos)
            } else {
                this.onlineKey = ""
                return this.$refs.popover.close()
            }
        }
    },
    watch: {},
};
</script>

<template>
    <!-- root container -->
    <div class="max-w-full min-h-screen w-screen h-screen overflow-hidden relative grid grid-rows-24 grid-cols-24">
        <!-- background container -->
        <div id="bgc-svg" class="absolute w-full h-full">
            <div id="svg-container" class="relative h-full w-full" @click="handleGraphClick" />
        </div>
        <!-- titlebar component -->
        <title-bar v-if="graph" :graph="graph" />
        <!-- dragPanel component -->
        <drag-panel v-if="graph" :graph="graph" />
        <!-- onlinePanel component -->
        <online-panel v-if="graph" :graph="graph" @handleOnlineNode="handleOnlineNode" />
        <!--  -->
        <side-panel v-if="graph" />
        <context-menu ref="ctxMenu" />
        <online-popover ref="popover" v-if="graph" :graph="graph" />
    </div>
</template>
<style lang="less" scoped></style>
