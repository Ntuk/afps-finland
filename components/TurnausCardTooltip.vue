<template>
  <div class="card card-tooltip">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{title}}</p>
          <p>Peli:</p>
          <p class="subtitle is-6"><i>{{subtitle}}</i></p>
        </div>
      </div>

      <div class="content">
        {{description}}
      </div>
      <div class="content">
        <p>Palkinnot:</p>
        <ul class="wsl-list">
          <li
            v-for="item in wsl"
            :key="item.value"
            class="wsl-item">
            {{item.value}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { required: false, type: String },
    subtitle: { required: false, type: String },
    description: { required: false, type: String },
    wsl: { required: false, type: Array }
  }
}
</script>
<style scoped lang="scss">
  .card-tooltip {
    margin-left: 1rem;
    max-width: 350px;
    .title {
      font-size: 18px;
    }
    .wsl-list {
      margin-left: 13px;
      .wsl-item {
        font-size: 13px;
      }
    }    
  box-shadow: 0 8px 12px 0 rgba(24, 60, 52, 0.2), 0 0 1px 0 rgba(24, 60, 52, 0.2);
  border: 2px dashed #87dbfc;
  }
</style>