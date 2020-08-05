<template>
  <div class="container">
    <ErrorView title="Ooooops, Sivua ei ole olemassa. 8("
               :status="'404'"
               :navigateToPage="'/'"
               :navigateToText="'Takaisin etusivulle'" />
  </div>
</template>

<script>
import ErrorView from '@/components/shared/ErrorView'
export default {
  components: {
    ErrorView
  }
}
</script>

<style scoped>
</style>