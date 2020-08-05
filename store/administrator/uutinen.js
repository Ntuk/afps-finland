import Vue from 'vue'

function separateUutiset(uutiset) {
  const published = []
  const drafts = []

  uutiset.forEach(uutinen => {
    uutinen.status === 'active' ? drafts.push(uutinen) : published.push(uutinen)
  })

  return {published, drafts}
}

export const state = () => ({
  items: {
    drafts: [],
    published: []
  },
  item: {},
  isSaving: false
})

export const actions = {
  createUutinen(_, uutinenData) {
    return this.$axios.$post('/api/v1/uutiset', uutinenData)
      .then(uutinen => uutinen)
      .catch(error => Promise.reject(error))
  },
  fetchUutinenById({commit}, uutinenId) {
    return this.$axios.$get(`/api/v1/uutiset/${uutinenId}`)
      .then(uutinen => commit('setUutinen', uutinen))
  },
  fetchUserUutiset({commit, state}) {
    return this.$axios.$get('/api/v1/uutiset/me')
      .then(uutiset => {
        const { published, drafts } = separateUutiset(uutiset)
        commit('setUutiset', {resource: 'drafts', items: drafts})
        commit('setUutiset', {resource: 'published', items: published})

        return { published, drafts }
      })
  },
  deleteUutinen({commit, state}, uutinen) {
    const resource = uutinen.status === 'active' ? 'drafts' : 'published'
    return this.$axios.$delete(`/api/v1/uutiset/${uutinen._id}`)
      .then(_ => {
        const index = state.items[resource].findIndex((b) => b._id === uutinen._id )
        commit('deleteUutinen', {resource, index})
        return true
      })
      .catch(error => Promise.reject(error))
  },
  updatePublishedUutinen({commit, state}, {id, data}) {
    return this.$axios.$patch(`/api/v1/uutiset/${id}`, data)
      .then(uutinen => {
        const index = state.items['published'].findIndex(b => b._id === id)
        commit('setPublishedUutinen', {index, uutinen})
        return uutinen
      })
      .catch(error => Promise.reject(error))
  },
  updateUutinen({commit, state}, {data, id}) {
    commit('setIsSaving', true)
    return this.$axios.$patch(`/api/v1/uutiset/${id}`, data)
      .then(uutinen => {
        commit('setUutinen', uutinen)
        commit('setIsSaving', false)
        return state.item
      })
      .catch(error => {
        commit('setIsSaving', false)
        return Promise.reject(error)
      })
  }
}

export const mutations = {
  setUutinen(state, uutinen) {
    state.item = uutinen
  },
  setPublishedUutinen(state, {index, uutinen}) {
    Vue.set(state.items.published, index, uutinen)
  },
  setUutiset(state, {resource, items}) {
    state.items[resource] = items
  },
  deleteUutinen(state, {resource, index}) {
    state.items[resource].splice(index, 1)
  },
  setIsSaving(state, isSaving) {
    state.isSaving = isSaving
  }
}

