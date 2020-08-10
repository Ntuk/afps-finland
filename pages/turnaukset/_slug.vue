<template>
  <div>
    <secondary-navbar />
    <div class="containeri">
      <product-hero
        :title="turnaus.title"
        :subtitle="turnaus.subtitle"
        :author="turnaus.author">
        <product-hero-card
          :navigateTo="turnaus.productLink"
          :requirements="turnaus.requirements"
          :image="turnaus.image" 
        />
      </product-hero>
      <div class="container">
        <div class="section">
          <div class="what-you-get">
            <div class="what-you-get-title">
              Palkinnot
            <ul class="what-you-get-items">
              <li
                  v-for="wsl in turnaus.wsl"
                  :key="wsl.value"
                  class="what-you-get-item">
                <span>{{wsl.value}}</span>
              </li>
            </ul>
            </div>
          <div class="what-you-get-trophy">
            <img src="https://media.gettyimages.com/vectors/golden-trophy-cup-hand-drawn-vector-id689974954"/>
          </div>
          </div>
        </div>
        <div class="section turnaus-description p-t-none">
          <div class="turnaus-description-title">Info</div>
          <div class="turnaus-description-details">
            <div v-html="turnaus.description"></div>
          </div>
          <div v-if="turnaus.promoVideoLink != null">
            <br/>
            <p>Alla video turnauksesta:</p>
          </div>
          <div v-if="turnaus.promoVideoLink != null" class="video-container">
            <iframe 
              :src=turnaus.promoVideoLink
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div v-if="turnaus.productLink != null">
          <p>Alla turnauksen bracketit ja tulokset Challongesta:</p>
          <iframe :src="turnaus.productLink + '/module?scale_to_fit=1&show_standings=1'" 
            width="100%"
            frameborder="0" 
            scrolling="auto" 
            allowtransparency="true"
            id="challonge-widgetti"
          ></iframe>
        </div>
      </div>
      <a class="navbar-item-slug" href="/" v-smooth-scroll="{ duration: 1000 }">
        <div class="menu-item-container-slug">
          <span class="is-icon"><i class="fa fa-file-alt fa-lg"/></span>
            <nav-link to="/#turnaukset" @click="() => $router.push('/#turnaukset')">
            <span>Takaisin</span>
          </nav-link>
        </div>
      </a>
    </div>    
  </div>
</template>
<script>
import SecondaryNavbar from '~/components/shared/SecondaryNavbar'
import ProductHero from '~/components/ProductHero'
import ProductHeroCard from '~/components/ProductHeroCard'
export default {
  head() {
    return {
      title: this.turnaus.title,
      meta: [
        { hid: 'description', name: 'description', content: this.turnaus.subtitle }
      ]
    }
  },
  components: {
    ProductHero, ProductHeroCard, SecondaryNavbar
  },
  computed: {
    turnaus() {
      return this.$store.state.turnaus.item
    }
  },
  async fetch({store, params}) {
    await store.dispatch('turnaus/fetchTurnausBySlug', params.slug)
  }
}
</script>

<style lang="scss">
  .video-container {
    overflow: hidden;
    position: relative;
    width: 100%;
    overflow: hidden;
    padding-bottom: 56.25%;
    position: relative;
    height: 0;
    border: 1px solid black;
    border-radius: 3px;
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
  .containeri {
    padding-top: 100px;
  }
  .menu-item-container-slug {
    display: block;
    text-align: center;
    color: #87dbfc;
    font-size: 24px;
    font-family: 'Roboto';
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    margin-top: 10px;
    width:200px;
    background-color: #f2f3f5 !important;

    a {
      color: #87dbfc;
      text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
      background-color: #f2f3f5 !important;
    }

    &:hover {
      color: rgb(229, 244, 248);
      background-color: #f2f3f5 !important;

      a {
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
  .navbar-link,.navbar-item-slug {
    align-items: center;
    display: flex;
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 0;
    justify-content: center;
    padding-bottom: 100px;
    padding-top: 50px;
  }
  .what-you-get {
    display: flex;
    justify-content: space-between;
    background-color: #f9f9f9;
    border: 1px solid #dedfe0;
    padding: 10px 15px;
    background-color: white;

    &-title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 17px;
    }
    &-trophy {
      img{
        max-width: 200px;
        // border: 1px solid black;
      }
    }
    li {
      padding-top: 20px;
    }
  }
  .turnaus-description {
    &-title {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-details {
      font-size: 18px;
      ul {
        list-style: disc;
        margin-left: 20px;
      }
      ol {
        margin-left: 20px;
      }
      strong {
        font-size: 20px;
      }
      p {
        min-height: 30px;
      }
    }
  }
  #challonge-widgetti {
    max-height: 700px;
    height: -webkit-fill-available;
    border: 1px solid black;
    border-radius: 6px;
  }
</style>