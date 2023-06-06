const state = () => ({
  sideToggle: false
})

const getters = {}

const actions = {}

const mutations = {
  toggleSide(state) {
    state.sideToggle = !state.sideToggle
    return state.sideToggle
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}