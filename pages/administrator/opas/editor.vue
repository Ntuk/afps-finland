<template>
  <div>
    <Header
      title="Uusi opas!"
      exitLink="/administrator/oppaat"
    />
    <div class="opas-editor-container">
      <div class="container">
        <editor @editorUpdated="saveOpas"/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/shared/Header'
import Editor from '~/components/editor'
export default {
  layout: 'administrator',
  components: {
    Header, Editor
  },
  methods: {
    saveOpas(opasData) {
      this.$store.dispatch('administrator/opas/createOpas', opasData)
        .then(opas => this.$router.push(`/administrator/opas/${opas._id}/edit`))
    }
  }
}
</script>
<style lang="scss">


</style>
