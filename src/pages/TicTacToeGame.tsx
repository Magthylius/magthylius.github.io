import { useEffect, useState } from "react";
import "./TicTacToeGame.scss"
import { Vector2 } from "../HeaderInterfaces";

interface GameEndData {
  endStatus: string | null;
  endReason?: number[];
}

enum SquareStatus {
  Empty,
  Selected,
  Tied,
  Highlighted
}

interface SquareProps {
  squareValue?: string;
  status: SquareStatus;
  onSquareClickEvent: () => void;
}

interface BoardRowProps {
  refData: string[];
  endData: GameEndData;
  rowValue: number;
  onRowClickEvent: (index: number) => void;
}

function Square(props: SquareProps) {
  function getStatusClass(): string {
    switch (props.status) {
      case SquareStatus.Selected:
        return "square-selected";

      case SquareStatus.Tied:
        return "square-tied";

      case SquareStatus.Highlighted:
        return "square-highlighted";

      case SquareStatus.Empty:
      default:
        return "";
    }
  }

  return (
    <button
      className={`square ${getStatusClass()}`}
      onClick={props.onSquareClickEvent}
    >
      {props.squareValue}
    </button>
  );
}

function BoardRow(props: BoardRowProps) {
  const square1Index = props.rowValue * 3 + 0;
  const square2Index = props.rowValue * 3 + 1;
  const square3Index = props.rowValue * 3 + 2;

  let square1Status = SquareStatus.Tied;
  let square2Status = SquareStatus.Tied;
  let square3Status = SquareStatus.Tied;

  if (props.endData.endStatus !== "TIE") {
    const hasGameEnded = props.endData.endStatus === "X" || props.endData.endStatus === "O";

    square1Status = props.endData.endReason?.includes(square1Index) ? SquareStatus.Highlighted :
      props.refData[square1Index] ? SquareStatus.Selected :
        hasGameEnded ? SquareStatus.Tied : SquareStatus.Empty;

    square2Status = props.endData.endReason?.includes(square2Index) ? SquareStatus.Highlighted :
      props.refData[square2Index] ? SquareStatus.Selected :
        hasGameEnded ? SquareStatus.Tied : SquareStatus.Empty;

    square3Status = props.endData.endReason?.includes(square3Index) ? SquareStatus.Highlighted :
      props.refData[square3Index] ? SquareStatus.Selected :
        hasGameEnded ? SquareStatus.Tied : SquareStatus.Empty;
  }

  return (
    <div>
      <Square squareValue={props.refData[square1Index]}
        status={square1Status}
        onSquareClickEvent={() => props.onRowClickEvent(square1Index)}
      />
      <Square squareValue={props.refData[square2Index]}
        status={square2Status}
        onSquareClickEvent={() => props.onRowClickEvent(square2Index)}
      />
      <Square squareValue={props.refData[square3Index]}
        status={square3Status}
        onSquareClickEvent={() => props.onRowClickEvent(square3Index)}
      />
    </div>
  );
}

function Board(props: { isXTurn: boolean, squares: string[], onPlay: (squares: string[]) => void, onGameEnd: (winner: string) => void }) {
  function handleClick(index: number) {
    //! Ignore if already has value
    if (props.squares[index] || calculateStatus(props.squares).endStatus) return;

    const nextSquares = props.squares.slice();
    nextSquares[index] = props.isXTurn ? "X" : "O";

    props.onPlay(nextSquares);
  }

  const endData = calculateStatus(props.squares);
  let status = `Game has ended! '${endData.endStatus}' has won!`;

  switch (endData.endStatus) {
    case "TIE":
      status = "Game has tied!";
      break;

    case null:
      status = "It is " + (props.isXTurn ? "X" : "O") + "'s turn.";
      break;
  }

  useEffect(() => {
    switch (endData.endStatus) {
      case "TIE":
      case "X":
      case "O":
        props.onGameEnd(endData.endStatus);
        break;
    }
  }, [props, endData.endStatus])

  return (
    <>
      <BoardRow refData={props.squares} rowValue={0} endData={endData} onRowClickEvent={handleClick} />
      <BoardRow refData={props.squares} rowValue={1} endData={endData} onRowClickEvent={handleClick} />
      <BoardRow refData={props.squares} rowValue={2} endData={endData} onRowClickEvent={handleClick} />
      <div className='status label'>{status}</div>
    </>
  );
}

function TicTacToeGame() {
  //! X is 'X', Y is 'O'
  const [winCount, setWinCount] = useState<Vector2>({ x: 0, y: 0 });
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const [gameHasEnded, setGameHasEnded] = useState<boolean>(false);

  const currentSquares = history[currentMove];
  const isXTurn = currentMove % 2 === 0;

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleGameEnd(winner: string) {
    if (gameHasEnded) return;
    setGameHasEnded(true);

    switch (winner) {
      case "X":
        winCount.x++;
        break;

      case "O":
        winCount.y++;
        break;
    }

    setWinCount({ x: winCount.x, y: winCount.y });
  }

  function handleGameRestart() {
    setGameHasEnded(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0)
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
    <div id='game' className='label'>
      <div id='game-board' className='label'>
        <Board isXTurn={isXTurn} squares={currentSquares} onPlay={handlePlay} onGameEnd={handleGameEnd} />
        {!gameHasEnded ? null :
          <button id='restart-button' className='label' onClick={handleGameRestart}>
            Restart Game
          </button>
        }
      </div>
      <div id='game-info' className='label'>
        <div id='game-meta-info' className='label'>
          <p>This is <b>MOVE #{currentMove}.</b></p>
          <p>'X' has won <b>{winCount.x} rounds</b>, while 'O' has won <b>{winCount.y} rounds</b>.</p>
        </div>
        <div id='game-history'>
          Sort moves by <button onClick={() => setSortAscending(!sortAscending)}>{sortAscending ? "Ascending" : "Descending"}</button>
          <div>
            <ol>{sortAscending ? moves : moves.reverse()}</ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateStatus(currentSquares: string[]) {
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
    if (!currentSquares[a]) continue;

    if (currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
      const endData: GameEndData = {
        endStatus: currentSquares[a],
        endReason: [a, b, c]
      }
      return endData;
    }
  }

  //! forEach will not return correctly because it returns the callback, not the whole method
  for (let i = 0; i < currentSquares.length; i++) {
    if (!currentSquares[i]) return { endStatus: null };
  }

  return { endStatus: "TIE" }
}

export default TicTacToeGame;
