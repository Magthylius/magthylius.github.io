import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface SquareProps {
  squareValue: string;
  onSquareClickEvent: () => void;
}

interface BoardRowProps {
  refData: string[];
  rowValue: number;
  onRowClickEvent: (index: number) => void;
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onSquareClickEvent}>
      {props.squareValue}
    </button>
  );
}

function BoardRow(props: BoardRowProps) {
  const square1Index = props.rowValue * 3 + 0;
  const square2Index = props.rowValue * 3 + 1;
  const square3Index = props.rowValue * 3 + 2;

  return (
    <div>
      <Square squareValue={props.refData[square1Index]} onSquareClickEvent={() => props.onRowClickEvent(square1Index)} />
      <Square squareValue={props.refData[square2Index]} onSquareClickEvent={() => props.onRowClickEvent(square2Index)} />
      <Square squareValue={props.refData[square3Index]} onSquareClickEvent={() => props.onRowClickEvent(square3Index)} />
    </div>
  );
}

function App() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill("-"));
  const [isXTurn, setIsXTurn] = useState<boolean>(true);

  function handleClick(index: number) {
    //! Ignore if already has value
    if (squares[index] !== "-" || calculateWinner(squares) !== "-") return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXTurn ? "X" : "O";
    setSquares(nextSquares);
    setIsXTurn(!isXTurn);
  }

  const winner = calculateWinner(squares);
  const status = winner === "-" ? "Next player: " + (isXTurn ? "X" : "O") : "Winner: " + winner;

  return (
    <>
      <div className='status'>{status}</div>
      <BoardRow refData={squares} rowValue={0} onRowClickEvent={handleClick} />
      <BoardRow refData={squares} rowValue={1} onRowClickEvent={handleClick} />
      <BoardRow refData={squares} rowValue={2} onRowClickEvent={handleClick} />
    </>
  );
}

function calculateWinner(currentSquares: string[]) {
  const matchLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < matchLines.length; i++) {
    const [a, b, c] = matchLines[i];

    //! If empty, it will always fail
    if (currentSquares[a] === "-") continue;

    if (currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
      return currentSquares[a];
    }
  }

  return "-";
}

export default App;
