export const THEME_IDS = ["light", "dark"];

export const DEFAULT_THEME = "dark";

export const STORAGE_KEY = "theme";

export const themes = {
  light: {
    "--app-bg": "#f5f5f5",
    "--app-fg": "#45454d",
    "--accent": "#3a78db",
    "--base-br": "1.5rem",
    "--base-border": "3px solid #3a78db",
    "--selection-inner-border": "2.5px dashed #3a78db",
    "--node-surface": "#eaeaf0",
    "--node-port-fill-hover": "#fafafa",
    "--node-port-stroke-hover": "#3a78db",
    "--panel-bg":
      "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(240,240,240,0.98) 100%)",
    "--panel-edge": "rgba(0,0,0,0.07)",
    "--panel-shadow-drag": "0 0 20px rgba(0,0,0,0.05)",
    "--panel-float-bg":
      "linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,248,248,0.99) 100%)",
    "--panel-float-shadow":
      "0 20px 60px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05) inset, 0 1px 0 rgba(255,255,255,0.95) inset",
    "--panel-icon": "#52525b",
    "--panel-icon-muted": "#71717a",
    "--panel-divider": "rgba(0,0,0,0.07)",
    "--panel-tile-bg":
      "linear-gradient(to bottom right, rgba(0,0,0,0.03), rgba(0,0,0,0.055))",
    "--panel-tile-border": "rgba(0,0,0,0.09)",
    "--panel-tile-hover-bg":
      "linear-gradient(to bottom right, rgba(0,0,0,0.05), rgba(0,0,0,0.08))",
    "--panel-tile-hover-border": "rgba(0,0,0,0.13)",
    "--panel-tile-hover-shadow": "0 4px 12px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.04)",
    "--panel-summary-hover-bg": "rgba(0,0,0,0.04)",
    "--panel-well-gloss":
      "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
    "--panel-scrollbar-thumb": "rgba(0,0,0,0.15)",
    "--panel-scrollbar-thumb-hover": "rgba(0,0,0,0.22)",
    "--graph-grid-color": "#dedee4",
    "--text-placeholder": "rgba(69, 69, 77, 0.45)",
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
    "--text-placeholder": "rgba(255, 255, 255, 0.35)",
  },
};
