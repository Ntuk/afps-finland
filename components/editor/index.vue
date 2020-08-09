<template>
  <div class="editor editor-squished">
    <Modal ref="ytmodal"/>
    <basic-menu :editor="editor">
      <template #saveButton>
        <button
          @click="emitUpdate"
          :disabled="isSaving"
          class="button is-success button-save">
          Tallenna
        </button>
      </template>
    </basic-menu>
    <bubble-menu :editor="editor" />
    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import BubbleMenu from '~/components/editor/BubbleMenu'
import BasicMenu from '~/components/editor/BasicMenu'
import {
  Heading,
  Image,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Blockquote,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  CodeBlockHighlight,
  Placeholder
} from 'tiptap-extensions'
import Title from '~/components/editor/components/Title'
import Subtitle from '~/components/editor/components/Subtitle'
import Doc from '~/components/editor/components/Doc'
import Iframe from "~/components/editor/components/Iframe"
import Modal from "~/components/editor/Modal"
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
export default {
  components: {
    EditorContent,
    BubbleMenu,
    BasicMenu,
    Modal
  },
  props: {
    isSaving: {
      required: false,
      default: false
    }
  },
  data() {
    return {
      editor: null
    }
  },
  // This is called only on client (in browser)
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Doc(),
        new Title(),
        new Subtitle(),
        new Placeholder({
          showOnlyCurrent: false,
          emptyNodeText: node => {
            if (node.type.name === 'title') {
              return 'Otsikko'
            }
            if (node.type.name === 'subtitle') {
              return 'Väliotsikko'
            }
            return 'Kirjoita opas...'
          }
        }),
        new Heading({ levels: [1, 2, 3]}),
        new Image(),
        new Iframe(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new Blockquote(),
        new HorizontalRule(),
        new OrderedList(),
        new BulletList(),
        new ListItem(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
          }
        })
      ]
    })
    // this.$emit('editorMounted', this.editor)
    this.$emit('editorMounted', this.setInitialContent)
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor && this.editor.destroy()
  },
  methods: {
    emitUpdate() {
      const content = this.getContent()
      this.$emit('editorUpdated', content)
    },
    getContent() {
      const html = this.editor.getHTML()
      const title = this.getNodeValueByName('title')
      const subtitle = this.getNodeValueByName('subtitle')
      
      return {content: html, title, subtitle}
    },
    getNodeValueByName(name) {
      const docContent = this.editor.state.doc.content
      const nodes = docContent.content
      const node = nodes.find(n => n.type.name === name)
      if (!node) return ''

      return node.textContent
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },
    setInitialContent(content) {
      this.editor.setContent(content)
    }
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
  .button-save {
    float: right;
    background-color: #23d160;
    &:hover {
      background-color: #2bc76c;
    }
    &:disabled {
      cursor: not-allowed;
    }
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
