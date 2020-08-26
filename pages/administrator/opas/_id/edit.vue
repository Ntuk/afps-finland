<template>
  <div>
    <Header
      title="Kirjoita opas"
      exitLink="/administrator/oppaat">
      <template v-if="opas.status === 'active'" #actionMenu>
        <div class="full-page-takeover-header-button">
          <Modal
            @submitted="updateOpasStatus($event, 'published')"
            @opened="checkOpasValidity"
            openTitle="Julkaise"
            openBtnClass="button is-success is-medium is-inverted is-outlined"
            title="Varmista">
            <div>
              <div class="title">Kun opas on julkaistu, sen url-osoitetta ei voi enää vaihtaa.</div>
              <!-- Check for error -->
              <div v-if="!publishError">
                <div class="subtitle">Oppaan osoite näyttää tältä julkaisun jälkeen:</div>
                <article class="message is-success">
                  <div class="message-body">
                    <strong>{{getCurrentUrl()}}/oppaat/{{slug}}</strong>
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
            title="Epäjulkaise opas">
            <div>
              <div class="title">Poista opas julkisesta näkymästä.</div>
            </div>
          </Modal>
        </div>
      </template>
    </Header>
    <div class="opas-editor-container">
      <div class="container">
        <editor
          @editorMounted="initOpasContent"
          @editorUpdated="updateOpas"
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
      opas: ({administrator}) => administrator.opas.item,
      isSaving: ({administrator}) => administrator.opas.isSaving
    }),
    editor() {
      return this.$refs.editor
    }
  },
  async fetch({params, store}) {
    await store.dispatch('administrator/opas/fetchOpasById', params.id)
  },
  methods: {    
    initOpasContent(initContent) {
      if (this.opas && this.opas.content) {
        initContent(this.opas.content)
      }
    },
    updateOpas(opasData) {
      if (!this.isSaving) {
        this.$store.dispatch('administrator/opas/updateOpas', {data: opasData, id: this.opas._id})
        .then(_ => this.$toasted.success('Opas päivitetty!', {duration: 2000}))
        .catch(error => this.$toasted.error('Opasta ei pystytty tallentamaan!', {duration: 2000}))
      }
    },
    updateOpasStatus({closeModal}, status) {
      const opasContent = this.editor.getContent()
      opasContent.status = status

      const message = status === 'published' ? 'Opas on julkaistu!' : 'Opas on poistettu julkisesta näkymästä!'

      this.$store.dispatch('administrator/opas/updateOpas', {data: opasContent, id: this.opas._id})
        .then(_ => {
          this.$toasted.success(message, {duration: 3000})
          closeModal()
        })
        .catch(error => this.$toasted.error('Opasta ei pystytty julkaisemaan!', {duration: 3000}))
    },
    checkOpasValidity() {
      const title = this.editor.getNodeValueByName('title')
      this.publishError = ''
      this.slug = ''
      if (title && title.length > 2) {
        this.slug = this.slugify(title)
      } else {
        this.publishError = 'Julkaisu ei onnistu! Otsikon on oltava vähintään 3 merkkiä pitkä.'
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
