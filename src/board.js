import { random, randomFromList } from "./helpers";

/**
 * Board object
 *
 * @param {Object} opt
 */
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

  /**
   * Create new board
   */
  Board.prototype.init = () => {
    this.grid = this.createGrid();
    this.pastGrid = this.copy(this.grid);
    this.addNumber();
    this.addNumber();
  };

  /**
   * Make a grid.
   * This func return new grid array and
   * array size is coming from configure json
   */
  Board.prototype.createGrid = () => {
    let arr = [];
    if (this.row == this.col) {
      // arr = Array(this.row).fill(Array(this.row).fill({ value: 0 }));
      for (let i = 0; i < this.row; i++) {
        arr.push([]);
        for (let j = 0; j < this.row; j++) {
          arr[i].push({
            value: 0,
            isMerged: false,
            isMoved: false,
            row: i,
            col: j
          });
        }
      }
      return arr;
    }
  };

  /**
   * This function return empty position
   * list array than created board
   */
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

  /**
   * Add random number into board
   */
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

  /**
   * When current score is biggest than best score,
   * current score replace to best score
   */
  Board.prototype.setBestScore = () => {
    if (!this.score.best) {
      this.score.best = this.score.current;
      localStorage.setItem("best", this.score.best);
    } else if (this.score.current > this.score.best) {
      this.score.best = this.score.current;
      localStorage.setItem("best", this.score.best);
    }
  };

  /**
   * Copy grid and return new array
   * @param {Array} grid
   */
  Board.prototype.copy = grid => {
    let newGrid = this.createGrid();
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        newGrid[row][col] = grid[row][col];
      }
    }
    return newGrid;
  };

  /**
   * Filter
   */
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

  /**
   * When user click to arrow right and left keys
   * will called this function and that array row will
   * reverse.
   */
  Board.prototype.flipGrid = () => {
    for (let i = 0; i < this.row; i++) {
      this.grid[i].reverse();
    }
    return this.grid;
  };

  /**
   * Rotate grid row and col
   */
  Board.prototype.rotateGrid = () => {
    let newGrid = this.createGrid();
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.row; j++) {
        newGrid[i][j] = this.grid[j][i];
      }
    }
    return newGrid;
  };

  /**
   * Capture arrow keys with this function
   * and merge or slide tile in grid
   */
  Board.prototype.keyPressed = e => {
    if (!this.isPlayed) return;

    let key = e.keyCode;

    let keys = [37, 38, 39, 40];
    if (!keys.includes(key)) return;

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
      this.grid[i] = this.operate(this.grid[i], i);
    }

    if (this.flipped) this.grid = this.flipGrid();
    if (this.rotated) {
      this.grid = this.rotateGrid();
      this.grid = this.rotateGrid();
      this.grid = this.rotateGrid();
    }

    if (this.compare(this.pastGrid, this.grid)) this.addNumber();
  };

  Board.prototype.operate = (row, i) => {
    row = this.slide(row, i);
    row = this.merge(row, i);
    row = this.slide(row, i);
    return row;
  };

  Board.prototype.slide = (row, rowIndex) => {
    let past = row[rowIndex];
    let array = row.filter(item => item.value != 0);
    let missing = this.row - array.length;
    let zeros = Array(missing).fill(0); // [{value:0} x 4]
    zeros = zeros.map((item, index) => {
      return {
        value: item,
        isMerged: false,
        isMoved: false
      };
    });
    array = zeros.concat(array);

    return array;
  };

  Board.prototype.merge = (row, rowIndex) => {
    for (let i = this.row - 1; i >= 1; i--) {
      let a = row[i].value;
      let b = row[i - 1].value;

      if (a == b && a != 0) {
        row[i].value = a + b;
        row[i - 1].value = 0;
        if (row[i].value > this.currentTile) this.currentTile = row[i].value;
        this.score.added = a + b;
        this.score.current += a + b;
        row[i].isMerged = true;
        row[i].isMoved = true;
        row[i].row = rowIndex;
        row[i].col = i;
        setTimeout(() => {
          row[i].isMerged = false;
          row[i].isMoved = false;
        }, 500);
        // break;
      }
    }
    // this.grid = this.setPosition(this.grid);

    return row;
  };

  Board.prototype.setPosition = function(array) {
    array.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        tile.pastRow = tile.row;
        tile.pastCol = tile.col;
        tile.row = rowIndex;
        tile.col = colIndex;
      });
    });
    return array;
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
