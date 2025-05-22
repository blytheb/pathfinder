import React, {useState, useEffect} from 'react';
import './App.css'
import Cell from './components/Cell';
import Maze from './components/maze';

function App() {
  const [maze, setMaze] = useState([]);
  const size = 10;
  
  useEffect(() => generatePath(), []);


  function blankMaze(){
    let matrix = [];

    for (let i = 0; i < size; i++){
        let row =[];
        for (let j = 0; j < size; j++){
            row.push("wall");
        }
        matrix.push(row);
    }
    return matrix;
  }

  function generatePath(){
    let matrix = blankMaze(size)
    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    function isCellValid(x, y){
        return (y>=0 && x>=0 && x< size && y<size && matrix[y][x] === 'wall');
    }

    function carvePath(x, y){
      matrix[y][x] = "path";

      const directions = dirs.sort(() => Math.random() -0.5);
      for (let [dx, dy] of directions) {
          const nx = x + dx * 2;
          const ny = y + dy * 2;
          if (isCellValid(nx, ny)){
              matrix[y+dy][x+dx] = "path";
              carvePath(nx, ny);
          }
      }
    }

    carvePath(1,1);
    matrix[1][0] = "start";
    matrix[size-2][size -1] = "end";

    setMaze(matrix);
  }

  return (
    <>
      <h1>Pathfinder Visual</h1>
      <Maze maze={maze}/>
      <h2>Generate a maze. Select a search path.</h2>
      <button onClick={generatePath}> Generate Maze </button>
      <button onClick={generatePath}> Breadth-First </button>
      <button onClick={generatePath}> Depth-First </button>

    </>
  )
}

export default App;
