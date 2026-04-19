import { applyTheme, getStoredTheme, normalizeTheme } from "@/theme/applyTheme";

const state = () => ({
  sideToggle: false,
  dragToggle: false,
  textToggle: false,
  theme: getStoredTheme(),
});

const getters = {};

const actions = {};

const mutations = {
  toggleLeft(state) {
    state.sideToggle = !state.sideToggle;
    return state.sideToggle;
  },
  toggleRight(state) {
    state.dragToggle = !state.dragToggle;
    return state.dragToggle;
  },
  toggleText(state) {
    state.textToggle = !state.textToggle;
    return state.textToggle;
  },
  toggleTheme(state) {
    state.theme = state.theme === "dark" ? "light" : "dark";
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", state.theme);
    }
    applyTheme(state.theme);
    return state.theme;
  },
  setTheme(state, theme) {
    const id = normalizeTheme(theme);
    state.theme = id;
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", id);
    }
    applyTheme(id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
