## 简介

x6-vue2-topology 是一个简单的网络拓扑图示例😀。

## 一些想法

原是公司运维项目的一个小模块：展示服务器资产的某些运行状态和告警信息。其实和网络拓扑图没啥真正的关联，要操作的是通过在线与节点交互操作实现控制实体服务器这样简单的需求而已。

不过因为项目经理的变更这个模块不再由我负责了。我自己觉得挺有趣的，也许可以再扩展一下，等以后有需要了可以直接拿来用。

技术采用vue2.7(公司技术选型落后于最新技术栈),目前还在想法探索阶段，ui和需求都是自己在做。

- 模仿现在流行的设计界面，自己动手设计实现一个完整的ui界面
- 功能不会做的很完整，但大体上看起来差不多就行
- 解决了自己的问题吗？我觉得如果按行进路程来算，我只实现了大概30%不到，剩下的70%有待思考

## 使用

使用 `yarn` 进行管理.
```git
yarn i
```
```git
yarn dev
```

## 参考
设计灵感参考：
- [Topology](https://dribbble.com/shots/18935120-Cisco-Network-Simulator-Redesign?utm_source=Clipboard_Shot&utm_campaign=grahacaesara&utm_content=Cisco%20Network%20Simulator%20Redesign&utm_medium=Social_Share&utm_source=Clipboard_Shot&utm_campaign=grahacaesara&utm_content=Cisco%20Network%20Simulator%20Redesign&utm_medium=Social_Share)
- [antv x6](https://x6.antv.antgroup.com/)
- [xterm](https://xtermjs.org/)

## 问题记录
- [ ] unocss下使用`Attributify`如何处理动态类的绑定?
