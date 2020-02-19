import React, { PureComponent } from 'react';
import './index.scss';
import Console from "../console";

function turn(c = 'N', d = 'L') {
  const directions = ['N', 'E', 'S', 'W'];
  const step = d === 'R' ? 1 : -1;
  const currentIndex = directions.indexOf(c);

  if (step === 1 && currentIndex === directions.length - 1) {
    return directions[0];
  }

  if (step === -1 && currentIndex === 0) {
    return directions[directions.length - 1];
  }

  return directions[currentIndex + step];
}

function move(c = [0, 0, 'N']) {
  switch (c[2]) {
    case "N":
      return [ c[0], c[1] + 1, c[2] ];
    case "S":
      return [ c[0], c[1] - 1, c[2] ];
    case "E":
      return [ c[0] + 1, c[1], c[2] ];
    case "W":
      return [ c[0] - 1, c[1], c[2] ];
    default: return c;
  }
}

function processMoves(start = [], moves = '') {
  let c = start.slice();

  for (let i = 0; i < moves.length; i++) {
    const m = moves.charAt(i);

    if (m === 'M') {
      c = move(c);
      continue;
    }

    c = [c[0], c[1], turn(c[2], m)];
  }

  return c;
}

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      gridSize: [],
      rovers: [
        {
          start: null,
          move: null,
          result: [],
        },
        {
          start: null,
          move: null,
          result: [],
        }
      ],
      enableInput: true,
      output: [],
    }
  }

  logLine(line) {
    return new Promise(r => {
      this.setState({
        output: [...this.state.output, line],
      }, () => r());
    });
  }

  setGridSize(line) {
    this.logLine(`[input] ${line}`);
    this.setState({
      gridSize: line.split(' ').map(c => parseInt(c, 10)),
    });
  }

  setRoverData(line, field, index) {
    let fieldValue;
    const rovers = this.state.rovers.slice();

    this.logLine(`[input] ${line}`);

    switch (field) {
      case 'start':
        fieldValue = line.split(' ').map((c, i) => {
          if (i < 2) return parseInt(c, 10);
          return c;
        });
        if (fieldValue.length !== 3) throw new Error('invalid initial coordinates (x, y, direction)');
        break;
      case 'move':
      default:
        if (!/[LRM]+/.test(line)) throw new Error('Invalid directions (L, R, M only)');
        fieldValue = line;
    }

    rovers[index] = {
      ...rovers[index],
      [field]: fieldValue,
    };

    this.setState({ rovers }, () => {
      if (field === 'move' && parseInt(index, 10) === rovers.length - 1) {
        this.startProcessing();
      }
    });
  }

  async startProcessing(roverIndex = 0) {
    this.setState({ enableInput: false });

    const rovers = this.state.rovers.slice();
    const result = processMoves(rovers[roverIndex].start, rovers[roverIndex].move);

    await this.logLine(result.join(' '));

    rovers[roverIndex].result = result;

    this.setState({ rovers }, () => {
      if (roverIndex < rovers.length - 1) {
        this.startProcessing(roverIndex + 1);
      }
    });
  }

  render() {
    const {
      enableInput,
      gridSize,
      output,
      rovers,
    } = this.state;

    return (
      <div className="App">
        <Console
          enabled={enableInput}
          output={output}
          onInput={line => {
            if (!gridSize.length) {
              return this.setGridSize(line);
            }

            for (let i = 0; i < rovers.length; i++) {
              const rover = rovers[i];

              if (!rover.start) {
                return this.setRoverData(line, 'start', i);
              }

              if (!rover.move) {
                return this.setRoverData(line, 'move', i);
              }
            }
          }}
        />
      </div>
    );
  }
}

export default App;
