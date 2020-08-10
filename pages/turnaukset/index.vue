<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">All Turnaukset</h1>
        <div class="columns is-multiline">
          <div
            v-for="turnaus in turnaukset"
            :key="turnaus._id"
            class="column is-one-quarter">
            <!-- pass a turnaus as a prop to turnaus-card -->
            <v-popover
              offset="16"
              trigger="hover"
              placement="right-start">
              <turnaus-card :turnaus="turnaus"/>
              <template slot="popover">
                <turnaus-card-tooltip
                  :title="turnaus.title"
                  :subtitle="turnaus.category.name"
                  :description="turnaus.subtitle"
                  :wsl="turnaus.wsl"
                />
              </template>
            </v-popover>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TurnausCard from '~/components/TurnausCard'
import TurnausCardTooltip from '~/components/TurnausCardTooltip'
import { mapState } from 'vuex'
export default {
  head: {
    title: 'AFPS Finland'
  },
  components: {
    TurnausCard, TurnausCardTooltip
  },
  computed: {
    ...mapState({
      turnaukset: state => state.turnaus.items
    })
  },
  async fetch({store}) {
    await store.dispatch('turnaus/fetchTurnaukset')
  }
}
</script>

<style scoped lang="scss">
  // Home page
  .section {
    margin-bottom: 100px;
  }
  .links {
    padding-top: 15px;
  }
</style>

