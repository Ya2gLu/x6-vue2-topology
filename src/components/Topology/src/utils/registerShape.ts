import TopoNode from "../modules/TopoNode.vue";
import { register } from "@antv/x6-vue-shape";
import { ports } from "./ports";

const topoRegister = () => {
  return register({
    shape: "topo-vue-node",
    component: TopoNode,
    ports: { ...ports },
  });
};
export { topoRegister, TopoNode };
