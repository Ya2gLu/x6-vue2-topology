import { defineConfig } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetAttributify from "@unocss/preset-attributify";
import { shapeList } from "./src/components/Topology/src/mock/dragData";

// 收集所有图标类名
const getAllIcons = () => {
  const icons = [];
  shapeList.forEach(shape => {
    if (shape.children) {
      shape.children.forEach(child => {
        if (child.icon) {
          icons.push(child.icon);
        }
      });
    }
  });
  return icons;
};

export default defineConfig({
  presets: [
    presetAttributify({/* preset options */}),
    presetUno({
      
    }),
    // @unocss/preset-icons
    presetIcons({
      prefix: "y-",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  safelist: [
    // 从 dragData 中提取的所有图标
    ...getAllIcons(),
    // Home.vue 中使用的图标
    'y-material-symbols:rocket-launch',
    'y-mdi:github',
    'y-material-symbols:drag-indicator',
    'y-material-symbols:shapes',
    'y-material-symbols:link',
    'y-material-symbols:speed',
    'y-material-symbols:save',
    'y-material-symbols:gesture',
    // NavBar.vue 中使用的图标
    'y-solar:sun-bold',
    'y-solar:moon-bold',
    // DragPanel.vue 中使用的图标
    'y-icon-park-solid:down-one',
    'y-icon-park-solid:right-one',
    'y-material-symbols-light:play-shapes-outline',
    // TitleBar.vue 中使用的图标
    'y-iconamoon:type-duotone',
    'y-mdi:image-filter-center-focus',
    'y-ph:selection-plus',
    'y-solar:magnifer-zoom-in-linear',
    'y-solar:magnifer-zoom-out-linear',
    'y-material-symbols:delete-outline-rounded',
    'y-ic:round-undo',
    'y-ic:outline-redo',
    'y-solar:export-linear',
    'y-material-symbols:keyboard-onscreen-outline',
    // OnlinePopover.vue 中使用的图标
    'y-iconamoon:search',
    'y-solar:wi-fi-router-minimalistic-linear',
    'y-clarity:network-switch-outline-badged',
    'y-majesticons:desktop-computer-line',
    'y-circum:mobile-3',
  ],
});
