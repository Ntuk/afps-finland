<template>
  <div>
    <Header
      title="Manageroi uutisia"
      exitLink="/"
    />
    <div class="administrator-uutiset">
      <div class="container">
        <div class="section">
          <div class="header-block">
            <h2>Uutiset</h2>
            <div class="title-menu">
              <button @click="$router.push('/administrator/uutinen/editor')" class="button">Kirjoita uutinen!</button>
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
          <div class="uutiset-container">
            <!-- Draft Uutiset -->
            <!-- check for active tab -->
            <template v-if="activeTab === 0">
              <div v-if="drafts && drafts.length > 0">
                <!-- make iteration here for drafts -->
                <div
                  v-for="dUutinen in drafts"
                  :key="dUutinen._id"
                  class="uutinen-card"
                  >
                  <h2>{{displayUutinenTitle(dUutinen)}}</h2>
                  <div class="uutinen-card-footer">
                    <span>
                      Last Edited {{dUutinen.updatedAt | formatDate('LLL')}}
                    </span>
                    <dropdown
                      @optionChanged="handleOption($event, dUutinen)"
                      :items="draftsOptions" />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts uutiset  -->
              <div v-else class="uutinen-error">
                Ei luonnoksia :(
              </div>
            </template>
            <!-- Published Uutiset -->
            <!-- check for active tab -->
            <template v-if="activeTab === 1">
              <div v-if="published && published.length > 0">
                <!-- make iteration here for published -->
                <div
                  v-for="pUutinen in published"
                  :key="pUutinen._id"
                  :class="{featured: pUutinen.featured}"
                  class="uutinen-card">
                  <!-- title -->
                  <h2>{{displayUutinenTitle(pUutinen)}}</h2>
                  <div class="uutinen-card-footer">
                    <!-- updatedAt -->
                    <span>
                      Last Edited {{pUutinen.updatedAt | formatDate('LLL')}}
                    </span>
                    <dropdown
                      @optionChanged="handleOption($event, pUutinen)"
                      :items="publishedOptions(pUutinen.featured)" />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts uutiset  -->
              <div v-else class="uutinen-error">
                Ei julkaistuja uutisia :(
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
      published: ({administrator}) => administrator.uutinen.items.published,
      drafts: ({administrator}) => administrator.uutinen.items.drafts
    }),
    draftsOptions() {
      return createDraftsOptions()
    }
  },
  async fetch({store}) {
    await store.dispatch('administrator/uutinen/fetchUserUutiset')
  },
  methods: {
    handleOption(command, uutinen) {
      if (command === commands.EDIT_UUTINEN) {
        this.$router.push(`/administrator/uutinen/${uutinen._id}/edit`)
      }
      if (command === commands.DELETE_UUTINEN) {
        this.displayDeleteWarning(uutinen)
      }
      if (command === commands.TOGGLE_FEATURE) {
        this.updateUutinen(uutinen)
      }
    },
    updateUutinen(uutinen) {
      const featured = !uutinen.featured
      const featureStatus = featured ? 'Tärkeä' : 'Ei-Tärkeä'

      this.$store.dispatch('administrator/uutinen/updatePublishedUutinen', {id: uutinen._id, data: {featured}})
        .then(_ => this.$toasted.success(`Uutinen merkattu statuksella: ${featureStatus}!`, {duration: 2000}))
    },
    publishedOptions(isFeatured) {
      return createPublishedOptions(isFeatured)
    },
    displayDeleteWarning(uutinen) {
     const isConfirm = confirm('Are you sure you want to delete this uutinen?')
     if (isConfirm) {
      this.$store.dispatch('administrator/uutinen/deleteUutinen', uutinen)
        .then(_ => this.$toasted.success('Uutinen onnistuneesti poistettu!', {duration: 2000}))
      }
    },
    displayUutinenTitle(uutinen) {
      return uutinen.title || uutinen.subtitle || 'Uutinen jolla ei ole otsikkoa tai alaotsikkoa :('
    }
  }
}
</script>

<style scoped lang="scss">
  .is-active {
    border-bottom-color: #363636;
    color: #363636;
  }

  .uutinen-error {
    font-size: 35px;
  }
  .uutinen-card {
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