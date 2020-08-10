<template>
  <div class="card ">
    <div class="card-image">
      <figure class="image is-4by2">
        <img :src="image" alt="Placeholder image">
      </figure>
    </div>
    <div v-if="navigateTo != ''" class="card-content">
      
    </div>
  </div>
</template>
<script>
export default {
  props: {
    requirements: {
      type: Array,
      default: null
    },
    navigateTo: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      required: false
    }
  }
}
</script>
<style scoped lang="scss">
  .card-content {
    padding: 0;
    display: flex;
    justify-content: center;
    // margin: 1rem 0;

    a {
      color: #f39c12;

      &:hover {
        color: #e67e22;
      }
    }
  }
  .card {
    z-index: 9999;
    min-width: 330px;
    height: 100%;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    .title {
      color: gray;
    }
    .subtitle {
      color: gray;
    }
    .turnaus-features {
      font-size: 17px;
    }
  }
</style>