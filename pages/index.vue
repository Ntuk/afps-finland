<template>
  <div>
    <Hero
      :title="turnausHero.title"
      :subtitle="turnausHero.subtitle"
      :image="turnausHero.image"
      :promoLink="turnausHero.product && turnausHero.product.productLink"
    />

    <section class="section" id="oppaat">
      <div class="header container">        
        OPPAAT JA PELISUOSITUKSET
      </div>
      <div class="container">
        <div class="columns is-mobile">
          <!-- posts -->
          <div class="column is-8">
            <!-- opas -->           
            <div 
              v-for="opas in publishedOppaat" 
              :key="opas._id"
              class="section"
            >
              <div class="post">
                <div @click="$router.push(`/oppaat/${opas.slug}`)" class="post-header clickable">
                  <h4 class="title is-4">{{opas.title}}</h4>
                  <h5 class="subtitle is-5">{{opas.subtitle}}</h5>
                </div>
                <div class="post-content">                   
                  <figure class="avatar">
                    <img :src="opas.author.avatar" class="avatar"/>
                  </figure> 
                  <span class="is-icon"><i class="fa fa-pen-alt fa-xs"/></span>{{opas.author.username}}, {{opas.createdAt | formatDate}}
                </div>
              </div>
            </div>
            <!-- end of opas -->
            <!-- pagination -->
            <div v-if="pagination.pageCount && pagination.pageCount > 1" class="section">
              <no-ssr placeholder="Loading...">
                <paginate
                  v-model="currentPage"
                  :page-count="pagination.pageCount"
                  :click-handler="fetchOppaat"
                  :prev-text="'Edellinen'"
                  :next-text="'Seuraava'"
                  :container-class="'paginationContainer'">
                </paginate>
              </no-ssr>
            </div>
            <!-- end of pagination -->
          </div>
          <!-- side bar -->
          <div class="column is-4 is-narrow">
            <!-- tärkeät -->
            <div class="section featured-check">
              <div class="sidebar">
                <div class="sidebar-header">
                  <h4 class="title is-4">Ajankohtaiset oppaat</h4>
                </div>
                <div class="sidebar-list">
                  <!-- Ajankohtaiset Oppaat -->
                  <p
                    v-for="fOpas in featuredOppaat"
                    :key="fOpas._id">
                    <nuxt-link :to="`/oppaat/${fOpas.slug}`">
                      {{fOpas.title}}
                    </nuxt-link>
                  </p>
                  <!-- Ajankohtaiset Oppaat -->
                </div>
              </div>
            </div>
          </div>
          <!-- end of side bar -->
        </div>
      </div>        
    </section>

    <section class="section" id="afps-finland">
      <div class="header container">
        AFPS?
      </div>
      <div class="rows container">
        <div class="row is-half">
          <p class="disco-subtitle">Mikä Arena FPS?</p>
          <p>Luultavasti tiedätkin jo FPS (First person shooter)-peleistä, mikäli olet sivuille eksynyt. Tästä huolimatta pieni katsaus FPS/AFPS -maailmaan lienee paikallaan. Jotta voisimme ymmärtää Arena shootereita, meidän on ensin aloitettava FPS-peleistä yleisesti. FPS-pelit ovat klassinen peligenre, jossa pelin kulku on kuvattu hahmon silmistä käsin eli ensimmäisestä persoonasta. Peleissä kontrolloidaan liikkumista näppäimistöllä ja ympäriinsä katsellaan hiirtä käyttäen. Genre alkoi id Softwaren vuonna 1992 julkaiseman <b>Wolfenstein 3D</b>:n siivittämänä. FPS genre on pysynyt suosittuna jo lähes 30 vuotta ja mukaan mahtuu muitakin klassikoita kuten <b>Doom</b>, <b>Half-Life</b> ja massiivisen suosittu <b>Call of Duty</b> -sarja.</p>
          <hr/>
          <p>Arena FPS pelit ovat FPS-pelien yksi vanhimpia 'alalajeja'. Kuten nimestä voi päätellä, Arena shooterit laittavat pelaajat toisiaan vastaan erilaisille 'areenoille' deathmatchiin ja tyypillisesti kartalta löytyy aseita, ammuksia, armoreita ja poweruppeja ripoteltuna ennalta määritetyistä paikoista. Arena FPS:t keskittyvät pääsääntöisesti moninpeliin ja yksinpelimoodit koostuvat pääasiassa boteista, joita vastaan pelaaja voi harjoitella kuin hän pelaisi oikeita ihmisiä vastaan.</p>
          <p>Pelien asearsenaalit sisältävät perinteisesti ainakin jossain muodossa Rocket launcherin, Railgunin sekä Lightning gunin jotka ovatkin luultavasti pelien käytetyimpiä aseita. Edellä mainittujen lisäksi joukosta löytyy usein Shotgun, Grenade Launcher ja Plasma gun.</p>
          <br/>
          <p>Alta löytyy pätevä kuvaus AFPS-peleistä videomuodossa englanniksi:</p>
          <div class="video-container">
            <iframe 
              src="https://www.youtube.com/embed/owpHC4Pg550" 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
            ></iframe>
          </div>
          <br/>
          <p>Loppuun vielä esimerkkejä suosituista AFPS-peleistä:</p>
          <div class="game-list">
            <ul>
              <li><img class="game-icon" src="https://www.nicotukiainen.com/legacy/images/icons/quake-icon.png"><b>Quake</b>, <b>Quake 2</b>, <b>Quake 3: Arena</b>, <b>Quake 4</b>, <b>Quake Live</b>, <b>Quake Champions</b>
              </li>
              <li><img class="game-icon" src="https://www.nicotukiainen.com/legacy/images/icons/ut-icon.png"><b>Unreal Tournament (99)</b>, <b>Unreal Tournament 2004</b> ja <b>Unreal Tournament 3</b>
              </li>
              <li><img class="game-icon" src="https://www.nicotukiainen.com/legacy/images/icons/doom-icon.png"><b>Doom</b>, <b>Doom 2</b>
              </li>
            </ul>
          </div>
        </div>
        <hr/>
        <div class="row is-half">  
          <figure class="avatar not-news">
            <img src="https://www.nicotukiainen.com/legacy/images/afps-finland-icon.jpg">
          </figure>                
          <p class="disco-subtitle">Mikä AFPS Finland?</p>
          <p>AFPS-pelit ovat pahamaineisen tunnettuja siitä, että niissä on erittäin korkea taitokatto. Tämä tarkoittaa sitä, että usein uudet pelaajat jäävät helposti 20 vuotta Quakea pelanneiden jalkoihin eikä peli tunnu enää niin hauskalta.
          Sen sijaan, että löisit heti hanskat tiskiin, kannattaa liittyä AFPS Finlandin Discord-kanavalle (<a href="https://discord.gg/jMehYtZ"><img class="game-icon" src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png"/><b>https://discord.gg/jMehYtZ</b></a>)
          ja/tai katsastaa sivujen <a href="#oppaat">OPPAAT</a> -osio, jonne päivitellään uutta sisältöä säännöllisen epäsäännöllisesti. AFPS Finland järjestää myös pienimuotoisia Arena shooter-turnauksia sekä LANeja. 
          Discordissa veteraanit kohtaavat uudemmat pelaajat ja omaan peliin voi löytyä myös tarvittavia vinkkejä. Kanavalle saa myös tulla idlaamaan tai höpöttelemään niitä näitä. 
          Tervetuloa!</p> 
        </div>
      </div>        
    </section> 

    <section class="section" id="turnaukset">
      <div class="header container">
        TURNAUKSET
      </div>
      <div class="rows container">
        <div class="row is-half">
          <figure class="avatar not-news">
          <img src="https://media.gettyimages.com/vectors/golden-trophy-cup-hand-drawn-vector-id689974954">
        </figure>
            <p class="disco-subtitle">Tulevat turnaukset</p>
            <div class="is-flexible">
          </div>
            <div class="columns is-multiline">
              <div            
                v-for="turnaus in turnaukset"
                v-if="turnaus.dateStatus === 'future'"
                :key="turnaus._id"
                class="column is-one-quarter"
              >
                <v-popover
                  offset="0"
                  trigger="hover"
                  placement="right-start">
                  <turnaus-card :turnaus="turnaus"/>
                  <template slot="popover">
                    <turnaus-card-tooltip
                      :title="turnaus.title"
                      :subtitle="turnaus.category.name"
                      :description="turnaus.subtitle"
                      :wsl="turnaus.wsl"
                    />
                  </template>
                </v-popover>
              </div>
            </div>
        </div>
        <hr>
        <div class="row is-half">
          <p class="disco-subtitle">Menneet turnaukset</p>
          <div class="is-flexible">
          </div>
            <div class="columns is-multiline">
              <div            
                v-for="turnaus in turnaukset"
                v-if="turnaus.dateStatus === 'history'"
                :key="turnaus._id" 
                class="column is-one-quarter"
              >
                <v-popover
                  offset="0"
                  trigger="hover"
                  placement="right-start">
                  <turnaus-card :turnaus="turnaus"/>
                  <template slot="popover">
                    <turnaus-card-tooltip
                      :title="turnaus.title"
                      :subtitle="turnaus.category.name"
                      :description="turnaus.subtitle"
                      :wsl="turnaus.wsl"
                    />
                  </template>
                </v-popover>
              </div>
            </div>
        </div>
      </div>    
    </section>

    <section class="section" id="discord">
      <div class="header container">
        DISCORD
      </div>
      <div class="columns container">
        <div class="column is-half">
          <figure class="avatar not-news">
            <img src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png">
          </figure>
            <p class="disco-subtitle">Liity AFPS Finlandin Discord kanavalle!</p>
            <p>AFPS Finlandin Discord-kanava perustettiin vuonna 2018 ja yhteisön kantavana ajatuksena on ollut alusta saakka tuoda suomalaisia arenaräiskintöjen ystäviä yhteen. Yhteisö järjestää erinäisiä turnajaisia, mittelöitä sekä LAN-tapahtumia sillä yhdessä pelaaminen on hauskempaa. Tervetuloa mukaan vaikka aikaisempaa AFPS-kokemusta ei vielä löytyisikään! </p>
            <br/>
            <p>Liity tästä: <a href="https://discord.gg/jMehYtZ">https://discord.gg/jMehYtZ</a></p>
            <br/>
            <img class="site-image" src="https://www.pcinvasion.com/wp-content/uploads/2016/08/Diabotical-1200x675.jpg">
        </div>
        <div class="column is-half">
          <iframe
            src="https://discordapp.com/widget?id=276662021397676032&theme=dark"
            width="100%"
            height="500" 
            allowtransparency="true" 
            frameborder="0" 
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            id="widgetti"
          ></iframe>
        </div>
      </div> 
    </section>

    <section class="section" id="footer">
      <span class="is-icon"><i class="fa fa-copyright"/></span> <a target="_blank" href="https://www.nicotukiainen.com">Nico "sc4ndroid" Tukiainen 2020</a>
    </section>
  </div>
</template>

<script>
import TurnausCard from '~/components/TurnausCard'
import TurnausCardTooltip from '~/components/TurnausCardTooltip'
import OpasCard from '~/components/OpasCard'
import Hero from '~/components/shared/Hero'
import vueSmoothScroll from 'vue2-smooth-scroll'
import Vue from 'vue'
import { mapState } from 'vuex'
Vue.use(vueSmoothScroll)
export default {
  head: {
    title: 'AFPS Finland',
  },
  data() {
    return {
      dateStatus: null,
    };
  },
  components: {
    TurnausCard, OpasCard, Hero, TurnausCardTooltip, vueSmoothScroll
  },
  computed: {
    ...mapState({
      publishedOppaat: state => state.opas.items.all,
      featuredOppaat: state => state.opas.items.featured,    
      pagination: state => state.opas.pagination,
      turnaukset: state => state.turnaus.items,
      turnausHero: state => state.hero.item || {}
    })
  },
  currentPage: {
    get() {
      return this.$store.state.opas.pagination.pageNum
    },
    set(value) {
      this.$store.commit('opas/setPage', value)
    }
  },
  async fetch({store, query}) {
    // Try to get values from query
    const filter = {}
    const {pageNum, pageSize} = query
    if (pageNum && pageSize) {
      filter.pageNum =  parseInt(pageNum, 5)
      filter.pageSize = parseInt(pageSize, 5)
      store.commit('opas/setPage', filter.pageNum)
    } else {
      filter.pageNum = store.state.opas.pagination.pageNum
      filter.pageSize = store.state.opas.pagination.pageSize
    }
    await store.dispatch('turnaus/fetchTurnaukset')
    await store.dispatch('opas/fetchOppaat', filter)
    await store.dispatch('opas/fetchFeaturedOppaat', {'filter[featured]': true})
  },
  methods: {
    setQueryPaginationParams() {
      const { pageSize, pageNum } = this.pagination
      this.$router.push({query: {pageNum, pageSize}})
    },
    fetchOppaat() {
      const filter = {}
      filter.pageSize = this.pagination.pageSize
      filter.pageNum = this.pagination.pageNum
      // Here store the query params!
      this.$store.dispatch('opas/fetchOppaat', filter)
        .then(_ => this.setQueryPaginationParams())
    },
  }
}
</script>

<style scoped lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  hr {
    background-color: #65a1b9;
  }
  .navbar {
    background-color: transparent;
  }
  .header {
    font-size: 50px;
    // font-family: 'East Sea Dokdo', cursive;
    font-family: 'Roboto';
    color: #87dbfc;
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    padding-top: 6rem !important;
    border: 0 !important;
    background-color: transparent !important;
  }
  .disco-subtitle {
    font-size: 30px;
    // font-family: 'East Sea Dokdo', cursive;
    font-family: 'Roboto';
    color: #87dbfc;
    margin: 0;
    text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
    border: 0 !important;
    background-color: transparent !important;
  }
  #widgetti {
    height: 100%;
    border: 1px solid black;
    border-radius: 6px;
  }
  .site-image {
    border: 1px solid black;
    border-radius: 6px;
  }
  .container {
    padding: 2rem;
    border: 2px solid black; 
    border-radius: 5px;
    background-color: rgba(205, 210, 214, 0.8);
    margin: 0 auto;
  }
  .avatar {
    float: left;
  }
  .not-news {
    margin-right: 2rem;
  }
  .is-flexible {
    display: inline-flex;
    flex-wrap: nowrap;
    width: 100%;

    button {
      color: #e67e22;
      background-color: #ecf0f1;
      border: 1px solid #dbdbdb;
      margin-left: 16px;

      &:hover {
        background-color: #f4f5f5;
        border: 1px solid #e67e22;
      }
    }
  }
  .links {
    padding-top: 15px;
  }
  .link {
    color: #e67e22;
  }
  #oppaat {
    position: relative; 
    padding-bottom: 8rem;
    padding-top: 2rem;
  }
  #oppaat::before {
    content: "";
    background: url('https://www.pcgamesn.com/wp-content/uploads/2019/03/Quake-3-Arena-Live-header-1.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.1;
  }
  #afps-finland {
    background : url(http://nicotukiainen.com/legacy/images/diabo2.jpg) no-repeat center center;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-size: cover !important;
    -webkit-background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding-bottom: 8rem;
    padding-top: 2rem;
  }
  #turnaukset {
    // background-color: rgb(210, 210, 211);
    background: radial-gradient(circle, rgba(210,210,211,1) 0%, rgba(192,192,212,1) 100%);
    padding-bottom: 8rem;
    padding-top: 2rem;
  }
  #discord {
    // background-color: rgb(165, 165, 206);
    background: radial-gradient(circle, rgba(165,165,206,1) 0%, rgba(151,151,193,1) 100%);
    padding-bottom: 7rem;
    padding-top: 2rem;
  }
  #footer {
    // background-color: rgb(89, 89, 117);
    background: radial-gradient(circle, rgba(89,89,117,1) 0%, rgba(72,72,97,1) 100%);
    padding: 3rem 0;
    font-size: 12px;
    text-align: center;
    color: white; 

    a {
      color: white; 
    }
  }

