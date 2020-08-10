<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Turnauksen palkinnot</p>
    </header>
    <div class="card-content card-section">
      <form>
        <multi-line-text-input
          @addClicked="addLine('wsl')"
          @removeClicked="removeLine($event, 'wsl')"
          @valueUpdated="updateLine($event, 'wsl')"
          :lines="turnaus.wsl"
          label="Palkinnot:"
        />
      </form>
    </div>
  </div>
</template>
<script>
import MultiLineTextInput from '~/components/form/MultiLineTextInput'
export default {
  components: {
    MultiLineTextInput
  },
  props: {
    turnaus: {
      type: Object,
      required: true
    }
  },
  methods: {
    addLine(field) {
      this.$store.commit('administrator/turnaus/addLine', field)
    },
    removeLine(index, field) {
      this.$store.commit('administrator/turnaus/removeLine', {field, index})
     },
    updateLine({value, index}, field) {
      this.$store.dispatch('administrator/turnaus/updateLine', {field, value, index})
    }
  }
}
</script>


