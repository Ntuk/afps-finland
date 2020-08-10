<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Status</p>
    </header>
    <div class="card-content card-section">
      <div class="field">
        <label class="label">Status</label>
        <div class="select is-medium">
          <select
            :value="turnaus.status"
            @change="($event) => emitTurnausValue($event, 'status')"
          >
            <option value="default">Vaihda status</option>
            <option value="active">
              Luonnos
            </option>
            <option value="published">
              Julkaistu
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <label class="label">Onko turnaus tulevaisuudessa vai jo mennyt?</label>
        <div class="select is-medium">
          <select
            :value="turnaus.dateStatus"
            @change="($event) => emitTurnausValue($event, 'dateStatus')"
          >
            <option value="default">Vaihda status</option>
            <option value="future">
              Tulevaisuudessa
            </option>
            <option value="history">
              Mennyt jo
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    turnaus: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitTurnausValue(e, field) {
      this.$emit('turnausValueUpdated', {value: e.target.value, field})
    }
  }
}
</script>
