import Vue from 'vue'

export const state = () => ({
  item: {},
  items: {
    all: [],
    featured: []
  },
  pagination: {
    count: 0, // Count of all of our published oppaat
    pageCount: 0, // How many pages we want to display
    pageSize: 10, // How many items we want to display per page
    pageNum: 1 // Current page
  }
})

export const actions = {
  // /api/v1/oppaat?pageNum=10&pageSize=2
  fetchOppaat({commit, state}, filter) {
    const url = this.$applyParamsToUrl('/api/v1/oppaat', filter)
    return this.$axios.$get(url)
      .then(data => {
        const { oppaat, count, pageCount } = data
        commit('setOppaat', {resource: 'all', oppaat})
        commit('setPagination', {count, pageCount})
        return state.items.all
      })
      .catch(error => Promise.reject(error))
  },
  // /api/v1/oppaat?filter[featured]=true
  fetchFeaturedOppaat({commit, state}, filter) {
    const url = this.$applyParamsToUrl('/api/v1/oppaat', filter)
    return this.$axios.$get(url)
      .then(data => {
        const { oppaat } = data
        commit('setOppaat', {resource: 'featured', oppaat})
        return state.items.featured
      })
      .catch(error => Promise.reject(error))
  },
  fetchOpasBySlug({commit, state}, slug) {
    return this.$axios.$get(`/api/v1/oppaat/s/${slug}`)
      .then(opas => {
        // commit
        commit('setOpas', opas)
        return state.item
      })
      .catch(error => Promise.reject(error))
  }
}


export const mutations = {
  setOppaat(state, {resource, oppaat}) {
    state.items[resource] = oppaat
  },
  setOpas(state, opas) {
    state.item = opas
  },
  setPage(state, currentPage) {
    Vue.set(state.pagination, 'pageNum', currentPage)
  },
  setPagination(state, {count, pageCount}) {
    Vue.set(state.pagination, 'count', count)
    Vue.set(state.pagination, 'pageCount', pageCount)
  }
}