//OPPAAT
.avatar img {
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
.is-icon {
  padding-left: 8px;
  padding-right: 8px;
}
.post-content {
  display: flex;
  justify-content: flex-start;
  font-style: italic;
  align-items: center;
}
.pagination-content {
  display: flex;
  justify-content: flex-end;
}
.clickable {
  cursor: pointer;
}
#root {
    flex: 1 0 auto;
}
*:focus {
    outline: none;
}
a {
    transition: all .35s;
    color: #000;
}
.button:focus {
    border-color: #d74436;
    box-shadow: 0 0 0 0;
}
.input, .textarea, .input[type] {
    font-size: 1.1rem;
}
.input:focus, .textarea:focus, .input[type]:focus {
    border: 2px solid #d74436;
}
/* this is used when inline-styled content
   overlaps text backgrounds in a really ugly way */
.buffer {
    padding-bottom: 1.1rem;
}
/* navigation */
.nav {
    background-color: #0d0c0d;
}
.nav-left {
    padding-left: 2rem;
}
.nav-right, .nav-center {
    padding-right: 2rem;
}
a.nav-item.is-tab {
    font-weight: 700;
    font-size: 13px;
    text-transform: uppercase;
    color: #fff;
    padding: 0.4rem;
}
a.nav-item:hover {
    color: #d74436;
}
a.nav-item.is-tab:hover {
    border-bottom: 4px solid #d74436;
}
/* main content */
.main-content {
    padding: 80px 0 2rem 0;
    min-height: 800px
}
.main-content .container {
  padding: 2rem;
  border: 1px dashed #f1c40f;
  border-radius: 5px;
  background-color: rgba(189, 195, 199, 0.3);
}

