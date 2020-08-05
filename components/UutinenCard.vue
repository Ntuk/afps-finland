<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <nuxt-link :to="`/uutiset/${uutinen.slug}`">
            <p class="title is-4">{{uutinen.title}}</p>
          </nuxt-link>
          <p class="subtitle is-6"><i>by {{uutinen.author.name}}</i></p>
        </div>
      </div>
      <div class="content">
        {{uutinen.subtitle | shortenText(85)}}
        <br>
      </div>
      <div class="content">
        {{uutinen.createdAt | formatDate('LLL')}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    uutinen: {
      required: true,
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-image:hover {
    cursor: pointer;
    opacity: 0.9;
  }
  .link {
    color: #e67e22;
  }
</style>
