<template>
  <div class="opas-editor-container">
    <div class="container">
      <div class="opas-section-user">
        <user-tile
          :name="opas.author.username"
          :avatar="opas.author.avatar"
          :date="opas.createdAt | formatDate('LLL')"
         />
      </div>
      <editor-view :initialContent="opas.content" />
    </div>
      <a class="navbar-item-slug" href="/#oppaat" v-smooth-scroll="{ duration: 1000 }">
        <div class="menu-item-container-slug">
          <span class="is-icon"><i class="fa fa-file-alt fa-lg"/></span>
          <nav-link to="/">
            <span>Takaisin</span>
          </nav-link>
        </div>
      </a>
  </div>
</template>

<script>
import UserTile from '~/components/shared/UserTile'
import EditorView from '~/components/editor/EditorView'
export default {
  head() {
    return {
      title: this.opas.title,
      meta: [
        { hid: 'description', name: 'description', content: this.opas.subtitle }
      ]
    }
  },
  components: {
    UserTile,
    EditorView
  },
  computed: {
    opas() {
      return this.$store.state.opas.item
    }
  },
  async fetch({store, params}) {
    await store.dispatch('opas/fetchOpasBySlug', params.slug)
  }
}
  window.addEventListener("load", playerSizer);
  window.addEventListener("resize", playerSizer);
  function playerSizer() {
    var player = document.getElementById("player");
    var width = player.offsetWidth;
    player.style.height = (width * 0.5625) + "px";
  }
</script>
<style scoped lang="scss">
  .opas-content, .opas-section-user {
    padding-top: 100px;
    max-width: 800px;
    margin: 10px auto;
  }
  .menu-item-container-slug {
    display: block;
    text-align: center;
    color: #87dbfc;
    font-size: 24px;
    // font-family: 'East Sea Dokdo', cursive;
    font-family: 'Roboto';
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    margin-top: 10px;
    width:200px;
    background-color: #f2f3f5 !important;

    a {
      color: #87dbfc;
      text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
      background-color: #f2f3f5 !important;
    }

    &:hover {
      color: rgb(229, 244, 248);
      background-color: #f2f3f5 !important;

      a {
        color: rgb(229, 244, 248);
      }

      .is-icon {
        transform-origin: bottom left;
        will-change: transform;
        transform: rotate(-11deg);
        // transition: 0.2s ease-in-out;
      }
    }
  }
  .navbar-link,.navbar-item-slug {
    align-items: center;
    display: flex;
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: center;
  }
  .video-container {
    overflow: hidden;
    position: relative;
    width:100%;
  }
  .video-container::after {
      padding-top: 56.25%;
      display: block;
      content: '';
  }
  .video-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
  }
</style>

