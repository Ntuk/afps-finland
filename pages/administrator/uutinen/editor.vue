<template>
  <div>
    <Header
      title="Ramble away!"
      exitLink="/administrator/uutiset"
    />
    <div class="uutinen-editor-container">
      <div class="container">
        <editor @editorUpdated="saveUutinen"/>
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
    saveUutinen(uutinenData) {
      this.$store.dispatch('administrator/uutinen/createUutinen', uutinenData)
        .then(uutinen => this.$router.push(`/administrator/uutinen/${uutinen._id}/edit`))
    }
  }
}
</script>
<style lang="scss">


</style>
