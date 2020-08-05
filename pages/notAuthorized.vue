<template>
  <div class="container">
    <ErrorView :title="'Ooooops, sinulla ei ole oikeuksia nähdä tätä sivua. Pyytäisitkö adminilta pääsyoikeudet.'"
               :status="'401'"
               :navigateToPage="'/'"
               :navigateToText="'Navigate to Home Page'" />
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