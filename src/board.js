import { random, randomFromList } from "./helpers";

const options = {
  conf: {
    row: 4,
    col: 4
  },
  game: {
    target: 2048,
    state: null,
    score: 0
  },
  grid: []
};

function Board(opt) {
  this.grid = opt.grid;
  this.pastGrid = [];
  this.row = opt.conf.row;
  this.col = opt.conf.col;
  this.score = opt.game.score;
  this.state = opt.game.score;
  this.zeros = [];
  this.options = [];
  this.flipped = false;
  this.rotated = false;
  this.played = false;
  this.merged = false;

  // board grid
  Board.prototype.createGrid = () => {
    let arr = [];
    if (this.row == this.col) {
      for (let i = 0; i < this.row; i++) {
        arr.push([]);
        for (let j = 0; j < this.row; j++) {
          arr[i].push(0);
        }
      }
      return arr;
    }
  };

  // add random number to board
  Board.prototype.addNumber = () => {
    this.options = [];
    for (let row = 0; row < this.row; row++) {
      for (let col = 0; col < this.col; col++) {
        if (this.grid[row][col] === 0) {
          this.options.push({
            x: row,
            y: col
          });
        }
      }
    }
    if (this.options.length > 0) {
      let position = randomFromList(this.options);
      let intRandom = Math.random(1);
      this.grid[position.x][position.y] = intRandom > 0.5 ? 2 : 4;
    }
  };

  Board.prototype.slide = row => {
    let array = row.filter(item => item);
    let missing = this.row - array.length;
    let zeros = Array(missing).fill(0);
    array = zeros.concat(array);
    return array;
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

  Board.prototype.keyPressed = e => {
    let key = e.keyCode;
    this.flipped = false;
    this.rotated = false;
    this.merged = false;
    // this.pastGrid = this.copy(this.grid);

    // if (key == 37) {
    //   this.grid = this.flipGrid();
    //   this.flipped = true;
    // }
    // if (key == 38) {
    //   this.grid = this.rotateGrid();
    //   this.grid = this.flipGrid();
    //   this.rotated = true;
    //   this.flipped = true;
    // }
    // if (key == 39) {
    //   this.grid = this.flipGrid();
    //   this.flipped = true;
    // }
    // if (key == 40) {
    //   this.grid = this.rotateGrid();
    //   this.rotated = true;
    // }

    // for (let i = 0; i < this.row; i++) {
    //   this.grid[i] = this.operate(this.grid[i]);
    // }

    // let changed = this.compare(this.pastGrid, this.grid);

    // if (this.flipped) {
    //   this.grid = this.flipGrid();
    // }
    // if (this.rotated) {
    //   this.grid = this.rotateGrid();
    //   this.grid = this.rotateGrid();
    //   this.grid = this.rotateGrid();
    // }

    // if (changed) this.addNumber();
    // console.log(this.direction);

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

    for (let i = 0; i < this.row; i++) {
      this.grid[i] = this.operate(this.grid[i]);
    }

    if (this.flipped) this.grid = this.flipGrid();
    if (this.rotated) {
      this.grid = this.rotateGrid();
      this.grid = this.rotateGrid();
      this.grid = this.rotateGrid();
    }

    let changed = this.compare(this.pastGrid, this.grid);

    if (changed) this.addNumber();
    console.log(this.direction);
  };

  Board.prototype.flipGrid = () => {
    for (let i = 0; i < this.row; i++) {
      this.grid[i].reverse();
    }
    return this.grid;
  };

  Board.prototype.rotateGrid = () => {
    console.table(this.grid);
    let newGrid = this.createGrid();
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.row; j++) {
        newGrid[i][j] = this.grid[j][i];
      }
    }
    console.table(newGrid);
    return newGrid;
  };

  Board.prototype.operate = row => {
    row = this.slide(row);
    row = this.merge(row);
    row = this.slide(row);
    return row;
  };

  Board.prototype.merge = row => {
    for (let i = this.row - 1; i >= 1; i--) {
      let a = row[i];
      let b = row[i - 1];
      if (a == b) {
        row[i] = a + b;
        row[i - 1] = 0;
        // break;
      }
    }
    this.merged = true;
    return row;
  };
}

export { Board, options };
