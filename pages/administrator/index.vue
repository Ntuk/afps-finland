<template>
  <div class="administrator-page">
    <administrator-header 
      title="Valitse adminoitava alue"
      exitLink="/"
    />
    <div class="centered">
      <div class="columns">
        <!-- Go to /administrator/projects -->
        <!-- <div class="box" @click="$router.push('/administrator/projects')">
          <div>
            TODO:Lisää jotain
          </div>
        </div> -->
        <!-- Go to /administrator/uutiset -->
        <div class="box" @click="$router.push('/administrator/uutiset')">
          <div>
            Uutiset
          </div>
        </div>
        <!-- Go to /administrator/heroes -->
        <!-- <div class="box" @click="$router.push('/administrator/heroes')">
          <div>
            Etusivun teksti
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import AdministratorHeader from '~/components/shared/Header'
export default {
  layout: 'administrator',
  components: {
    AdministratorHeader
  },
  computed: {
    contacts() {
      return this.$store.state.contact.items
    }
  },
  async fetch({store}) {
    await store.dispatch('contact/fetchContacts')
      .then(console.log('great success! ', store.state.contact))
  }
}
</script>
<style scoped lang="scss">
  .administrator-page {
    .centered {
      margin-top: 100px;
      display: flex;
      flex-direction: row;     /* make main axis horizontal (default setting) */
      justify-content: center; /* center items horizontally, in this case */
      align-items: center;     /* center items vertically, in this case */
    }
  }
  .box {
    height: 300px;
    width: 300px;
    display: flex;
    margin: 5px;
    justify-content: center;
    &:hover {
      cursor: pointer;
      background-color: #58529f;
      color: white;
      transition: background-color 0.3s ease-out;
    }
    > div {
      align-self: center;
      font-size: 50px;
      font-weight: bold;
    }
  }
  .title {
    align-self: center;
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    font-size: 50px;
    color: #4a4a4a;
  }
  .table {
    margin: 20px;
    border-radius: 6px;
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }
</style>