import React from "react";
import AliveOrDeadHelper from "./classes/AliveOrDeadHelper";
import Cell from "./components/Cell";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 25,
      width: 25,
      speed: 100,
      aliveOrDead: []
    };
  }

  componentWillMount() {
    this.resizeBoard(true);
  }

  startGame() {
    let self = this;
    if (Window.interval) {
      clearInterval(Window.interval);
    }
    Window.interval = setInterval(function() {
      let arr = self.state.aliveOrDead.slice(0);

      for (let i = 0; i < self.state.aliveOrDead.length; i++) {
        arr[i] = new AliveOrDeadHelper(
          self.state.aliveOrDead,
          i,
          self.state.width
        ).newState();
      }

      self.setState({ aliveOrDead: arr });
    }, this.state.speed);
  }

  randomizeBoard() {
    for (let i in this.state.aliveOrDead) {
      let trueOrFalse = Math.random() * 100 > 50;
      let arr = this.state.aliveOrDead;
      let newStatus = (arr[i] = trueOrFalse);
      this.setState({ aliveOrDead: arr });
    }
  }

  resizeBoard(randomize) {
    let totalCells = this.state.height * this.state.width;
    let updatedArr = Array(totalCells).fill(false);
    this.setState({ aliveOrDead: updatedArr }, () => {
      if (randomize) {
        this.randomizeBoard();
        this.startGame();
      }
    });
  }

  toggleLife(column, row) {
    //Add previous row width length to the column index.
    let currentCellIndex = this.getCurrentIndex(column, row);
    let updateArr = this.state.aliveOrDead;
    let update = this.state.aliveOrDead[currentCellIndex];
    update = update === false;
    updateArr[currentCellIndex] = update;
    this.setState({ aliveOrDead: updateArr });
  }

  getCurrentIndex(column, row) {
    return this.state.width * row + column;
  }
  
  renderRow() {
    let rows = [];
    for (let i = 0; i < this.state.height; i++) {
      rows.push(this.renderColumns(i));
    }
    return rows;
  }

  renderColumns(rowNumber) {
    let elements = [];
    for (let i = 0; i < this.state.width; i++) {
      let aliveOrDeadIndex = this.getCurrentIndex(i, rowNumber);

      elements.push(
        <span onClick={this.toggleLife.bind(this, i, rowNumber)}>
          <Cell
            alive={this.state.aliveOrDead[aliveOrDeadIndex]}
            key={rowNumber + "_cell" + i}
          />
        </span>
      );
    }
    return <div className="width-wrap">{elements}</div>;
  }

  setDimensions() {
    let rows = document.getElementById("rows").value;
    let columns = document.getElementById("columns").value;
    this.setState({ width: columns, height: rows }, () => {
      this.resizeBoard(true);
    });
  }

  setSpeed(speed) {
    switch (speed) {
      case 1:
        this.setState({ speed: 1000 });
        break;
      case 2:
        this.setState({ speed: 500 });
        break;
      default:
        this.setState({ speed: 100 });
    }
    this.startGame();
  }
  render() {
    return (
      <div>
        <button onClick={this.setSpeed.bind(this, 1)}>Slow</button>
        <button onClick={this.setSpeed.bind(this, 2)}>Medium</button>
        <button onClick={this.setSpeed.bind(this, 3)}>Fast</button>
        <br />
        <button onClick={this.randomizeBoard.bind(this)}>Randomize</button>
        {this.renderRow()}
        <span>Rows:</span>
        <input type="number" id="rows" />
        <span>Columns:</span>
        <input type="number" id="columns" />
        <br />
        <button onClick={this.setDimensions.bind(this)}>
          Update Dimensions
        </button>
      </div>
    );
  }
}

export default App;
