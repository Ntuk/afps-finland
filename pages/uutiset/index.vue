<template>
  <div>
    <section class="section">
    <div class="main-content">
      <div class="container">
        <div class="columns is-mobile">
          <!-- posts -->
          <div class="column is-8">
            <!-- uutinen -->           
            <div 
              v-for="uutinen in publishedUutiset" 
              :key="uutinen._id"
              class="section"
            >
              <div class="post">
                <div @click="$router.push(`/uutiset/${uutinen.slug}`)" class="post-header clickable">
                  <h4 class="title is-4">{{uutinen.title}}</h4>
                  <h5 class="subtitle is-5">{{uutinen.subtitle}}</h5>
                </div>
                <div class="post-content">                   
                  <figure class="avatar">
                    <img :src="uutinen.author.avatar" class="avatar"/>
                  </figure> {{uutinen.author.name}}, {{uutinen.createdAt | formatDate('LLL')}}
                </div>
              </div>
            </div>
            <!-- end of uutinen -->
            <!-- pagination -->
            <div v-if="pagination.pageCount && pagination.pageCount > 1" class="section">
              <no-ssr placeholder="Loading...">
                <paginate
                  v-model="currentPage"
                  :page-count="pagination.pageCount"
                  :click-handler="fetchUutiset"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'paginationContainer'">
                </paginate>
              </no-ssr>
            </div>
            <!-- end of pagination -->
          </div>
          <!-- side bar -->
          <div class="column is-4 is-narrow">
            <!-- featured -->
            <div class="section featured-check">
              <div class="sidebar">
                <div class="sidebar-header">
                  <h4 class="title is-4">Tärkeät uutiset</h4>
                </div>
                <div class="sidebar-list">
                  <!-- Tärkeät Uutiset -->
                  <p
                    v-for="fUutinen in featuredUutiset"
                    :key="fUutinen._id">
                    <nuxt-link :to="`/uutiset/${fUutinen.slug}`">
                      {{fUutinen.title}}
                    </nuxt-link>
                  </p>
                  <!-- Tärkeät Uutiset -->
                </div>
              </div>
            </div>
          </div>
          <!-- end of side bar -->
        </div>
      </div>
    </div>
    </section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  head: {
    title: 'AFPS Finland'
  },
  computed: {
    ...mapState({
      publishedUutiset: state => state.uutinen.items.all,
      featuredUutiset: state => state.uutinen.items.featured,    
      pagination: state => state.uutinen.pagination
    }),
    currentPage: {
      get() {
        return this.$store.state.uutinen.pagination.pageNum
      },
      set(value) {
        this.$store.commit('uutinen/setPage', value)
      }
    }
  },
  async fetch({store, query}) {
    // Try to get values from query
    const filter = {}
    const {pageNum, pageSize} = query
    if (pageNum && pageSize) {
      filter.pageNum =  parseInt(pageNum, 10)
      filter.pageSize = parseInt(pageSize, 10)
      store.commit('uutinen/setPage', filter.pageNum)
    } else {
      // TODO: Maybe getters ?
      filter.pageNum = store.state.uutinen.pagination.pageNum
      filter.pageSize = store.state.uutinen.pagination.pageSize
    }
    await store.dispatch('uutinen/fetchUutiset', filter)
    await store.dispatch('uutinen/fetchFeaturedUutiset', {'filter[featured]': true})
  },
  methods: {
    setQueryPaginationParams() {
      const { pageSize, pageNum } = this.pagination
      this.$router.push({query: {pageNum, pageSize}})
    },
    fetchUutiset() {
      const filter = {}
      filter.pageSize = this.pagination.pageSize
      filter.pageNum = this.pagination.pageNum
      // Here store the query params!
      this.$store.dispatch('uutinen/fetchUutiset', filter)
        .then(_ => this.setQueryPaginationParams())
    }
  }
}
</script>
<style scoped>
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
  .section {
    margin-bottom: 100px;
  }
/* .post, .sidebar {
  background: rgba(236, 240, 241, 0.7); ;
} */
.avatar img {
  height: 32px;
  width: 32px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  margin-right: 8px;
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
    padding: 0 0 2rem 0;
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
    border-color: #d35400;
    padding-bottom: 1rem;
    border-bottom: 4px solid #d35400;
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
    border-color: #d35400;
    padding-left: 1rem;
    border-left: 4px solid #d35400;
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
</style>