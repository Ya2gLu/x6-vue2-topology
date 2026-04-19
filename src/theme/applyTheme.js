import { themes, THEME_IDS, DEFAULT_THEME, STORAGE_KEY } from "./theme.config";

export { STORAGE_KEY };

export function normalizeTheme(id) {
  if (!id || typeof id !== "string") return DEFAULT_THEME;
  return THEME_IDS.includes(id) ? id : DEFAULT_THEME;
}

export function getStoredTheme() {
  if (typeof window === "undefined" || !window.localStorage) {
    return DEFAULT_THEME;
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_THEME;
  const id = normalizeTheme(raw);
  if (id !== raw) {
    localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

export function getCssVar(name) {
  if (typeof document === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function applyTheme(themeId) {
  const id = normalizeTheme(themeId);
  if (typeof document === "undefined") return id;
  document.documentElement.classList.toggle("dark", id === "dark");
  const vars = themes[id];
  Object.entries(vars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
  return id;
}
