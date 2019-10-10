import { random, randomFromList } from "./helpers";

function Board(opt) {
  this.row = opt.conf.row;
  this.col = opt.conf.col;
  this.targetTile = opt.game.target;
  this.currentTile = 2;
  this.grid = [];
  this.pastGrid = [];
  this.zeros = [];
  this.emptyPositions = [];
  this.flipped = false;
  this.rotated = false;
  this.isGameOver = false;
  this.isPlayed = true;
  this.score = {
    added: 0,
    current: 0,
    best: localStorage.getItem("best") || 0
  };

  Board.prototype.init = () => {
    this.grid = this.createGrid();
    this.pastGrid = this.copy(this.grid);
    this.addNumber();
    this.addNumber();
  };

  // create list grid
  Board.prototype.createGrid = () => {
    let arr = [];
    if (this.row == this.col) {
      // arr = Array(this.row).fill(Array(this.row).fill({ value: 0 }));
      for (let i = 0; i < this.row; i++) {
        arr.push([]);
        for (let j = 0; j < this.row; j++) {
          arr[i].push({ value: 0 });
        }
      }
      return arr;
    }
  };

  // get empty cell position list
  Board.prototype.getEmptyPosition = () => {
    let arr = [];
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.grid[row][col].value === 0) {
          arr.push({
            x: row,
            y: col
          });
        }
      }
    }
    return arr;
  };

  // state actions
  Board.prototype.setPlay = state => {
    this.isPlayed = state;
  };
  Board.prototype.setGameover = state => {
    this.isGameOver = state;
  };
  Board.prototype.setTargetTile = state => {
    this.targetTile = state;
  };

  // add random number to board
  Board.prototype.addNumber = () => {
    this.emptyPositions = this.getEmptyPosition();
    if (this.emptyPositions.length > 0) {
      let pos = randomFromList(this.emptyPositions);
      let int = random(0, 1);
      this.grid[pos.x][pos.y].value = int > 0 ? 2 : 4;
    } else {
      // game over
      this.setGameover(true);
      this.setBestScore();
    }
  };

  Board.prototype.setBestScore = () => {
    if (!this.score.best) {
      this.score.best = this.score.current;
      localStorage.setItem("best", this.score.best);
    } else if (this.score.current > this.score.best) {
      this.score.best = this.score.current;
      localStorage.setItem("best", this.score.best);
    }
  };

  Board.prototype.copy = grid => {
    let newGrid = this.createGrid();
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        newGrid[row][col] = grid[row][col];
      }
    }
    return newGrid;
  };

  Board.prototype.compare = (a, b) => {
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (a[row][col] !== b[row][col]) {
          return true;
        }
      }
    }
    return false;
  };

  Board.prototype.flipGrid = () => {
    for (let i = 0; i < this.row; i++) {
      this.grid[i].reverse();
    }
    return this.grid;
  };

  Board.prototype.rotateGrid = () => {
    let newGrid = this.createGrid();
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.row; j++) {
        newGrid[i][j] = this.grid[j][i];
      }
    }
    return newGrid;
  };

  Board.prototype.keyPressed = e => {
    if (!this.isPlayed) return;

    let key = e.keyCode;
    this.flipped = false;
    this.rotated = false;

    // right - left
    if (key == 37) {
      this.grid = this.flipGrid();
      this.flipped = true;
    }
    if (key == 39) {
      // do nothing
    }

    // up - down
    if (key == 38) {
      this.grid = this.rotateGrid();
      this.grid = this.flipGrid();
      this.rotated = true;
      this.flipped = true;
    }
    if (key == 40) {
      this.grid = this.rotateGrid();
      this.rotated = true;
    }

    this.pastGrid = this.copy(this.grid);

    for (let i = 0; i < this.row; i++) {
      this.grid[i] = this.operate(this.grid[i]);
    }

    if (this.flipped) this.grid = this.flipGrid();
    if (this.rotated) {
      this.grid = this.rotateGrid();
      this.grid = this.rotateGrid();
      this.grid = this.rotateGrid();
    }

    if (this.compare(this.pastGrid, this.grid)) this.addNumber();
  };

  Board.prototype.operate = row => {
    row = this.slide(row);
    row = this.merge(row);
    row = this.slide(row);
    return row;
  };

  // Todo
  Board.prototype.slide = row => {
    let array = row.filter(item => item.value != 0);
    let missing = this.row - array.length;
    let zeros = Array(missing).fill(0); // [{value:0} x 4]
    zeros = zeros.map(item => {
      return { value: item };
    });
    array = zeros.concat(array);
    return array;
  };

  Board.prototype.merge = row => {
    for (let i = this.row - 1; i >= 1; i--) {
      let a = row[i].value;
      let b = row[i - 1].value;
      if (a == b && a != 0) {
        row[i].value = a + b;
        row[i - 1].value = 0;
        if (row[i].value > this.currentTile) this.currentTile = row[i].value;
        this.score.added = a + b;
        this.score.current += a + b;
        // break;
      }
    }

    return row;
  };
}

const options = {
  conf: {
    row: 4,
    col: 4
  },
  game: {
    target: 2048
  }
};

export { Board, options };
