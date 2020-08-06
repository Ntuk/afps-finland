<template>
  <div>
    <Hero
      :title="projectHero.title"
      :subtitle="projectHero.subtitle"
      :image="projectHero.image"
      :promoLink="projectHero.product && projectHero.product.productLink"
    />

    <section class="section" id="oppaat">
      <div class="header container">        
        OPPAAT
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
                  <h4 class="title is-4">Tärkeät oppaat</h4>
                </div>
                <div class="sidebar-list">
                  <!-- Tärkeät Oppaat -->
                  <p
                    v-for="fOpas in featuredOppaat"
                    :key="fOpas._id">
                    <nuxt-link :to="`/oppaat/${fOpas.slug}`">
                      {{fOpas.title}}
                    </nuxt-link>
                  </p>
                  <!-- Tärkeät Oppaat -->
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
        AFPS FINLAND?
      </div>
      <div class="container">
        <figure class="avatar not-news">
          <img src="https://www.nicotukiainen.com/legacy/images/afps-finland-icon.jpg">
        </figure>
        <p><b>AFPS Finland on.... </b>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        <hr/>
        <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
        <hr/>
        <p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
        <hr/>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
      </div>        
    </section> 

    <section class="section" id="turnaukset">
      <div class="header container">
        TURNAUKSET
      </div>
      <div class="container">
        <figure class="avatar not-news">
          <img src="https://media.gettyimages.com/vectors/golden-trophy-cup-hand-drawn-vector-id689974954">
        </figure>
        <p><b>Tähän jotain infoa menneistä ja tulevista turnauksista? Ehkä myös mahdollisuus lisätä ja muokata admin-osion kautta? </b>...."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        <hr/>
        <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
        <hr/>
        <p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
        <hr/>
        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
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
            <p><b>Tähän ehkä hieman tietoa / historiaa kanavasta?</b> ...."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
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
          <p>Liity tästä: <a href="https://discord.gg/jMehYtZ">https://discord.gg/jMehYtZ</a></p>
        </div>
      </div> 
    </section>

    <section class="section" id="footer">
      <span class="is-icon"><i class="fa fa-copyright"/></span> <a target="_blank" href="https://www.nicotukiainen.com">Nico "sc4ndroid" Tukiainen 2020</a>
    </section>
  </div>
</template>

<script>
import ProjectCard from '~/components/ProjectCard'
import ProjectCardTooltip from '~/components/ProjectCardTooltip'
import OpasCard from '~/components/OpasCard'
import Hero from '~/components/shared/Hero'
import vueSmoothScroll from 'vue2-smooth-scroll'
import Vue from 'vue'
import { mapState } from 'vuex'
Vue.use(vueSmoothScroll)
export default {
  head: {
    title: 'AFPS Finland'
  },
  components: {
    ProjectCard, OpasCard, Hero, ProjectCardTooltip, vueSmoothScroll
  },
  computed: {
    ...mapState({
      publishedOppaat: state => state.opas.items.all,
      featuredOppaat: state => state.opas.items.featured,    
      pagination: state => state.opas.pagination,
      projects: state => state.project.items,
      projectHero: state => state.hero.item || {}
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
    await store.dispatch('project/fetchProjects')
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
    }
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
    font-family: 'East Sea Dokdo', cursive;
    color: #87dbfc;
    text-shadow:
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
    padding: 2rem;
    border: 0 !important;
    background-color: transparent !important;
  }
  .disco-subtitle {
    font-size: 30px;
    font-family: 'East Sea Dokdo', cursive;
    color: #87dbfc;
    margin: 0;
    text-shadow:
		-1px -1px 0 #000,
		1px -1px 0 #000,
		-1px 1px 0 #000,
		1px 1px 0 #000;
    border: 0 !important;
    background-color: transparent !important;
  }
  #widgetti {
    height: 500px;
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
  .section {
    padding-bottom: 100px;
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
    background-color: rgb(247, 247, 247);
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
  }
  #turnaukset {
    background-color: rgb(210, 210, 211);
  }
  #discord {
    background-color: rgb(165, 165, 206);
  }
  #footer {
    background-color: rgb(89, 89, 117);
    padding: 30px 0;
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
/* section */
.section {
    padding: 4rem 0 2rem 0;
}
.section-header {
    padding-bottom: 3rem;
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
