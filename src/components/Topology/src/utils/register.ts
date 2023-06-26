/*
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-25 09:06:12
 * @LastEditTime : 2023-06-25 09:26:26
 * @LastEditors  : ya2glu
 * @Description  : 注册事件
 * @FilePath     : /x6-vue2-topology/src/components/Topology/src/utils/register.ts
 */
import { Graph } from "@antv/x6";

Graph.registerEdge("dag-edge", {
  inherit: "edge",
  attrs: {
    attrs: {
      line: {
        stroke: "#C2C8D5",
        strokeWidth: 2,
        targetMarker: null,
      },
    },
  },
});

// export default;
