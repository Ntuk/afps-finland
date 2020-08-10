<template>
  <div class="turnaus-create-wrapper">
    <div class="turnaus-create-headerText">
      Turnauksen otsikko / nimi
    </div>
    <h2 class="turnaus-create-subtitle">
      (Tämän voi vaihtaa vielä myöhemminkin)
    </h2>
    <form @input="emitFormData" class="turnaus-create-form">
      <div class="turnaus-create-form-group">
        <div class="field turnaus-create-form-field control has-icons-right">
            <TextInputWithCount 
              v-model="form.title"
              :v="$v.form.title"
              :maxLength="50" 
            />
          <div v-if="$v.form.title.$error" class="form-error">
            <span v-if="!$v.form.title.required" class="help is-danger">Otsikko on pakollinen</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import TextInputWithCount from '~/components/form/TextInputWithCount';
export default {
  components: {
    TextInputWithCount
  },
  data() {
    return {
      form: {
        title: '',

      }
    }
  },
  validations: {
    form: {
      title: {
        required
      }
    }
  },
  computed: {
    isValid() {
      return !this.$v.invalid
    }
  },
  methods: {
    emitFormData() {
      this.$emit('stepUpdated', {data: this.form, isValid: this.isValid})
    }
  }
}
</script>