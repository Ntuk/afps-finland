<template>
  <div>
    <administrator-header title="Uploadaa kuvia">
      <template #actionMenu>
        <div class="full-page-takeover-header-button">
          <nuxt-link
            to="/"
            class="button is-danger is-medium is-inverted is-outlined">
            Takaisin
          </nuxt-link>
        </div>
      </template>
    </administrator-header>
    <div class="fileupload-page">
      <div class="container">
        <div class="rows">
          <div>
            <button class="uppibutton" @click="openUploadModal">Uppaa kuvia</button><p><b>HUOM! Ota kuvan URL talteen esikatselun alta uploadauksen jälkeen. Toistaiseksi ei ole muuta keinoa saada sitä tältä sivulta poistumisen jälkeen.</b></p>
          </div>
          <div style="padding-top:4rem;">
            Esikatselu
            <div class="esikatselu">
              <img :src="url" />
            </div>
            <p>Kuva on käytettävissä seuraavasta urlista: <b>{{url}}</b></p>
          </div>
        </div>
      </div>
    </div>
    <div class="columns medium-3">
      <div class="card">
      </div>
    </div>
  </div>
</template>
<script>
import AdministratorHeader from '~/components/shared/Header'
export default {
  layout: 'administrator', 
  components: {
    AdministratorHeader,
  },
  data() {
    return {
      url: '',
      results: []
    }
  },
  computed: {
  },
  fetch({store}) {
  },
  methods: {
    openUploadModal() {
      window.cloudinary.openUploadWidget(
        { cloud_name: 'dezjnxeig',
          upload_preset: 'fbxxifgh'
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log('Done uploading..: ', result.info);    
            this.url = result.info.url;      
          }
      }).open();
    },
  },
}
</script>
<style scoped lang="scss">

  .uppibutton {
    border: 1px solid #58529f;
    background-color: #b0abe4;
    border-radius: 3px;
    width: 300px;
    height: 100px;
    font-size: 50px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      cursor: pointer;
      background-color: #58529f;
      color: white;
    }
  }
  .esikatselu {
    display: block;
    background-color: #f4f4ff;
    border-radius: 6px;
    border: 2px dashed rgba(10, 10, 10, 0.1);
    min-height: 300px;
    min-width: 300px;
    margin: 5px;
  }
  .tile-image {
    float: left;
  }
  .flex-centered {
    align-items: center;
    justify-content: flex-end;
    display: flex;
  }
  .tile-overlay-container {
    position: relative;
    &:hover {
      box-shadow: none;
    }
    &:hover > .tile-overlay {
      background-color: rgba(255,255,255,.9);
    }
    &:hover .tile-overlay-text {
      visibility: visible;
    }
    .tile-overlay {
      position: absolute;
      display: block;
      height: auto;
      bottom: 0;
      width: auto;
      right: 0;
      top: 0;
      left: 0;
      z-index: 2;
      cursor: pointer;
      &-text {
        color: #58529f;
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: 18px;
        white-space: pre-wrap;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: 700;
        white-space: nowrap;
      }
    }
  }
  .fileupload-page {
    padding-top: 60px;
    &-title {
      font-size: 40px;
      font-weight: bold;
      padding-bottom: 20px;
    }
  }
</style>