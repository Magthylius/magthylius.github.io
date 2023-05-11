import { useState } from "react";
import "./TicTacToe.css"

interface GameEndData {
  endStatus: string;
  endReason?: number[];
}

interface SquareProps {
  squareValue: string;
  wantsHighlight?: boolean;
  onSquareClickEvent: () => void;
}

interface BoardRowProps {
  refData: string[];
  endData?: number[];
  rowValue: number;
  onRowClickEvent: (index: number) => void;
}

function Square(props: SquareProps) {
  return (
    <button className={props.wantsHighlight ? "square-highlighted" : "square"} onClick={props.onSquareClickEvent}>
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
      <Square squareValue={props.refData[square1Index]} onSquareClickEvent={() => props.onRowClickEvent(square1Index)} wantsHighlight={props.endData?.includes(square1Index)} />
      <Square squareValue={props.refData[square2Index]} onSquareClickEvent={() => props.onRowClickEvent(square2Index)} wantsHighlight={props.endData?.includes(square2Index)} />
      <Square squareValue={props.refData[square3Index]} onSquareClickEvent={() => props.onRowClickEvent(square3Index)} wantsHighlight={props.endData?.includes(square3Index)} />
    </div>
  );
}

function Board(props: { isXTurn: boolean, squares: string[], onPlay: (squares: string[]) => void }) {
  function handleClick(index: number) {
    //! Ignore if already has value
    if (props.squares[index] !== "-" || calculateWinner(props.squares).endStatus !== "-") return;

    const nextSquares = props.squares.slice();
    nextSquares[index] = props.isXTurn ? "X" : "O";

    props.onPlay(nextSquares);
  }

  const endData = calculateWinner(props.squares);
  const status = endData.endStatus === "-" ? "Next player: " + (props.isXTurn ? "X" : "O") : "Winner: " + endData.endStatus;

  return (
    <>
      <div className='status'>{status}</div>
      <BoardRow refData={props.squares} rowValue={0} endData={endData.endReason} onRowClickEvent={handleClick} />
      <BoardRow refData={props.squares} rowValue={1} endData={endData.endReason} onRowClickEvent={handleClick} />
      <BoardRow refData={props.squares} rowValue={2} endData={endData.endReason} onRowClickEvent={handleClick} />
    </>
  );
}

function TicTacToeGame() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill("-")])
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const currentSquares = history[currentMove];
  const isXTurn = currentMove % 2 === 0;

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpToMove(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpToMove(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board isXTurn={isXTurn} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <div>
          Sort moves by <button onClick={() => setSortAscending(!sortAscending)}>{sortAscending ? "Ascending" : "Descending"}</button>
        </div>
        <div>
          <ol>{sortAscending ? moves : moves.reverse()}</ol>
        </div>
        <div className="game-move-info">
          You are on move #{currentMove}
        </div>
      </div>
    </div>
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
      const endData: GameEndData = {
        endStatus: currentSquares[a],
        endReason: [a, b, c]
      }
      return endData;
    }
  }

  const drawData: GameEndData = {
    endStatus: "-",
  }
  return drawData;
}

export default TicTacToeGame;
