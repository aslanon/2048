<template>
  <div class="header grid grid-row gap-l">
    <div class="header-score ai-fe">
      <h1>2048</h1>
      <span class="game-score grid grid-col c2">
        <span class="left">
          <h5>score</h5>
          <p>
            {{scores.current}}
            <i v-if="isEffect" class="copied">+{{scores.added}}</i>
          </p>
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
    <button @click="$emit('new')" class="btn blue">New game</button>
  </div>
</template>

<script>
export default {
  name: "BoardHeader",
  props: {
    scores: Object,
    targetTile: {
      type: Number,
      default: 0
    },
    currentTile: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "scores.current": function(a, b) {
      if (a != b) {
        this.isEffect = true;
        setTimeout(() => {
          this.isEffect = false;
        }, 1000);
      }
    }
  },
  data() {
    return {
      isEffect: false
    };
  }
};
</script>

<style lang="scss" scoped>
.copied {
  color: var(--color-1);
  border-radius: 5px;
  padding: 5px 15px;
  left: 1rem;
  position: absolute;
  animation: copy 1s ease-in-out both;
}
@keyframes copy {
  0% {
    top: -5px;
    opacity: 1;
    transform: scale(1);
  }
  100% {
    top: -80px;
    opacity: 0;
    transform: scale(1.3);
  }
}

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
      position: relative;
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