const state = () => ({
  sideToggle: false,
  dragToggle: false,
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
