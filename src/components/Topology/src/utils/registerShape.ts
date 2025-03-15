import TopoNode from "../modules/VueCustomNode.vue";
import ServerNode from "../modules/ServerNode.vue"
import { register } from "@antv/x6-vue-shape";
import { ports } from "./ports";

const topoRegister = () => {
  return register({
    shape: "topo-vue-node",
    component: TopoNode,
    ports: { ...ports },
  });
};
const serverRegister = () => {
  return register({
    shape: "server-vue-node",
    component: ServerNode,
    ports: { ...ports }
  })
}
export { topoRegister, serverRegister, TopoNode, ServerNode };
