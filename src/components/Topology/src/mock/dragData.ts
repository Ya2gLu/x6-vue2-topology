export const shapeList = [
  {
    id: 1,
    summary: '基础形状',
    status: 'closed',
    children: [
      {
        id: 1,
        name: 'rect',
        label: '矩形',
        icon: 'y-material-symbols-light:square-outline',
        isTopo: false
      },
      {
        id: 2,
        name: 'square',
        label: '圆角矩形',
        icon: 'y-material-symbols-light:square-outline-rounded',
        isTopo: false
      },
      {
        id: 3,
        name: 'line',
        label: '直线',
        icon: 'y-tabler:slash',
        isTopo: false
      },
      {
        id: 4,
        name: 'arrow',
        label: '箭头',
        icon: 'y-mynaui:arrow-long-up-right',
        isTopo: false
      }
    ]
  },
  {
    id: 2,
    summary: '拓扑形状',
    status: 'closed',
    children: [
      {
        id: 1,
        name: 'router',
        label: '路由器',
        icon: 'y-solar:wi-fi-router-minimalistic-linear',
        isTopo: true
      },
      {
        id: 2,
        name: 'switch',
        label: '交换机',
        icon: 'y-clarity:network-switch-outline-badged',
        isTopo: true
      },
      {
        id: 3,
        name: 'server',
        label: '服务器',
        icon: 'y-solar:server-2-line-duotone',
        isTopo: true
      },
      {
        id: 4,
        name: 'pc',
        label: '电脑',
        icon: 'y-majesticons:desktop-computer-line',
        isTopo: true
      },
      {
        id: 5,
        name: 'laptop',
        label: '笔记本电脑',
        icon: 'y-material-symbols-light:computer-outline',
        isTopo: true
      },
      {
        id: 6,
        name: 'mobile',
        label: '手机',
        icon: 'y-circum:mobile-3',
        isTopo: true
      },
      {
        id: 7,
        name: 'firewall',
        label: '防火墙',
        icon: 'y-mdi:wall-fire',
        isTopo: true
      },
      {
        id: 8,
        name: 'wifi',
        label: '无线网络',
        icon: 'y-material-symbols-light:wifi-sharp',
        isTopo: true
      }
    ]
  }
]

export const deviceTreeList = [
  {
    id: 1,
    type: "",
    text: "Node1",
    children: []
  },
  {
    id: 2,
    type: "",
    text: "Node2",
    children: []
  }
]