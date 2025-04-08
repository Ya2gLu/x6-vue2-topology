const state = () => ({
  sideToggle: false,
  dragToggle: false,
  textToggle: false,
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
