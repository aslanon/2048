<template>
  <div class="header grid grid-row gap-l">
    <div class="header-score ai-fe">
      <h1>{{title}}</h1>
      <span class="game-score grid grid-col c2">
        <span class="left">
          <h5>score</h5>
          <p>{{scores.current}}</p>
        </span>
        <span>
          <h5>best</h5>
          <p>{{scores.best}}</p>
        </span>
      </span>
    </div>
    <div class="header-intro">
      <p v-if="targetTile <= 2048">Join the numbers and get to the {{targetTile}} tile!</p>
      <p v-if="targetTile == 4096">You next goal is to get to the {{targetTile * 2}} tile!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardHeader",
  props: {
    title: String,
    scores: Object,
    targetTile: {
      type: Number,
      default: 0
    },
    currentTile: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  .header-score {
    display: grid;
    grid-template-columns: auto auto;

    .game-score {
      background: var(--gray-1);
      border-radius: 1rem;
      padding: 0.8rem 0rem;
      .left {
        border-right: 1px solid var(--gray-2);
      }
    }
    p {
      font-weight: 600;
      font-size: 1.5rem;
    }
    h5 {
      text-transform: uppercase;
      font-weight: 700;
    }
    h1 {
      font-size: 72px;
      color: var(--color-1);
      text-align: left;
    }
  }
  .header-intro {
    p {
      text-align: left;
      font-weight: 700;
    }
  }
}
</style>