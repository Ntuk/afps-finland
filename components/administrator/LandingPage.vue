<template>
  <div class="card manage-card">
    <header class="card-header card-section">
      <p class="card-header-title">Turnauksen päätiedot</p>
    </header>
    <div class="card-content card-section">
      <form>
        <div class="field">
          <label class="label">Turnauksen nimi</label>
          <div class="control">
            <input
              :value="turnaus.title"
              @input="($event) => emitTurnausValue($event, 'title')"
              class="input is-medium"
              type="text"
              placeholder="Placeholder">
          </div>
        </div>
        <div class="field">
          <label class="label">Päivämäärä</label>
          <div class="control">
            <input
              :value="turnaus.subtitle"
              @input="($event) => emitTurnausValue($event, 'subtitle')"
              class="input is-medium"
              type="text"
              placeholder="10. lokakuuta 2020">
          </div>
        </div>
        <div class="field">
          <label class="label">Turnauksen kuvaus</label>
          <div class="control">
          <turnaus-editor 
            :initialContent="turnaus.description"
            @editorUpdated="(content) => emitTurnausValue(content, 'description')"
          />
          </div>
        </div>
        <div class="field">
          <label class="label">Peli</label>
          <div class="select is-medium">
            <select
              :value="turnaus.category._id"
              @change="($event) => emitTurnausValue($event, 'category')"
            >
              <option
                v-for="category in categories"
                :key="category._id"
                :value="category._id">
                {{category.name}}
             </option>
            </select>
          </div>
        </div>
        <div class="field">
          <label class="label">Kuva (ei pakollinen)</label>
          <div class="columns">
            <div class="column">
              <figure class="image is-4by2">
                <img
                 :src="turnaus.image">
              </figure>
            </div>
            <div class="column centered">
              <div class="control">
                <input
                  :value="turnaus.image"
                  @input="($event) => emitTurnausValue($event, 'image')"
                  class="input is-medium"
                  type="text"
                  placeholder="https://media.gettyimages.com/vectors/golden-trophy-cup-hand-drawn-vector-id689974954">
              </div>
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label">Challonge linkki</label>
          <div class="control">
            <input
              :value="turnaus.productLink"
              @input="($event) => emitTurnausValue($event, 'productLink')"
              class="input is-medium"
              type="text"
              placeholder="https://challonge.com/r8sws29w">
          </div>
        </div>
        <div class="field">
          <label class="label">Turnauksen videolinkki (ei pakollinen)</label>
          <div class="control">
            <input
              :value="turnaus.promoVideoLink"
              @input="($event) => emitTurnausValue($event, 'promoVideoLink')"
              class="input is-medium"
              type="text"
              placeholder="https://youtu.be/zRsDeG2Jo5c">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import TurnausEditor from '~/components/editor/TurnausEditor'
export default {
  components: {
    TurnausEditor
  },
  props: {
    turnaus: {
      type: Object,
      required: true
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.items
    }
  },
  methods: {
    emitTurnausValue(e, field) {
      const value = e.target ? e.target.value : e 
      if (field === 'category') {
        return this.emitCategory(value, field)
      }
      return this.$emit('turnausValueUpdated', {value, field})
    },
    emitCategory(categoryId, field) {
      const foundCategory = this.categories.find(c => c._id === categoryId)
      this.$emit('turnausValueUpdated', {value: foundCategory, field})
    }
  }
}
</script>
