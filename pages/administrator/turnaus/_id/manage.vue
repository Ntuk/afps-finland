<template>
  <div class="manage-page">
    <Header
      title="Turnauksen nimi"
      exitLink="/administrator/turnaukset">
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <button
            @click="updateTurnaus"
            :disabled="!canUpdateTurnaus"
            class="button is-primary is-inverted is-medium is-outlined">
            Tallenna
          </button>
        </div>
        <div class="full-page-takeover-header-button">
          <!-- <Modal
            openTitle="Tee turnauksesta etusivun kansikuva"
            openBtnClass="button is-primary is-inverted is-medium is-outlined"
            title="Tee turnauksesta etusivun kansikuva"
            @opened="applyTurnausValues"
            @submitted="createTurnausHero">
            <div>
              <form>
                <div class="field">
                  <label class="label">Otsikko</label>
                  <div class="control">
                    <input
                      v-model="turnausHero.title"
                      class="input is-medium"
                      type="text"
                      placeholder="...">
                  </div>
                </div>
                <div class="field">
                  <label class="label">Alaotsikko</label>
                  <input
                    v-model="turnausHero.subtitle"
                    class="input is-medium"
                    type="text"
                    placeholder="...">
                </div>
                <div class="field">
                  <label class="label">Linkki turnauksen kuvaan (näkyy isolla etusivulla)</label>
                  <input
                    v-model="turnausHero.image"
                    class="input is-medium"
                    type="text"
                    placeholder="Some image in format 3 by 1 (720 x 240)">
                  <figure class="image is-3by1">
                    <img :src="turnausHero.image">
                  </figure>
                </div>
              </form>
            </div>
          </Modal> -->
        </div>
      </template>
    </Header>
    <div class="turnaus-manage">
      <div class="container">
        <div class="columns">
          <div class="column is-3 p-lg">
            <!-- <aside class="menu is-hidden-mobile"> -->
            <aside class="menu">
              <p class="menu-label">
                Turnauksen muokkaaminen
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display TurnausInfo -->
                  <a @click.prevent="navigateTo(1)"
                     :class="activeComponentClass(1)">
                     Turnauksen palkinnot
                  </a>
                </li>
                <li>
                  <!-- display LandingPage -->
                  <a @click.prevent="navigateTo(2)"
                     :class="activeComponentClass(2)">
                    Turnauksen päätiedot
                  </a>
                </li>
              </ul>
              <p class="menu-label">
                Turnauksen julkaisu
              </p>
              <ul class="menu-list">
                <li>
                  <!-- display Status -->
                  <a @click.prevent="navigateTo(3)"
                     :class="activeComponentClass(3)">
                    Muuta statusta
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <keep-alive>
              <component
                @turnausValueUpdated="handleTurnausUpdate"
                :is="activeComponent"
                :turnaus="turnaus"
              />
            </keep-alive>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '~/components/shared/Modal'
import Header from '~/components/shared/Header'
import TurnausInfo from '~/components/administrator/TurnausInfo'
import LandingPage from '~/components/administrator/LandingPage'
import Status from '~/components/administrator/Status'
import MultiComponentMixin from '~/mixins/MultiComponentMixin'
import { mapState } from 'vuex'
export default {
  layout: 'administrator',
  components: { 
    Header, 
    TurnausInfo, 
    LandingPage, 
    Status,
    Modal
  },
  mixins: [MultiComponentMixin],
  data() {
    return {
      steps: ['TurnausInfo', 'LandingPage', 'Status'],
      turnausHero: {}
    }
  },
  async fetch({store, params}) {
    await store.dispatch('administrator/turnaus/fetchTurnausById', params.id)
    await store.dispatch('category/fetchCategories')
  },
  computed: {
    ...mapState({
      turnaus: ({administrator}) => administrator.turnaus.item,
      canUpdateTurnaus: ({administrator}) => administrator.turnaus.canUpdateTurnaus
    })
  },
  methods: {
    updateTurnaus() {
      this.$store.dispatch('administrator/turnaus/updateTurnaus')
        .then(_ => this.$toasted.success('Turnaus onnistuneesti päivitetty!', {duration: 3000}))
        .catch(error => this.$toasted.error('Turnausta ei pystytty päivittämään!'), {duration: 3000})
    },
    createTurnausHero({closeModal}) {
      const heroData = {...this.turnausHero}
      heroData.product = {...this.turnaus}
      this.$store.dispatch('hero/createHero', heroData)
        .then(() => {
          closeModal()
          this.$toasted.success('Turnaus Hero was created!', {duration: 3000})
        })
    },
    handleTurnausUpdate({value, field}) {
      this.$store.dispatch('administrator/turnaus/updateTurnausValue', {field, value})
    },
    applyTurnausValues() {
      // !this.turnausHero.title && this.$set(this.turnausHero, 'title', this.turnaus.title)
      // !this.turnausHero.subtitle && this.$set(this.turnausHero, 'subtitle', this.turnaus.subtitle)
      this.$set(this.turnausHero, 'title', this.turnaus.title)
      this.$set(this.turnausHero, 'subtitle', this.turnaus.subtitle)
      this.$set(this.turnausHero, 'image', this.turnaus.image)
    }
  }
}
</script>

<style lang="scss">
  .manage-page {
    .label-info {
      font-size: 13px;
      color: gray;
      font-style: italic;
    }
    .turnaus-manage {
      padding-top: 40px;
      .menu {
        padding-top: 30px;
        &-label {
          font-size: 20px;
          color: black;
        }
        &-list {
          >li {
            font-size: 18px;
            margin-top: 10px;
            > a {
              &.is-active {
                border-left: 3px solid #58229f;
                background-color: transparent;
                color: inherit;
              }
            }
          }
        }
      }
      .card {
        &-section {
          padding: 40px;
        }
        &-header {
          &-title {
            padding: 0;
            color: #8F99A3;
            font-weight: 400;
            font-size: 25px;
          }
        }
      }
    }
  }
</style>