import Vue from 'vue'

function separateOppaat(oppaat) {
  const published = []
  const drafts = []

  oppaat.forEach(opas => {
    opas.status === 'active' ? drafts.push(opas) : published.push(opas)
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
  createOpas(_, opasData) {
    return this.$axios.$post('/api/v1/oppaat', opasData)
      .then(opas => opas)
      .catch(error => Promise.reject(error))
  },
  fetchOpasById({commit}, opasId) {
    return this.$axios.$get(`/api/v1/oppaat/${opasId}`)
      .then(opas => commit('setOpas', opas))
  },
  fetchUserOppaat({commit, state}) {
    return this.$axios.$get('/api/v1/oppaat/me')
      .then(oppaat => {
        const { published, drafts } = separateOppaat(oppaat)
        commit('setOppaat', {resource: 'drafts', items: drafts})
        commit('setOppaat', {resource: 'published', items: published})

        return { published, drafts }
      })
  },
  deleteOpas({commit, state}, opas) {
    const resource = opas.status === 'active' ? 'drafts' : 'published'
    return this.$axios.$delete(`/api/v1/oppaat/${opas._id}`)
      .then(_ => {
        const index = state.items[resource].findIndex((b) => b._id === opas._id )
        commit('deleteOpas', {resource, index})
        return true
      })
      .catch(error => Promise.reject(error))
  },
  updatePublishedOpas({commit, state}, {id, data}) {
    return this.$axios.$patch(`/api/v1/oppaat/${id}`, data)
      .then(opas => {
        const index = state.items['published'].findIndex(b => b._id === id)
        commit('setPublishedOpas', {index, opas})
        return opas
      })
      .catch(error => Promise.reject(error))
  },
  updateOpas({commit, state}, {data, id}) {
    commit('setIsSaving', true)
    return this.$axios.$patch(`/api/v1/oppaat/${id}`, data)
      .then(opas => {
        commit('setOpas', opas)
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
  setOpas(state, opas) {
    state.item = opas
  },
  setPublishedOpas(state, {index, opas}) {
    Vue.set(state.items.published, index, opas)
  },
  setOppaat(state, {resource, items}) {
    state.items[resource] = items
  },
  deleteOpas(state, {resource, index}) {
    state.items[resource].splice(index, 1)
  },
  setIsSaving(state, isSaving) {
    state.isSaving = isSaving
  }
}

