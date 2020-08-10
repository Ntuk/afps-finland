<template>
  <div class="turnaus-create-wrapper">
    <div class="turnaus-create-headerText">
      Mihin peliin turnaus liittyy?
    </div>
    <h2 class="turnaus-create-subtitle">(Tämänkin voi vaihtaa myöhemmin)</h2>
    <form class="turnaus-create-form">
      <div class="turnaus-create-form-group">
        <div class="turnaus-create-form-field">
          <div class="select is-large">
            <select 
              v-model="form.category"
              @blur="$v.form.category.$touch()"
              @change="emitFormData"
            >
              <option value="default">Valitse peli</option>
              <option 
                v-for="category in categories"
                :key="category._id"
                :value="category._id"
              >
                {{category.name}}
              </option>              
            </select>
            <div v-if="$v.form.category.$dirty && !isValid" class="form-error">
              <span class="help is-danger">Peli on valittava</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      form: {
        category: 'default'
      }
    }
  },
  validations: {
    form: {
      category: {
        required
      }
    }
  },
  computed: {
    categories() {
      return this.$store.state.category.items
    },
    isValid() {
      return !this.$v.invalid && this.form.category != 'default'
    }
  },
  methods: {
    emitFormData() {
      this.$v.form.$touch()
      this.$emit('stepUpdated', {data: this.form, isValid: this.isValid})
    }
  }
}
</script>
<style scoped>
  .help.is-danger {
    text-align: left;
  }
</style>
