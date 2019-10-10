<template>
  <div class="grid">
    <div class="grid game-grid">
      <board-header
        @new="createNewGame()"
        :currentTile="game.currentTile"
        :targetTile="game.targetTile"
        :scores="game.score"
      ></board-header>
      <div class="board">
        <div class="board-row" v-for="(row, rIndex) in board" :key="rIndex+'row'">
          <board-cell v-for="(item, indexCell) in row" :key="indexCell+'cell'"></board-cell>
          <board-tile
            :pastPosition="pastTiles[rIndex][cIndex].position"
            :position="{row: rIndex, col:cIndex}"
            :tile="item"
            v-for="(item, cIndex) in row"
            :key="cIndex+'col'"
          ></board-tile>
        </div>
      </div>
      <p class="text-container-x">HOW TO PLAY: Use your arrow keys to move the tiles.</p>
    </div>
    <confirm-popup
      :message="confirm.message"
      :button="confirm.button"
      :isShow="isOverlay"
      @save="saveConfirm"
      @close="closeDialog"
    ></confirm-popup>
  </div>
</template>

<script>
import BoardHeader from "./board-header.vue";
import BoardCell from "./board-cell.vue";
import BoardTile from "./board-tile.vue";
import ConfirmPopup from "./confirm-popup.vue";

import { Board, options } from "../board";

export default {
  name: "Board",
  components: {
    BoardHeader,
    BoardCell,
    BoardTile,
    ConfirmPopup
  },

  computed: {
    pastTiles() {
      return this.pastBoard.map((arr, rowIndex) => {
        return arr.map((item, colIndex) => {
          if (this.board[rowIndex][colIndex] == item) {
          }

          return {
            value: item,
            position: {
              row: rowIndex,
              col: colIndex
            }
          };
        });
      });
    }
  },

  data() {
    return {
      isOverlay: false,
      game: null,
      board: [],
      pastBoard: [],
      confirm: {
        type: "win", // or end
        message: null,
        button: {
          yes: "Yes",
          no: "No"
        }
      }
    };
  },

  methods: {
    createNewGame() {
      this.game = new Board(options);
      this.game.init();
      this.board = this.game.grid;
      this.pastBoard = this.game.pastGrid;
    },
    captureKey(e) {
      this.game.keyPressed(e);
      this.pastBoard = Object.assign([], this.game.pastGrid);
      this.board = Object.assign([], this.game.grid);

      this.controllerTarget();
      this.controllerGameover();
    },
    controllerTarget() {
      if (this.game.currentTile >= this.game.targetTile) {
        this.isOverlay = true;
        this.game.setPlay(false);
        this.confirm.type = "win";
        this.confirm.message = `Congratulations! Your new goal is ${this.game
          .targetTile * 2} tile! Do you want to continue?`;
        this.confirm.button = {
          yes: "Yes",
          no: "No"
        };
      }
    },
    controllerGameover() {
      if (this.game.isGameOver) {
        this.isOverlay = true;
        this.game.setPlay(false);
        this.confirm.type = "end";
        this.confirm.message = "Game over!";
        this.confirm.button = {
          yes: "Try again",
          no: "Cancel"
        };
      }
    },
    saveConfirm() {
      this.isOverlay = false;
      if (this.confirm.type == "win") {
        this.game.setTargetTile(this.game.targetTile * 2);
        this.game.setPlay(true);
      }
      if (this.confirm.type == "end") {
        this.createNewGame();
      }
    },
    closeDialog() {
      this.isOverlay = false;
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
  grid-row-gap: 2rem;
  width: 100%;
  max-width: var(--container);
  h1 {
    text-align: left;
    max-width: max-content;
  }
}

.board {
  width: 100%;
  height: max-content;
  padding: 5px;
  background-color: #baa;
  border-radius: 7px;
  outline: none;
  position: relative;
}

.text-container-x {
  max-width: 440px;
  text-align: center;
  background: var(--gray-1);
  border-radius: 1rem;
  padding: 1rem;
  color: var(--gray-3);
}
</style>
