import Vue from 'vue'

export const state = () => ({
  item: {},
  items: {
    all: [],
    featured: []
  },
  pagination: {
    count: 0, // Count of all of our published uutiset
    pageCount: 0, // How many pages we want to display
    pageSize: 10, // How many items we want to display per page
    pageNum: 1 // Current page
  }
})

export const actions = {
  // /api/v1/uutiset?pageNum=10&pageSize=2
  fetchUutiset({commit, state}, filter) {
    const url = this.$applyParamsToUrl('/api/v1/uutiset', filter)
    return this.$axios.$get(url)
      .then(data => {
        const { uutiset, count, pageCount } = data
        commit('setUutiset', {resource: 'all', uutiset})
        commit('setPagination', {count, pageCount})
        return state.items.all
      })
      .catch(error => Promise.reject(error))
  },
  // /api/v1/uutiset?filter[featured]=true
  fetchFeaturedUutiset({commit, state}, filter) {
    const url = this.$applyParamsToUrl('/api/v1/uutiset', filter)
    return this.$axios.$get(url)
      .then(data => {
        const { uutiset } = data
        commit('setUutiset', {resource: 'featured', uutiset})
        return state.items.featured
      })
      .catch(error => Promise.reject(error))
  },
  fetchUutinenBySlug({commit, state}, slug) {
    return this.$axios.$get(`/api/v1/uutiset/s/${slug}`)
      .then(uutinen => {
        // commit
        commit('setUutinen', uutinen)
        return state.item
      })
      .catch(error => Promise.reject(error))
  }
}


export const mutations = {
  setUutiset(state, {resource, uutiset}) {
    state.items[resource] = uutiset
  },
  setUutinen(state, uutinen) {
    state.item = uutinen
  },
  setPage(state, currentPage) {
    Vue.set(state.pagination, 'pageNum', currentPage)
  },
  setPagination(state, {count, pageCount}) {
    Vue.set(state.pagination, 'count', count)
    Vue.set(state.pagination, 'pageCount', pageCount)
  }
}
