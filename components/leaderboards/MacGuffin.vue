<template>
  <div class="gamemode-container">
    <p class="lb-name-subtitle">MacGuffin</p>
    <hr class="hr2"/>
    <div class="columns tulos">
      <div class="column is-one-fifth"><p class="lb-subtitle">Nimi</p></div>
      <div class="column is-one-fifth"><p class="lb-subtitle">Rank</p></div>
      <div class="column is-one-fifth"><p class="lb-subtitle">Rating</p></div>
      <div class="column is-one-fifth"><p class="lb-subtitle">Voitetut</p></div>
      <div class="column is-one-fifth"><p class="lb-subtitle">Pelatut</p></div>
    </div>
    <div v-if="loading" style="display:flex;justify-content:center;">
      <p class="disco-subtitle">Ladataan...</p>
      <img class="game-icon rolling" src="https://pbs.twimg.com/profile_images/1231999603588947974/sZOe6DPF_400x400.png">
    </div>
    <div :key="result.user_id" v-for="result in results">
      <div class="columns" v-if="result.country === 'fi'">
        <div class="column is-one-fifth tulos">
          <p style="color:darkslategray;font-weight:bold;">{{ result.name }}</p>
        </div>
        <div class="column is-one-fifth tulos">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_01.png" v-if="result.rank_tier === 26">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_02.png" v-if="result.rank_tier === 27">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_03.png" v-if="result.rank_tier === 28">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_04.png" v-if="result.rank_tier === 29">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_05.png" v-if="result.rank_tier === 30">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_01.png" v-if="result.rank_tier === 31">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_02.png" v-if="result.rank_tier === 32">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_03.png" v-if="result.rank_tier === 33">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_04.png" v-if="result.rank_tier === 34">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_05.png" v-if="result.rank_tier === 35">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_01.png" v-if="result.rank_tier === 36">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_02.png" v-if="result.rank_tier === 37">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_03.png" v-if="result.rank_tier === 38">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_04.png" v-if="result.rank_tier === 39">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_05.png" v-if="result.rank_tier === 40">
        </div>
        <div class="column is-one-fifth tulos">
          <p>{{ result.rating }}</p>
        </div>
        <div class="column is-one-fifth tulos">
          <p>{{ result.match_wins }}</p>
        </div>
        <div class="column is-one-fifth tulos">
          <p style="color:darkslategray;font-weight:bold;">{{ result.match_count }}</p>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
export default {
  data() {
    return {
      results: [],
      loading: true
    };
  },
  mounted() {
    const ApiUrl="https://www.diabotical.com/api/v0/stats/leaderboard?mode=r_macguffin";

    const getData = async function(offset = 0) {
      let actualUrl = ApiUrl+`&offset=${offset}`;
      let Apiresults = await fetch(actualUrl)
      .then(Response => {
        return Response.json()
      });

      return Apiresults;
    }

    const getEntireData = async function(offset = 0) {
      const results = await getData(offset);
      if (results.leaderboard.length > 0 && offset < 490) {
        return results.leaderboard.concat(await getEntireData(offset+20));
      } else {
        return results;
      }
    };

    (async ()=> {
      const entireList = await getEntireData();
      this.results = entireList;
      this.loading = false;
    })();
    // return this.$axios.$get(ApiUrl)
    // .then(response => {this.results = response.leaderboard})
  }
}
console.log
</script>

<style scoped lang="scss">
  @import '~/assets/scss/index.scss';

  .lb-name-subtitle {
    text-align: center;
    font-size: 30px;
    font-family: 'Gochi Hand', cursive;
    color: #87dbfc;
    margin: 0;
    text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
  }

  .lb-subtitle {
    font-size: 24px;
    font-family: 'Gochi Hand', cursive;
    color: #87dbfc;
    margin: 0;
    text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
  }

  .rank-icon {
    height: 36px;
    width: 36px;
    vertical-align: middle;
  }

  .tulos {
    text-align: center;
  }

  .rolling {
    height: 36px;
    width: 36px;
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
  }
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>