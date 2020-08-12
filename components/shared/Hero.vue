<template>
    <section class="hero is-medium hero">
      <div class="hero-body">
        <div class="hero-img">
        <video-background 
          src="http://nicotukiainen.com/legacy/images/dibbe.mp4"
          poster="http://nicotukiainen.com/legacy/images/afps-first.jpg"
          :sources="[
              {src: 'http://nicotukiainen.com/legacy/images/dibbe.mp4', res: 900, autoplay: true}, 
              {src: 'http://nicotukiainen.com/legacy/images/dibbe.mp4', res: 638, autoplay: true, poster: 'http://nicotukiainen.com/legacy/images/afps-first.jpg'}
          ]"
          style="max-height: 100vh; height: 100vh;"
          overlay="linear-gradient(45deg,#2a4ae430,#fb949e6b)" 
        ></video-background>
        </div>
        <div class="container">
        <p class="hero-logo-text">AFPS Finland</p>
        <!-- <img src="https://www.nicotukiainen.com/legacy/images/afps-logo.png"> -->
          <h1 class="hero-header">
            <a href="#oppaat" v-smooth-scroll="{ duration: 1000 }"><i class="fa fa-angle-down fa-10x" aria-hidden="true"></i></a>
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
  @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');
  .hero {
    width: 100vw;
    height: 100vh;
  }
  .hero-body {
    position: relative;
  }
  .hero-header {
    color: #87dbfc;
      text-shadow: 0 0 300px #000;

    .fa-angle-down {
      // text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000;
      text-shadow: 8px 0 0 #000, 0 -8px 0 #000, 0 8px 0 #000, -8px 0 0 #000;

      &:hover {
        color: rgb(229, 244, 248);
      }
    }
  }
  .container {
    display:flex;
    top: 30%;
    justify-content: center;
    flex-direction: column;

    .hero-logo-text {
      color: #87dbfc;
      font-size: 120px;
      text-align: center;
      font-family: 'East Sea Dokdo', cursive;
      text-shadow: 0 0 8px black, 0 0 8px black, 0 0 8px black, 0 0 8px black;
      line-height: 0.4;
    }

    img {
      width: -webkit-fill-available;
    }
  }
  .hero-header {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    i {
      color: #87dbfc;

      &:hover {
        cursor: pointer;
      }
    }
  }
  .hero-img {
    opacity: 1;
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
