<template>
  <div>
    <Header
      title="Write your blog"
      exitLink="/administrator/blogs">
      <template v-if="blog.status === 'active'" #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @submitted="updateBlogStatus($event, 'julkaistu')"
            @opened="checkBlogValidity"
            openTitle="Julkaise"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Varmista">
            <div>
              <div class="title">Kun uutinen on julkaistu, sen url-osoitetta ei voi enää vaihtaa.</div>
              <!-- Check for error -->
              <div v-if="!publishError">
                <div class="subtitle">Uutisen osoite näyttää tältä julkaisun jälkeen:</div>
                <article class="message is-success">
                  <div class="message-body">
                    <strong>{{getCurrentUrl()}}/blogs/{{slug}}</strong>
                  </div>
                </article>
              </div>
              <article v-else class="message is-danger">
                <div class="message-body">
                  {{publishError}}
                </div>
              </article>
            </div>
          </Modal>
        </div>
      </template>
      <template v-else #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            openTitle="Poista julkaistuista"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Epäjulkaise uutinen">
            <div>
              <div class="title">Poista uutinen julkisesta näkymästä.</div>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="blog-editor-container">
      <div class="container">
        <editor
          @editorMounted="initBlogContent"
          @editorUpdated="updateBlog"
          :isSaving="isSaving"
          ref="editor"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Editor from '~/components/editor'
import Header from '~/components/shared/Header'
import Modal from '~/components/shared/Modal'
import { mapState } from 'vuex'
import slugify from 'slugify'

export default {
  layout: 'administrator',
  components: {
    Editor, Header, Modal
  },
  data() {
    return {
      publishError: '',
      slug: ''
    }
  },
  computed: {
    ...mapState({
      blog: ({administrator}) => administrator.blog.item,
      isSaving: ({administrator}) => administrator.blog.isSaving
    }),
    editor() {
      return this.$refs.editor
    }
  },
  async fetch({params, store}) {
    await store.dispatch('administrator/blog/fetchBlogById', params.id)
  },
  methods: {    
    initBlogContent(initContent) {
      if (this.blog && this.blog.content) {
        initContent(this.blog.content)
      }
    },
    updateBlog(blogData) {
      if (!this.isSaving) {
        this.$store.dispatch('administrator/blog/updateBlog', {data: blogData, id: this.blog._id})
        .then(_ => this.$toasted.success('Uutinen päivitetty!', {duration: 2000}))
        .catch(error => this.$toasted.error('Uutista ei pystytty tallentamaan', {duration: 2000}))
      }
    },
    updateBlogStatus({closeModal}, status) {
      const blogContent = this.editor.getContent()
      blogContent.status = status

      const message = status === 'published' ? 'Uutinen on julkaistu!' : 'Uutinen on poistettu julkisesta näkymästä!'

      this.$store.dispatch('administrator/blog/updateBlog', {data: blogContent, id: this.blog._id})
        .then(_ => {
          this.$toasted.success(message, {duration: 3000})
          closeModal()
        })
        .catch(error => this.$toasted.error('Uutista ei pystytty julkaisemaan!', {duration: 3000}))
    },
    checkBlogValidity() {
      const title = this.editor.getNodeValueByName('title')
      this.publishError = ''
      this.slug = ''
      if (title && title.length > 15) {
        this.slug = this.slugify(title)
      } else {
        this.publishError = 'Julkaisu ei onnistu! Otsikon on oltava vähintään 15 merkkiä pitkä.'
      }
    },
    getCurrentUrl() {
      // process.client will return true if we are in browser environment
      return process.client && window.location.origin
    },
    slugify(text) {
      return slugify(text, {
        replacement: '-',
        remove: null,
        lower: true
      })
    }
  }
}
</script>
