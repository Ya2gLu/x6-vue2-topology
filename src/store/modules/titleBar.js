const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('theme') || 'dark';
  }
  return 'dark';
};

const state = () => ({
  sideToggle: false,
  dragToggle: false,
  textToggle: false,
  theme: getInitialTheme(),
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
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', state.theme);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
    }
    return state.theme;
  },
  setTheme(state, theme) {
    state.theme = theme;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('theme', theme);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