/* AFPS-Finland */
.game-icon {
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-right: 0.5rem;
}
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

/* section */
.section {
    padding: 0 0 2rem 0;
}
.section-header {
    padding-bottom: 2rem;
}
.section-header .title {
    text-transform: uppercase;
    color: #4a4a4a;
    font-size: 1.3rem;
}
.section-header a {
    color: #d74436;
    font-weight: 700;
}
.section-header a:hover {
    color: #e50076;
}
/* sidebar */
.sidebar-header {
    border-color: #77beda;
    padding-bottom: 1rem;
    border-bottom: 4px solid #77beda;
}
.sidebar-header .title, .sidebar-header-single .title {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.3rem;
}
.sidebar-list p, .sidebar-list-single p {
    font-size: 1.1rem;
    font-weight: 300;
    padding-bottom: 0.8rem;
}
.sidebar-list a {
    color: #4a4a4a;
}
.sidebar-list, .post-content, .sidebar-list-single {
    padding-top: 1.4rem;
}
.sidebar-list-nav {
    padding-top: 1rem;
}
.sidebar-list-nav .is-tab {
    padding-right: 1rem;
}
.sidebar-footer-single {
    padding-top: 2rem;
}
.sidebar-footer-single a {
    color: #000;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 1.1rem;
    border-right: 4px solid #d74436;
    padding-right: 1rem;
}
.sidebar-footer-single a:hover {
    color: #363636;
}
/* post */
.post-header, .sidebar-header-single {
    border-color: #77beda;
    padding-left: 1rem;
    border-left: 4px solid #77beda;
}
.post-header .title {
    font-weight: 700;
    font-size: 1.8rem;
    color: rgba(0,0,0,.84)!important;
    fill: rgba(0,0,0,.84)!important;
}
.post-header .subtitle, .sidebar-header-single .subtitle {
    font-size: 1.1rem;
}
.post-content p, .post-single-content p {
    margin-bottom: 0.8rem;
}
.post-content, .post-single-content {
    font-size: 1.1rem;
    font-weight: 300;
}
/* override */
.post-single-content form p:nth-child(even) {
    border-right: 0;
}
.post-single-content form label {
    text-transform: uppercase;
    color: #4a4a4a;
    padding-bottom: 0.2rem;
}
.post-single-content form .input[type] {
    padding-top: 0.2rem;
}
.post-single-content p:nth-child(even) {
    border-right: 4px solid #d74436;
    padding-right: 1rem;
}
.post-content a {
    color: #d74436;
}
.card-content-form form {
    padding-top: 1.5rem;
}
.post-footer {
    padding: 1.5rem 0 0 0;
}
/* pagination */
.pagination-content {
    border-right: 4px solid #d74436;
    padding-right: 1rem;
}
.pagination-link.is-current {
    background-color: #d74436;
    border-color: #d74436;
}
  @media screen and (max-width: 314px) {
    .header {
      font-size: 30px;
    }
    .container {
      margin-left: 2rem;
      margin-right: 2rem;
    }
    .featured-check {
      display: none;
    }
    .column.is-4.is-narrow {
      display: none;
    }
    .column.is-8 {
      width: 100% !important;
    }
  }
  @media screen and (min-width: 314px) and (max-width: 1024px){
    .header {
      font-size: 34px;
    }
    .container {
      margin-left: 2rem;
      margin-right: 2rem;
    }
    .featured-check {
      display: none;
    }
    .column.is-4.is-narrow {
      display: none;
    }
    .column.is-8 {
      width: 100% !important;
    }
  }
</style>
