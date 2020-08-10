<template>
  <editor-menu-bar
    :editor="editor"
    v-slot="{ commands, isActive }">
    <div class="menubar">
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bold() }"
        @click.prevent="commands.bold()">
        <icon name="bold" size="small" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.italic() }"
        @click.prevent="commands.italic()">
        <icon name="italic" size="small" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click.prevent="commands.bullet_list">
        <icon name="list-ul" size="large" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click.prevent="commands.ordered_list">
        <icon name="list-ol" size="large" />
      </button>
      <button
        class="menubar__button"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click="commands.link">
        <icon name="link" size="small" />
      </button>
    </div>
  </editor-menu-bar>
</template>
<script>
import { EditorMenuBar } from 'tiptap'
import Icon from '~/components/shared/Icon'
import { Link } from 'tiptap-extensions'
export default {
  components: {EditorMenuBar, Icon},
  props: {
    editor: Object
  }
}
</script>
<style scoped>
  .menubar {
    border-radius: 0px;
  }
</style>




