/*
 * @Author       : ya2glu@163.com
 * @Date         : 2023-05-31 23:14:01
 * @LastEditTime : 2025-03-24 22:27:02
 * @LastEditors  : ya2glu
 * @Description  : ports连接桩默认定义
 * @FilePath     : \x6-vue2-topology\src\components\Topology\src\utils\ports.ts
 */
export const ports = {
  groups: {
    top: {
      position: "top",
      attrs: {
        circle: {
          magnet: true,
          stroke: "#1565C0",
          strokeWidth: 2,
          fill: "#141414",
          r: 3,
        },
      },
      label: {
        position: "top",
      },
    },
    bottom: {
      position: "bottom",
      attrs: {
        circle: {
          magnet: true,
          stroke: "#1565C0",
          strokeWidth: 2,
          fill: "#141414",
          r: 3,
        },
      },
      label: {
        position: "bottom",
      },
    },
    left: {
      position: "left",
      attrs: {
        circle: {
          magnet: true,
          stroke: "#1565C0",
          strokeWidth: 2,
          fill: "#141414",
          r: 3,
        },
      },
      label: {
        position: "left",
      },
    },
    right: {
      position: {
        name: "right",
        args: {
          x: 0,
          y: 0,
        },
      },
      attrs: {
        circle: {
          magnet: true,
          stroke: "#1565C0",
          strokeWidth: 2,
          fill: "#141414",
          r: 3,
        },
      },
      label: {
        position: "right",
      },
    },
  },
};
