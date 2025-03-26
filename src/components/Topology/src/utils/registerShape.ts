import TopoNode from "../modules/TopoNode.vue";
import ServerNode from "../modules/ServerNode.vue"
import { register } from "@antv/x6-vue-shape";
import { ports } from "./ports";

export const topoRegister = () => {
  return register({
    shape: "topo-vue-node",
    component: TopoNode,
    ports: { ...ports },
  });
};
export const serverRegister = () => {
  return register({
    shape: "server-vue-node",
    component: ServerNode,
    ports: { ...ports }
  })
}
export { TopoNode, ServerNode };
