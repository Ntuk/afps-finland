<template>
  <div class="gamemode-container">
    <p class="disco-subtitle">3v3 Pickup</p>
    <hr class="hr2"/>
    <div class="columns tulos">
      <div class="column is-one-fifth"><p class="disco-subtitle">Nimi</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Rank</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Rating</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Voitetut matsit</p></div>
      <div class="column is-one-fifth"><p class="disco-subtitle">Pelatut matsit</p></div>
    </div>
    <div :key="threeVsThreeResult.user_id" v-for="threeVsThreeResult in threeVsThreeResults">
      <div class="columns" v-if="threeVsThreeResult.country === 'fi'">
        <div class="column is-one-fifth tulos">
          <p>{{ threeVsThreeResult.name }}</p>
        </div>
        <div class="column is-one-fifth tulos">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/05_copper_01.png" v-if="threeVsThreeResult.rank_tier === 21">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/05_copper_02.png" v-if="threeVsThreeResult.rank_tier === 22">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/05_copper_03.png" v-if="threeVsThreeResult.rank_tier === 23">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/05_copper_04.png" v-if="threeVsThreeResult.rank_tier === 24">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/05_copper_05.png" v-if="threeVsThreeResult.rank_tier === 25">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_01.png" v-if="threeVsThreeResult.rank_tier === 26">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_02.png" v-if="threeVsThreeResult.rank_tier === 27">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_03.png" v-if="threeVsThreeResult.rank_tier === 28">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_04.png" v-if="threeVsThreeResult.rank_tier === 29">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/06_silver_05.png" v-if="threeVsThreeResult.rank_tier === 30">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_01.png" v-if="threeVsThreeResult.rank_tier === 31">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_02.png" v-if="threeVsThreeResult.rank_tier === 32">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_03.png" v-if="threeVsThreeResult.rank_tier === 33">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_04.png" v-if="threeVsThreeResult.rank_tier === 34">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/07_gold_05.png" v-if="threeVsThreeResult.rank_tier === 35">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_01.png" v-if="threeVsThreeResult.rank_tier === 36">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_02.png" v-if="threeVsThreeResult.rank_tier === 37">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_03.png" v-if="threeVsThreeResult.rank_tier === 38">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_04.png" v-if="threeVsThreeResult.rank_tier === 39">
          <img class="rank-icon" src="https://www.diabotical.com/images/ranks/200x200/08_crystal_05.png" v-if="threeVsThreeResult.rank_tier === 40">
        </div>
        <div class="column is-one-fifth tulos">
          <p>{{ threeVsThreeResult.rating }}</p>
        </div>
        <div class="column is-one-fifth tulos">
          <p>{{ threeVsThreeResult.match_wins }}</p>
        </div>
        <div class="column is-one-fifth tulos">
          <p style="color:darkslategray;font-weight:bold;">{{ threeVsThreeResult.match_count }}</p>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
export default {
  data() {
    return {
      threeVsThreeResults: [],
    };
  },
  mounted() {
    const theeVsThreeApiUrl="https://www.diabotical.com/api/v0/stats/leaderboard?mode=r_team";

    const getTheeVsThreeData = async function(offset = 0) {
      let actualUrl = theeVsThreeApiUrl+`&offset=${offset}`;
      let theeVsThreeApiResults = await fetch(actualUrl)
      .then(theeVsThreeResponse => {
        return theeVsThreeResponse.json()
      });

      return theeVsThreeApiResults;
    }

    const getEntireTheeVsThreeData = async function(offset = 0) {
      const threeVsThreeResults = await getTheeVsThreeData(offset);
      if (threeVsThreeResults.leaderboard.length > 0 && offset < 490) {
        return threeVsThreeResults.leaderboard.concat(await getEntireTheeVsThreeData(offset+20));
      } else {
        return threeVsThreeResults;
      }
    };

    (async ()=> {
      const entireTheeVsThreeList = await getEntireTheeVsThreeData();
      this.threeVsThreeResults = entireTheeVsThreeList;
    })();
    // return this.$axios.$get(theeVsThreeApiUrl)
    // .then(response => {this.threeVsThreeResults = response.leaderboard})
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