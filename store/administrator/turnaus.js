

export const state = () => ({
  items: [],
  item: {},
  canUpdateTurnaus: false
})

export const actions = {
  fetchAdministratorTurnaukset({commit}) {
    return this.$axios.$get('/api/v1/products/user-products')
      .then((turnaukset) => {
        commit('setTurnaukset', turnaukset)
        return state.items
      })
      .catch(error => Promise.reject(error))
  },
  fetchTurnausById({commit, state}, turnausId) {
    return this.$axios.$get(`/api/v1/products/${turnausId}`)
      .then(turnaus => {
        commit('setTurnaus', turnaus)
        return state.item
      })
  },
  createTurnaus(_, turnausData) {
    return this.$axios.$post('/api/v1/products', turnausData)
      .then(_ => this.$router.push('/administrator/turnaukset'))
  },
  updateTurnaus({state, commit}) {
    const turnaus = state.item
    return this.$axios.$patch(`/api/v1/products/${turnaus._id}`, turnaus)
      .then(turnaus => {
        commit('setTurnaus', turnaus)
        commit('setCanUpdateTurnaus', false)
        return state.item
      })
      .catch(error => Promise.reject(error))
  },
  // TODO: cache previous value and verify if you can update turnaus
  // TODO: set canUpdate only when turnaus values has beed updated
  updateLine({commit}, {index, value, field}) {
    commit('setLineValue', {index, value, field})
    commit('setCanUpdateTurnaus', true)
  },
  updateTurnausValue({commit}, {value, field}) {
    commit('setTurnausValue', {value, field})
    commit('setCanUpdateTurnaus', true)
  }
}


export const mutations = {
  setTurnaukset(state, turnaukset) {
    state.items = turnaukset
  },
  setTurnaus(state, turnaus) {
    state.item = turnaus
  },
  setTurnausValue(state, {value, field}) {
    state.item[field] = value
  },
  setCanUpdateTurnaus(state, canUpdate) {
    state.canUpdateTurnaus = canUpdate
  },
  addLine(state, field) {
    state.item[field].push({value: ''})
  },
  removeLine(state, {field, index}) {
    state.item[field].splice(index, 1)
  },
  setLineValue(state, {index, value, field}) {
    state.item[field][index].value = value
  }
}
