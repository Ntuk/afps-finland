<template>
  <div class="card">
    <nuxt-link :to="`/turnaukset/${turnaus.slug}`">
      <div class="card-image">
        <figure class="image is-4by2">
          <img :src="turnaus.image" alt="Placeholder image">
        </figure>
      </div>
    </nuxt-link>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{turnaus.title | shortenText(45)}}</p>
          <!-- <p class="subtitle is-6"><i>{{turnaus.author.username}}</i></p> -->
        </div>
      </div>
      <div class="content">
        {{turnaus.subtitle | shortenText(45)}}
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
  }
}
</script>

<style lang="scss" scoped>
  .card {
    padding: 0.75rem;
    background: radial-gradient(circle, rgba(174,232,255,1) 0%, rgba(158,217,240,1) 100%);
    border: 2px solid rgb(112, 112, 112);
    box-shadow: 10px 19px 17px -13px hsla(0,0%,0%,.2);
    border-radius: 2px 225px 1px 225px/225px 4px 225px 8px;
  }
  .card-image {
    border: 1px solid #6b6b6b;
    border-radius: 2px;
    filter: grayscale(0);
    transition: .3s ease-in-out;
    
    &:hover {
      filter: grayscale(100%);
    }
  }
  .link {
    color: #e67e22;
  }
</style>