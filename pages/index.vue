<template>
  <div>
    <navbar />
    <Hero
      :title="turnausHero.title"
      :subtitle="turnausHero.subtitle"
      :image="turnausHero.image"
      :promoLink="turnausHero.product && turnausHero.product.productLink"
      id="hero"
    />

    <section class="section" id="afps-finland">
      <div class="header container">
        AFPS?
      </div>
      <div class="rows container">
        <div class="row is-half">
          <p class="disco-subtitle">FPS?</p>    
          <p class="justified-text">Luultavasti tiedätkin jo FPS (First person shooter)-peleistä, mikäli olet sivuille päätynyt. Tästä huolimatta pieni katsaus FPS/AFPS -maailmaan lienee paikallaan. Jotta voisimme ymmärtää Arena shootereita, meidän on ensin aloitettava FPS-peleistä yleisesti. FPS-pelit ovat klassinen peligenre, jossa pelin kulku on kuvattu hahmon silmistä käsin eli ensimmäisestä persoonasta. Peleissä kontrolloidaan liikkumista näppäimistöllä ja ympäriinsä katsellaan hiirtä käyttäen. Genre alkoi id Softwaren vuonna 1992 julkaiseman <b>Wolfenstein 3D</b>:n siivittämänä. FPS genre on pysynyt suosittuna jo lähes 30 vuotta ja mukaan mahtuu muitakin klassikoita kuten <b>Doom</b>, <b>Half-Life</b> ja massiivisen suosittu <b>Call of Duty</b> -sarja.</p>
          <hr />
          <div class="columns">
            <div class="column is-half">
              <p class="disco-subtitle">Arena FPS?</p>
              <p class="justified-text">Arena FPS pelit ovat FPS-pelien yksi vanhimpia 'alalajeja'. Kuten nimestä voi päätellä, Arena shooterit laittavat pelaajat toisiaan vastaan erilaisille 'areenoille' deathmatchiin ja tyypillisesti kartalta löytyy aseita, ammuksia, armoreita ja poweruppeja ripoteltuna ennalta määritetyistä paikoista. Arena FPS:t keskittyvät pääsääntöisesti moninpeliin ja yksinpelimoodit koostuvat pääasiassa boteista, joita vastaan pelaaja voi harjoitella kuin hän pelaisi oikeita ihmisiä vastaan.
              Pelien asearsenaalit sisältävät perinteisesti ainakin jossain muodossa Rocket launcherin, Railgunin sekä Lightning gunin jotka ovatkin luultavasti pelien käytetyimpiä aseita. Edellä mainittujen lisäksi joukosta löytyy usein Shotgun, Grenade Launcher ja Plasma gun.</p>
              <br/>
              <p>Loppuun vielä esimerkkejä suosituista AFPS-peleistä:</p>
              <div class="game-list">
                <ul>
                  <li>
                    <img class="game-icon" src="https://nicotukiainen.com/legacy/images/icons/quake-icon.png"><b>Quake</b>, <b>Quake 2</b>, <b>Quake 3: Arena</b>, <b>Quake 4</b>, <b>Quake Live</b>, <b>Quake Champions</b>
                  </li>
                  <li>
                    <img class="game-icon" src="https://nicotukiainen.com/legacy/images/icons/ut-icon.png"><b>Unreal Tournament (99)</b>, <b>Unreal Tournament 2004</b> ja <b>Unreal Tournament 3</b>
                  </li>
                  <li>
                    <img class="game-icon" src="https://nicotukiainen.com/legacy/images/icons/doom-icon.png"><b>Doom</b>, <b>Doom 2</b>
                  </li>
                  <li>
                    <img class="game-icon" src="https://pbs.twimg.com/profile_images/1231999603588947974/sZOe6DPF_400x400.png"><b>Diabotical</b>
                  </li>
                </ul>
              </div>
            </div>
            <div class="column is-half">
              <p style="padding-top: 2.8rem;">Alta löytyy pätevä kuvaus AFPS-peleistä videomuodossa englanniksi:</p>
              <div class="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/owpHC4Pg550" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <hr class="hr2"/>
        <div class="row is-half">              
          <p class="disco-subtitle">AFPS Finland?</p>
          <p class="justified-text">AFPS-pelit ovat pahamaineisen tunnettuja siitä, että niissä on erittäin korkea taitokatto. Tämä tarkoittaa sitä, että usein uudet pelaajat jäävät helposti 20 vuotta Quakea pelanneiden jalkoihin eikä peli tunnu enää niin hauskalta.
          Mikäli näin kuitenkin käy, sen sijaan että löisit heti hanskat tiskiin, kannattaa liittyä AFPS Finlandin Discord-kanavalle (<a href="https://discord.gg/jMehYtZ"><img class="game-icon" src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png"/><b>https://discord.gg/jMehYtZ</b></a>)
          ja/tai katsastaa sivujen <a href="#oppaat" v-smooth-scroll="{ duration: 1000 }"><b>OPPAAT</b></a> -osio, jonne päivitellään uutta sisältöä säännöllisen epäsäännöllisesti. AFPS Finland järjestää myös pienimuotoisia Arena shooter-turnauksia sekä LANeja. 
          Discordissa veteraanit kohtaavat uudemmat pelaajat ja omaan peliin voi löytyä myös tarvittavia vinkkejä. Kanavalle saa myös tulla idlaamaan tai höpöttelemään niitä näitä. 
          Tervetuloa!</p> 
        </div>
      </div>        
    </section> 

    <section class="section" id="oppaat">
      <div class="header container">
        OPPAAT JA PELISUOSITUKSET
      </div>
      <div class="container" style="background-color:rgba(205, 210, 214, 0.9)">
        <div class="columns is-mobile">
          <!-- posts -->
          <div class="column is-8">
            <!-- opas -->           
            <div 
              v-for="opas in publishedOppaat" 
              :key="opas._id"
              class="section"
            >
              <div @click="$router.push(`/oppaat/${opas.slug}`)" class="post clickable">
                <div class="post-header">
                  <h4 class="title is-4">{{opas.title}}</h4>
                  <h5 class="subtitle is-5">{{opas.subtitle | shortenText(183)}}</h5>
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
              <client-only placeholder="Lataa...">
                <paginate
                  v-model="currentPage"
                  :page-count="pagination.pageCount"
                  :click-handler="fetchOppaat"
                  :prev-text="'Edellinen'"
                  :next-text="'Seuraava'"
                  :container-class="'paginationContainer'">
                </paginate>
              </client-only>
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
                  <h4 class="title"
                    v-for="fOpas in featuredOppaat"
                    :key="fOpas._id">
                    <nuxt-link :to="`/oppaat/${fOpas.slug}`" style="font-size:22px">
                      {{fOpas.title}}
                      <h5 class="subtitle is-5"
                        :key="fOpas._id"  style="font-size:18px">{{fOpas.subtitle | shortenText(98)}}
                      </h5>
                    </nuxt-link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <!-- end of side bar -->
        </div>
      </div>        
    </section>

    <section class="section" id="turnaukset">
      <div class="header container">
        TURNAUKSET
      </div>
      <div class="rows container">
        <div class="row is-half">
          <!-- <figure class="avatar not-news">
            <img src="https://media.gettyimages.com/vectors/golden-trophy-cup-hand-drawn-vector-id689974954">
          </figure> -->
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
              <div>
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
        <hr class="hr2" />
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
      <div class="columns container disco-osio">
        <div class="column is-half">
          <figure class="avatar not-news">
            <img src="https://cdn0.iconfinder.com/data/icons/free-social-media-set/24/discord-512.png">
          </figure>
            <p class="disco-subtitle">Liity AFPS Finlandin Discord kanavalle!</p>
            <hr class="hr2"/>
            <p class="justified-text">Discord on videopeliyhteisöille suunniteltu VoIP-sovellus. Se toimii Windowsilla, OS X:llä, Androidilla, iOS:llä, Linuxilla ja selaimessa. 
              Toukokuussa 2019 sovelluksella oli yli 250 miljoonaa rekisteröityä käyttäjää. 
              AFPS Finlandin Discord-kanava perustettiin vuonna 2018 ja yhteisön tarkoituksena on ollut alusta saakka tuoda suomalaisia arenaräiskintöjen ystäviä yhteen. 
              Yhteisö järjestää erinäisiä turnajaisia, mittelöitä sekä LAN-tapahtumia sillä yhdessä pelaaminen on hauskempaa. 
              Tervetuloa mukaan vaikka aikaisempaa AFPS-kokemusta ei vielä löytyisikään!</p>
            <br/>
            <p>Liity tästä: <a href="https://discord.gg/jMehYtZ">https://discord.gg/jMehYtZ</a></p>
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
            style="border:2px solid black;border-radius: 5px 225px 1px 225px/225px 4px 225px 8px;"
          ></iframe>
        </div>
      </div> 
    </section>

    <section class="section" id="leaderboards">
      <div class="header container">
        Leaderboards
      </div>
      <div class="rows">
        <div class="columns container">
          <div class="column is-half">
            <div style="width:100%;">
              <p class="disco-subtitle">Suomalaiset Diaboticalin TOP500 listoilla</p>
            </div>
            <div class="rows container modes">
              <Duel/>
            </div>
            <div class="container modes">
              <ThreeVsThree/>          
            </div>
            <div class="container modes">
              <Wipeout/>
            </div>
            <div class="container modes">
              <ShaftArena/>
            </div>
          </div>
          <div class="column is-half">
            <div style="width:100%;">
            </div>
            <div class="container modes">
              <MacGuffin/>
            </div>
            <div class="rows container modes">
              <TwoAim/>
            </div>
            <div class="container modes">
              <RocketArena/>
            </div>
            <div class="container modes">
              <SoloAim/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="footer">
      <div class="columns centeroitu">
        <div class="column is-one-quarter">
          <p class="disco-subtitle">Linkkejä</p>
          <a target="_blank" href="https://quakeworld.fi/"><b>quakeworld.fi</b></a>
          <br>
          <a target="_blank" href="https://www.diabotical.com/"><b>diabotical.com</b></a>
          <br>
          <a target="_blank" href="https://quake.bethesda.net/"><b>quake.bethesda.net</b></a>
        </div>
        <div class="column is-half">
          <div class="rows">
            <div class="row is-half">      
              <a href="#hero" v-smooth-scroll="{ duration: 1600 }">
                <img src="https://nicotukiainen.com/legacy/images/afps-logo.png">
              </a>
            </div>
            <div class="row is-half"> 
              <span class="is-icon"><i class="fa fa-copyright"/></span> <a target="_blank" href="https://www.nicotukiainen.com">Nico "sc4ndroid" Tukiainen 2020</a>
               </div>
          </div>
        </div>
        <div class="column is-one-quarter iconic">
          <a href="#hero" v-smooth-scroll="{ duration: 1600 }">
            <i class="fa fa-arrow-up fa-lg"/>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '~/components/shared/Navbar'
import TurnausCard from '~/components/TurnausCard'
import TurnausCardTooltip from '~/components/TurnausCardTooltip'
import OpasCard from '~/components/OpasCard'
import Hero from '~/components/shared/Hero'
import Duel from '~/components/leaderboards/Duel'
import ThreeVsThree from '~/components/leaderboards/ThreeVsThree'
import MacGuffin from '~/components/leaderboards/MacGuffin'
import Wipeout from '~/components/leaderboards/Wipeout'
import TwoAim from '~/components/leaderboards/TwoAim'
import SoloAim from '~/components/leaderboards/SoloAim'
import RocketArena from '~/components/leaderboards/RocketArena'
import ShaftArena from '~/components/leaderboards/ShaftArena'
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
      isActive: false,
    }
  },
  components: {
    Navbar, TurnausCard, OpasCard, Hero, TurnausCardTooltip, vueSmoothScroll, Duel, ThreeVsThree, MacGuffin, Wipeout, TwoAim, SoloAim, RocketArena, ShaftArena
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
      this.$store.dispatch('opas/fetchOppaat', filter)
        .then(_ => this.setQueryPaginationParams())
    },
  }
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');
@import '~/assets/scss/index.scss';
</style>
