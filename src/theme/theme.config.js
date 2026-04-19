export const THEME_IDS = ["light", "dark"];

export const DEFAULT_THEME = "dark";

export const STORAGE_KEY = "theme";

export const themes = {
  light: {
    "--app-bg": "#f5f5f5",
    "--app-fg": "#1a1a1a",
    "--accent": "#3a78db",
    "--base-br": "1.5rem",
    "--base-border": "3px solid #3a78db",
    "--selection-inner-border": "2.5px dashed #3a78db",
    "--node-surface": "#e4e4e7",
    "--node-port-fill-hover": "#fafafa",
    "--node-port-stroke-hover": "#3a78db",
    "--panel-bg":
      "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(240,240,240,0.98) 100%)",
    "--panel-edge": "rgba(0,0,0,0.1)",
    "--panel-shadow-drag": "0 0 20px rgba(0,0,0,0.08)",
    "--panel-float-bg":
      "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,248,248,0.99) 100%)",
    "--panel-float-shadow":
      "0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06) inset, 0 1px 0 rgba(255,255,255,0.95) inset",
    "--panel-icon": "#3f3f46",
    "--panel-icon-muted": "#52525b",
    "--panel-divider": "rgba(0,0,0,0.1)",
    "--panel-tile-bg":
      "linear-gradient(to bottom right, rgba(0,0,0,0.04), rgba(0,0,0,0.08))",
    "--panel-tile-border": "rgba(0,0,0,0.12)",
    "--panel-tile-hover-bg":
      "linear-gradient(to bottom right, rgba(0,0,0,0.07), rgba(0,0,0,0.11))",
    "--panel-tile-hover-border": "rgba(0,0,0,0.18)",
    "--panel-tile-hover-shadow": "0 4px 12px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(0,0,0,0.06)",
    "--panel-summary-hover-bg": "rgba(0,0,0,0.05)",
    "--panel-well-gloss":
      "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
    "--panel-scrollbar-thumb": "rgba(0,0,0,0.2)",
    "--panel-scrollbar-thumb-hover": "rgba(0,0,0,0.3)",
    "--graph-grid-color": "#c4c4c9",
  },
  dark: {
    "--app-bg": "#141414",
    "--app-fg": "#ffffff",
    "--accent": "#3a78db",
    "--base-br": "1.5rem",
    "--base-border": "3px solid #3a78db",
    "--selection-inner-border": "2.5px dashed #3a78db",
    "--node-surface": "#404040",
    "--node-port-fill-hover": "#141414",
    "--node-port-stroke-hover": "#3a78db",
    "--panel-bg":
      "linear-gradient(135deg, rgba(30,30,30,0.85) 0%, rgba(20,20,20,0.9) 100%)",
    "--panel-edge": "rgba(255,255,255,0.1)",
    "--panel-shadow-drag": "0 0 20px rgba(0,0,0,0.3)",
    "--panel-float-bg":
      "linear-gradient(135deg, rgba(30,30,30,0.85) 0%, rgba(20,20,20,0.9) 100%)",
    "--panel-float-shadow":
      "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 1px 0 rgba(255,255,255,0.1) inset",
    "--panel-icon": "rgba(255,255,255,0.92)",
    "--panel-icon-muted": "rgba(255,255,255,0.55)",
    "--panel-divider": "rgba(255,255,255,0.1)",
    "--panel-tile-bg":
      "linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
    "--panel-tile-border": "rgba(255,255,255,0.1)",
    "--panel-tile-hover-bg":
      "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
    "--panel-tile-hover-border": "rgba(255,255,255,0.2)",
    "--panel-tile-hover-shadow":
      "0 4px 12px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)",
    "--panel-summary-hover-bg": "rgba(255,255,255,0.05)",
    "--panel-well-gloss":
      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
    "--panel-scrollbar-thumb": "rgba(255,255,255,0.2)",
    "--panel-scrollbar-thumb-hover": "rgba(255,255,255,0.3)",
    "--graph-grid-color": "#373536",
  },
};
