export const state = () => ({
  item: {}
})


export const actions = {
  createHero({commit, state}, turnausHeroData) {
    return this.$axios.$post('/api/v1/product-heroes', turnausHeroData)
      .then(hero => {
        commit('setHero', hero)
        return state.item
      })
      .catch(error => Promise.reject(error))
  },
  fetchHero({commit, state}) {
    return this.$axios.$get('/api/v1')
      .then(data => {
        const { productHero } = data
        commit('setHero', productHero)
        return state.item
      })
      .catch(error => Promise.error(error))
  }
}

export const mutations = {
  setHero(state, hero) {
    state.item = hero
  }
}