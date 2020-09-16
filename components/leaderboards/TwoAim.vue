<template>
  <div class="gamemode-container">
    <p class="disco-subtitle">2v2 Aim Arena</p>
    <hr class="hr2"/>
    <div class="columns tulos">
      <div class="column is-one-fifth"><p class="disco-subtitle">Nimi</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Rank</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Rating</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Voitetut matsit</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Pelatut matsit</p></div>
    </div>
    <div :key="result.user_id" v-for="result in results">
      <div class="columns" v-if="result.country === 'fi'">
        <div class="column is-one-fifth tulos">
          <p>{{ result.name }}</p>
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
    };
  },
  mounted() {
    const ApiUrl="https://www.diabotical.com/api/v0/stats/leaderboard?mode=r_ca_2";

    const getData = async function(offset = 0) {
      let actualUrl = ApiUrl+`&offset=${offset}`;
      let ApiResults = await fetch(actualUrl)
      .then(Response => {
        return Response.json()
      });

      return ApiResults;
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
    })();
    // return this.$axios.$get(ApiUrl)
    // .then(response => {this.results = response.leaderboard})
  }
}
console.log
</script>

<style scoped lang="scss">
  @import '~/assets/scss/index.scss';

  .gamemode-container {
    margin-bottom: 4rem;
  }

  .rank-icon {
    height: 36px;
    width: 36px;
    vertical-align: middle;
  }

  .tulos {
    text-align: center;
  }
</style>