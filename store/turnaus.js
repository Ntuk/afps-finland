

export const state = () => ({
  items: [],
  item: {}
})

export const actions = {
  fetchTurnaukset({commit}) {
    return this.$axios.$get('/api/v1/products')
      .then(turnaukset => {
        commit('setItems', {resource: 'turnaus', items: turnaukset}, {root: true})
        return state.items
    })
  },
  fetchTurnausBySlug({commit, state}, turnausSlug) {
    return this.$axios.$get(`/api/v1/products/s/${turnausSlug}`)
      .then(turnaus => {
        commit('setTurnaus', turnaus)
        return state.turnaus
      })
      .catch(error => Promise.reject(error))
  }
}

export const mutations = {
  setTurnaus(state, turnaus) {
    state.item = turnaus
  }
}

