<template>
  <nav class="navbar is-transparent" :class="{change_color: scrollPosition > 980}" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        <img src="https://www.nicotukiainen.com/legacy/images/afps-logo.png">
      </a>
      <a @click="isActive = !isActive"
          :class="{'is-active': isActive}"
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-center">
        <a class="navbar-item" href="#hero" v-smooth-scroll="{ duration: 1000 }">
          <div class="menu-item-container">
            <span class="is-icon"><i class="fa fa-rocket fa-lg"/></span>
            <a>
              Aloitus
            </a>
          </div>
        </a>
        <a class="navbar-item" href="#oppaat" v-smooth-scroll="{ duration: 1000 }">
          <div class="menu-item-container">
            <span class="is-icon"><i class="fa fa-file-alt fa-lg"/></span>
            <a>
              Oppaat
            </a>
          </div>
        </a>
        <a class="navbar-item" href="#afps-finland" v-smooth-scroll="{ duration: 1000 }">
          <div class="menu-item-container">
            <span class="is-icon"><i class="fa fa-crosshairs fa-lg"/></span>
            <a>
              AFPS?
            </a>
          </div>
        </a>
        <a class="navbar-item" href="#turnaukset" v-smooth-scroll="{ duration: 1000 }">
          <div class="menu-item-container">
            <span class="is-icon"><i class="fa fa-trophy fa-lg"/></span>
            <a>
              Turnaukset
            </a>
          </div>
        </a>
        <a class="navbar-item" href="#discord" v-smooth-scroll="{ duration: 1000 }">
          <div class="menu-item-container">
            <span class="is-icon"><i class="fab fa-discord fa-lg"/></span>
            <a>
              Discord
            </a>
          </div>
        </a>

        <template v-if="isAuth">
          <a class="navbar-item">
            <figure class="image avatar is-48x48 m-r-sm">
              <img class="is-rounded" :src="user.avatar">
            </figure>
            <div class="menu-item-container">
              Tervetuloa {{user.username}}!
            </div>
          </a>
          <a v-if="isAdmin" class="navbar-item" @click="() => $router.push('/administrator')">
            <div class="menu-item-container">
              Administrator
            </div>
          </a>
          <a class="navbar-item" @click="logout">
            <div class="menu-item-container">
              Kirjaudu ulos
            </div>
          </a>
        </template>
        <template v-else>
          <a class="navbar-item" href="/register">
            <div class="menu-item-container">
              <span class="is-icon"><i class="fa fa-user-plus fa-lg"/></span>
              <nav-link to="/register" id="login-signup">
                Rekisteröidy
              </nav-link>
            </div>
          </a>          
          <a class="navbar-item" href="/login">
            <div class="menu-item-container">
              <span class="is-icon"><i class="fa fa-sign-in-alt fa-lg"/></span>
              <nav-link to="/login" id="login-signup">
                Kirjaudu sisään
              </nav-link>
            </div>
          </a>
        </template>
        
      </div>
    </div>
  </nav> 
</template>
<script>
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
import { mapGetters } from 'vuex'
import vueSmoothScroll from 'vue2-smooth-scroll'
import Vue from 'vue'
Vue.use(vueSmoothScroll)
export default {
  data() {
    return {
      isActive: false,
      scrollPosition: null
    }
  },
  components: {
    vueSmoothScroll
  },
  computed: {
    ...mapGetters({
      'user': 'auth/authUser',
      'isAuth': 'auth/isAuthenticated',
      'isAdmin': 'auth/isAdmin'
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => this.$router.push('/'))
    },
    updateScroll() {
       this.scrollPosition = window.scrollY
    }
  },
  mounted() {
    window.addEventListener('scroll', this.updateScroll);
  }
}
</script>

<style lang="scss" scoped>
// @import url('https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');

  .menu-item-container {
    display: block;
    text-align: center;
    color: #87dbfc;
    font-size: 20px;
    // font-family: 'East Sea Dokdo', cursive;
    font-family: "Roboto";
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    margin-top: 10px;

    a {
      color: #87dbfc;
      text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    }

    &:hover {
      text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
      color: rgb(229, 244, 248);

      a {
        text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
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
  @media screen and (min-width: 1088px){
    .navbar {
      position: fixed;
      width: 100%;
      background-color: transparent;
    }
    .change_color {
      // background-color: rgb(177, 224, 238);
      background: url('http://nicotukiainen.com/legacy/images/visor3.png');
      width: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      border-bottom: 1px solid black;
      transition: 1s ease-in-out;
    }
    .navbar-center{
      display:flex;
      justify-content: stretch;
      align-items: stretch;
      flex-grow: 1;
      flex-shrink: 0;
      flex-direction: row;
    }
    .navbar-link,.navbar-item{
      align-items: center;
      display: flex;
      flex-basis: auto;
      flex-grow: 1;
      flex-shrink: 0;
      justify-content: center;
    }
      .navbar-dropdown .navbar-item{
        justify-content: center;
      }
  }
  @media screen and (min-width: 1088px) {
    .is-icon {
      position: relative;
      display: block;
      margin: 0 auto;
      width: 25px;
      margin-bottom: .25em;
      transform: rotate(0);
    }
  }
</style>


