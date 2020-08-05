<template>
  <div class="uutinen-editor-container">
    <div class="container">
      <div class="uutinen-section-user">
        <user-tile
          :name="uutinen.author.username"
          :avatar="uutinen.author.avatar"
          :date="uutinen.createdAt | formatDate('LLL')"
         />
      </div>
      <editor-view :initialContent="uutinen.content" />
    </div>
      <a class="navbar-item-slug" href="/#uutiset" v-smooth-scroll="{ duration: 1000 }">
        <div class="menu-item-container-slug">
          <span class="is-icon"><i class="fa fa-file-alt fa-lg"/></span>
          <nav-link to="/">
            <span>TAKAISIN UUTISIIN</span>
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
      title: this.uutinen.title,
      meta: [
        { hid: 'description', name: 'description', content: this.uutinen.subtitle }
      ]
    }
  },
  components: {
    UserTile,
    EditorView
  },
  computed: {
    uutinen() {
      return this.$store.state.uutinen.item
    }
  },
  async fetch({store, params}) {
    await store.dispatch('uutinen/fetchUutinenBySlug', params.slug)
  }
}
</script>
<style scoped lang="scss">
  .uutinen-content, .uutinen-section-user {
    padding-top: 100px;
    max-width: 800px;
    margin: 10px auto;
  }
  .menu-item-container-slug {
    display: block;
    text-align: center;
    color: #87dbfc;
    font-size: 24px;
    font-family: 'East Sea Dokdo', cursive;
    text-shadow:
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
    margin-top: 10px;
    width:200px;
    background-color: #f2f3f5 !important;

    a {
      color: #87dbfc;
      text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;
      background-color: #f2f3f5 !important;
    }

    &:hover {
      text-shadow:0px 0px 30px #f8e239;
      background-color: #f2f3f5 !important;

      a {
        text-shadow:0px 0px 30px #f8e239;
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
</style>

