<template>
  <div class="grid">
    <div class="grid game-grid">
      <div class="grid grid-col c-auto-auto gapM ai-center">
        <h1>{{title}}</h1>
        <h2>score</h2>
      </div>
      <div>
        <button @click="createNewGame()" class="btn blue">New game</button>
      </div>
      <div class="board">
        <div class="board-row" v-for="(row, rIndex) in board" :key="rIndex+'row'">
          <tile :value="item" v-for="(item, cIndex) in row" :key="cIndex+'col'"></tile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from "./tile.vue";
import { Board, options } from "../board";
export default {
  name: "Board",

  components: {
    Tile
  },
  data() {
    return {
      game: null,
      title: "2048",
      board: [],
      pastBoard: []
    };
  },

  methods: {
    createNewGame() {
      this.game = new Board(options);
      this.game.grid = this.game.createGrid();
      this.game.pastGrid = this.game.copy(this.game.grid);

      this.game.addNumber();
      this.game.addNumber();
      this.board = this.game.grid;
      this.pastBoard = this.game.pastGrid;
    },
    captureKey(e) {
      this.game.keyPressed(e);
      this.pastBoard = Object.assign([], this.game.pastGrid);
      this.board = Object.assign([], this.game.grid);
    }
  },
  created() {
    this.createNewGame();
  },
  beforeMount() {
    document.addEventListener("keydown", this.captureKey);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.captureKey);
  }
};
</script>

<style scoped lang="scss">
.game-grid {
  grid-template-rows: 1fr;
  grid-row-gap: 1rem;
  width: 100%;
  max-width: 600px;
  h1 {
    text-align: left;
    max-width: max-content;
  }
}

.board {
  order: 1;
  width: 100%;
  height: max-content;
  padding: 5px;
  background-color: #baa;
  border-radius: 7px;
  outline: none;
  position: relative;
}

@keyframes changed {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
</style>
