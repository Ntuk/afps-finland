<template>
  <div>
    <Header
      title="Manageroi uutisia"
      exitLink="/"
    />
    <div class="administrator-blogs">
      <div class="container">
        <div class="section">
          <div class="header-block">
            <h2>Uutiset</h2>
            <div class="title-menu">
              <button @click="$router.push('/administrator/blog/editor')" class="button">Kirjoita uutinen!</button>
            </div>
          </div>
          <div class="tabs">
            <ul>
              <!-- set here active tab -->
              <li @click="activeTab = 0">
                <a :class="{'is-active': activeTab === 0}">Luonnokset</a>
              </li>
              <!-- set here active tab -->
              <li @click="activeTab = 1">
                <a :class="{'is-active': activeTab === 1}">Julkaistut</a>
              </li>
            </ul>
          </div>
          <div class="blogs-container">
            <!-- Draft Blogs -->
            <!-- check for active tab -->
            <template v-if="activeTab === 0">
              <div v-if="drafts && drafts.length > 0">
                <!-- make iteration here for drafts -->
                <div
                  v-for="dBlog in drafts"
                  :key="dBlog._id"
                  class="blog-card"
                  >
                  <h2>{{displayBlogTitle(dBlog)}}</h2>
                  <div class="blog-card-footer">
                    <span>
                      Last Edited {{dBlog.updatedAt | formatDate('LLLL')}}
                    </span>
                    <dropdown
                      @optionChanged="handleOption($event, dBlog)"
                      :items="draftsOptions" />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts blogs  -->
              <div v-else class="blog-error">
                Ei luonnoksia :(
              </div>
            </template>
            <!-- Published Blogs -->
            <!-- check for active tab -->
            <template v-if="activeTab === 1">
              <div v-if="published && published.length > 0">
                <!-- make iteration here for published -->
                <div
                  v-for="pBlog in published"
                  :key="pBlog._id"
                  :class="{featured: pBlog.featured}"
                  class="blog-card">
                  <!-- title -->
                  <h2>{{displayBlogTitle(pBlog)}}</h2>
                  <div class="blog-card-footer">
                    <!-- updatedAt -->
                    <span>
                      Last Edited {{pBlog.updatedAt | formatDate('LLLL')}}
                    </span>
                    <dropdown
                      @optionChanged="handleOption($event, pBlog)"
                      :items="publishedOptions(pBlog.featured)" />
                  </div>
                </div>
              </div>
              <!-- In case of no drafts blogs  -->
              <div v-else class="blog-error">
                Ei julkaistuja uutisia :(
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/shared/Header'
import Dropdown from '~/components/shared/Dropdown'
import { mapState } from 'vuex'
import { createPublishedOptions,
         createDraftsOptions,
         commands } from '~/pages/administrator/options'

export default {
  layout: 'administrator',
  components: {Header, Dropdown},
  data() {
    return {
      activeTab: 0
    }
  },
  computed: {
    ...mapState({
      published: ({administrator}) => administrator.blog.items.published,
      drafts: ({administrator}) => administrator.blog.items.drafts
    }),
    draftsOptions() {
      return createDraftsOptions()
    }
  },
  async fetch({store}) {
    await store.dispatch('administrator/blog/fetchUserBlogs')
  },
  methods: {
    handleOption(command, blog) {
      if (command === commands.EDIT_BLOG) {
        this.$router.push(`/administrator/blog/${blog._id}/edit`)
      }
      if (command === commands.DELETE_BLOG) {
        this.displayDeleteWarning(blog)
      }
      if (command === commands.TOGGLE_FEATURE) {
        this.updateBlog(blog)
      }
    },
    updateBlog(blog) {
      const featured = !blog.featured
      const featureStatus = featured ? 'Featured' : 'Un-Featured'

      this.$store.dispatch('administrator/blog/updatePublishedBlog', {id: blog._id, data: {featured}})
        .then(_ => this.$toasted.success(`Blog has been ${featureStatus}!`, {duration: 2000}))
    },
    publishedOptions(isFeatured) {
      return createPublishedOptions(isFeatured)
    },
    displayDeleteWarning(blog) {
     const isConfirm = confirm('Are you sure you want to delete this blog?')
     if (isConfirm) {
      this.$store.dispatch('administrator/blog/deleteBlog', blog)
        .then(_ => this.$toasted.success('Blog was succesfuly deleted!', {duration: 2000}))
      }
    },
    displayBlogTitle(blog) {
      return blog.title || blog.subtitle || 'Blog without title & subtitle :('
    }
  }
}
</script>

<style scoped lang="scss">
  .is-active {
    border-bottom-color: #363636;
    color: #363636;
  }

  .blog-error {
    font-size: 35px;
  }
  .blog-card {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    > h2 {
      font-size: 30px;
      font-weight: bold;
    }
    &-footer {
      color: rgba(0, 0, 0, 0.54);
    }
    &.featured {
      border-left: 8px solid #3cc314;
      padding-left: 10px;
      transition: border ease-out 0.2s;
      padding-left: 10px;
      transition: border ease-out 0.2s;
    }
  }
  .header-block {
    display: flex;
    flex-direction: row;
    align-items: center;
    > h2 {
      font-size: 40px;
      font-weight: bold;
    }
    .title-menu {
      margin-left: auto;
    }
  }
</style>