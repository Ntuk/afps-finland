<template>
  <div>
    <Header
      title="Manageroi oppaita"
      exitLink="/"
    />
    <div class="administrator-oppaat">
      <div class="container">
        <div class="section">
          <div class="header-block">
            <h2>Oppaat</h2>
            <div class="title-menu">
              <button @click="$router.push('/administrator/opas/editor')" class="button">Kirjoita opas!</button>
            </div>
          </div>
          <div class="tabs">
            <ul>
              <!-- set here active tab -->
              <li @click="activeTab = 0">
                <a :class="{'is-active': activeTab === 0}">Luonnokset</a>
              </li>
              <!-- set here active tab -->
              <li @click="activeTab = 1">
                <a :class="{'is-active': activeTab === 1}">Julkaistut</a>
              </li>
            </ul>
          </div>
          <div class="oppaat-container">
            <!-- Draft Oppaat -->
            <!-- check for active tab -->
            <template v-if="activeTab === 0">
              <div v-if="drafts && drafts.length > 0">
                <!-- make iteration here for drafts -->
                <div
                  v-for="dOpas in drafts"
                  :key="dOpas._id"
                  class="opas-card"
                  >
                  <h2>{{displayOpasTitle(dOpas)}}</h2>
                  <div class="opas-card-footer">
                    <span>
                      Last Edited {{dOpas.updatedAt | formatDate('LLL')}}
                    </span>
                    <dropdown
                      @optionChanged="handleOption($event, dOpas)"
                      :items="draftsOptions" />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts oppaat  -->
              <div v-else class="opas-error">
                Ei luonnoksia :(
              </div>
            </template>
            <!-- Published Oppaat -->
            <!-- check for active tab -->
            <template v-if="activeTab === 1">
              <div v-if="published && published.length > 0">
                <!-- make iteration here for published -->
                <div
                  v-for="pOpas in published"
                  :key="pOpas._id"
                  :class="{featured: pOpas.featured}"
                  class="opas-card">
                  <!-- title -->
                  <h2>{{displayOpasTitle(pOpas)}}</h2>
                  <div class="opas-card-footer">
                    <!-- updatedAt -->
                    <span>
                      Last Edited {{pOpas.updatedAt | formatDate('LLL')}}
                    </span>
                    <dropdown
                      @optionChanged="handleOption($event, pOpas)"
                      :items="publishedOptions(pOpas.featured)" />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts oppaat  -->
              <div v-else class="opas-error">
                Ei julkaistuja oppaita :(
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/shared/Header'
import Dropdown from '~/components/shared/Dropdown'
import { mapState } from 'vuex'
import { createPublishedOptions,
         createDraftsOptions,
         commands } from '~/pages/administrator/options'

export default {
  layout: 'administrator',
  components: {Header, Dropdown},
  data() {
    return {
      activeTab: 0
    }
  },
  computed: {
    ...mapState({
      published: ({administrator}) => administrator.opas.items.published,
      drafts: ({administrator}) => administrator.opas.items.drafts
    }),
    draftsOptions() {
      return createDraftsOptions()
    }
  },
  async fetch({store}) {
    await store.dispatch('administrator/opas/fetchUserOppaat')
  },
  methods: {
    handleOption(command, opas) {
      if (command === commands.EDIT_OPAS) {
        this.$router.push(`/administrator/opas/${opas._id}/edit`)
      }
      if (command === commands.DELETE_OPAS) {
        this.displayDeleteWarning(opas)
      }
      if (command === commands.TOGGLE_FEATURE) {
        this.updateOpas(opas)
      }
    },
    updateOpas(opas) {
      const featured = !opas.featured
      const featureStatus = featured ? 'Tärkeä' : 'Ei-Tärkeä'

      this.$store.dispatch('administrator/opas/updatePublishedOpas', {id: opas._id, data: {featured}})
        .then(_ => this.$toasted.success(`Opas merkattu statuksella: ${featureStatus}!`, {duration: 2000}))
    },
    publishedOptions(isFeatured) {
      return createPublishedOptions(isFeatured)
    },
    displayDeleteWarning(opas) {
     const isConfirm = confirm('Are you sure you want to delete this opas?')
     if (isConfirm) {
      this.$store.dispatch('administrator/opas/deleteOpas', opas)
        .then(_ => this.$toasted.success('Opas onnistuneesti poistettu!', {duration: 2000}))
      }
    },
    displayOpasTitle(opas) {
      return opas.title || opas.subtitle || 'Opas jolla ei ole otsikkoa tai alaotsikkoa :('
    }
  }
}
</script>

<style scoped lang="scss">
  .is-active {
    border-bottom-color: #363636;
    color: #363636;
  }

  .opas-error {
    font-size: 35px;
  }
  .opas-card {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    > h2 {
      font-size: 30px;
      font-weight: bold;
    }
    &-footer {
      color: rgba(0, 0, 0, 0.54);
    }
    &.featured {
      border-left: 8px solid #3cc314;
      padding-left: 10px;
      transition: border ease-out 0.2s;
      padding-left: 10px;
      transition: border ease-out 0.2s;
    }
  }
  .header-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    > h2 {
      font-size: 40px;
      font-weight: bold;
    }
    .title-menu {
      margin-left: auto;
    }
  }
</style>