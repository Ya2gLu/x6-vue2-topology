import { defineConfig } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import presetAttributify from "@unocss/preset-attributify";
export default defineConfig({
  presets: [
    presetAttributify({}),
    presetUno(),
    presetIcons({
      prefix: "y-",
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
});
