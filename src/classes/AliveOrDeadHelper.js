/*
  Any live cell with fewer than two live neighbors dies, as if by underpopulation.
  Any live cell with two or three live neighbors lives on to the next generation. 
  Any live cell with more than three live neighbors dies, as if by overpopulation.
  Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
*/

class AliveOrDeadHelper {
  constructor(boardArray, cellIndex, width) {
    this.board = boardArray;
    this.cell = cellIndex;
    this.width = width;
  }

  newState() {
    let currentCellState = this.board[this.cell];

    if (!currentCellState && this.numberOfNeighbors === 3) {
      return true;
    } else if (
      currentCellState &&
      (this.numberOfNeighbors === 2 || this.numberOfNeighbors === 3)
    ) {
      return true;
    }

    return false;
  }

  get numberOfNeighbors() {
    let neighbors = {
      topLeft: this.board[this.cell - this.width - 1] || false,
      topMiddle: this.board[this.cell - this.width] || false,
      topRight: this.board[this.cell - this.width + 1] || false,
      left: this.board[this.cell - 1] || false,
      right: this.board[this.cell + 1] || false,
      botLeft: this.board[this.cell + this.width - 1] || false,
      botMiddle: this.board[this.cell + this.width] || false,
      botRight: this.board[this.cell + this.width + 1] || false
    };

    let numberOfNeighbors = 0;
    for (let property in neighbors) {
      if (neighbors.hasOwnProperty(property) && neighbors[property]) {
        numberOfNeighbors++;
      }
    }

    return numberOfNeighbors;
  }
}

export default AliveOrDeadHelper;
