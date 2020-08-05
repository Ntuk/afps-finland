<template>
    <section
      class="hero is-black is-medium" id="hero">
      <div class="hero-body">
        <div
          class="hero-img"
          :style="{ background : `url(http://nicotukiainen.com/legacy/images/afps-first.jpg) no-repeat center center`}">
        </div>
        <div class="container">
            <h1 class="hero-header">
              <div>
                <span>Tervetuliaisteksti</span>
              </div>
              <a href="#uutiset" v-smooth-scroll="{ duration: 1000 }"><i class="fa fa-angle-down fa-3x" aria-hidden="true"></i></a>
            </h1>
        </div>
      </div>
    </section>  
</template>
<script>
import vueSmoothScroll from 'vue2-smooth-scroll'
import Vue from 'vue'
Vue.use(vueSmoothScroll)
  export default {
    components: {
      vueSmoothScroll
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      subtitle: {
        type: String,
        default: ''
      },
      image: {
        type: String,
        default: 'http://nicotukiainen.com/legacy/images/afps-first.jpg'
      },
      promoLink: {
        type: String,
        default: '#'
      },
    }
  }
</script>
<style scoped lang="scss">
  .hero {
    width: 100vw;
    height: 100vh;
  }
  .hero-body {
    position: relative;
  }
  .hero-header {
    color: #f39c12;
      text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;

    .fa-angle-down {
      text-shadow:
      -1px -1px 0 #000,
      1px -1px 0 #000,
      -1px 1px 0 #000,
      1px 1px 0 #000;

      &:hover {
        text-shadow:0px 0px 30px #f8e239;
      }
    }
  }
  .container {
    justify-content: center;
    top: 30%;
    padding: 2rem;
    max-width: 800px;
    background: rgba(131, 228, 245, 0.1);
    border-radius: 5px;
    border: 1px solid black;
  }
  .hero-header {
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    i {
      color: #f39c12;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .hero-img {
    opacity: 0.7;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-size: cover !important;
    -webkit-background-size: cover;
  }
  .user-avatar {
    display: inline-block;
  }
  .is-black {
    background-color: black;
  }
  .title {
    // font-weight: bold;
    font-size: 30px;
  }
  .subtitle {
    /*font-weight: bold;*/
    font-size: 16px;
  }
  .author-name {
    font-size: 20px;
    font-weight: bold;
  }
</style>
