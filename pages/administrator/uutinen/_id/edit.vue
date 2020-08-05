<template>
  <div>
    <Header
      title="Write your uutinen"
      exitLink="/administrator/uutiset">
      <template v-if="uutinen.status === 'active'" #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @submitted="updateUutinenStatus($event, 'published')"
            @opened="checkUutinenValidity"
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
                    <strong>{{getCurrentUrl()}}/uutiset/{{slug}}</strong>
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
    <div class="uutinen-editor-container">
      <div class="container">
        <editor
          @editorMounted="initUutinenContent"
          @editorUpdated="updateUutinen"
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
      uutinen: ({administrator}) => administrator.uutinen.item,
      isSaving: ({administrator}) => administrator.uutinen.isSaving
    }),
    editor() {
      return this.$refs.editor
    }
  },
  async fetch({params, store}) {
    await store.dispatch('administrator/uutinen/fetchUutinenById', params.id)
  },
  methods: {    
    initUutinenContent(initContent) {
      if (this.uutinen && this.uutinen.content) {
        initContent(this.uutinen.content)
      }
    },
    updateUutinen(uutinenData) {
      if (!this.isSaving) {
        this.$store.dispatch('administrator/uutinen/updateUutinen', {data: uutinenData, id: this.uutinen._id})
        .then(_ => this.$toasted.success('Uutinen päivitetty!', {duration: 2000}))
        .catch(error => this.$toasted.error('Uutista ei pystytty tallentamaan!', {duration: 2000}))
      }
    },
    updateUutinenStatus({closeModal}, status) {
      const uutinenContent = this.editor.getContent()
      uutinenContent.status = status

      const message = status === 'published' ? 'Uutinen on julkaistu!' : 'Uutinen on poistettu julkisesta näkymästä!'

      this.$store.dispatch('administrator/uutinen/updateUutinen', {data: uutinenContent, id: this.uutinen._id})
        .then(_ => {
          this.$toasted.success(message, {duration: 3000})
          closeModal()
        })
        .catch(error => this.$toasted.error('Uutista ei pystytty julkaisemaan!', {duration: 3000}))
    },
    checkUutinenValidity() {
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
