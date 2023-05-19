import { useEffect, useState } from "react";
import { Vector2 } from "../../HeaderInterfaces";
import { BoardProps, BoardRowProps, GameEndData, SquareProps, SquareStatus } from "./TicTacToeProps";

import "./TicTacToeGame.scss"

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
    <button className={`square ${getStatusClass()}`} onClick={props.onSquareClickEvent}>
      {props.value}
    </button>
  );
}

function BoardRow(props: BoardRowProps) {
  const allowPlay = props.gameStatusData.allowPlay;
  const squares = props.gameStatusData.squares;

  function getSquareIndex(offset: number) {
    return props.rowValue * 3 + offset;
  }

  function getSquareStatus(index: number) {
    return props.endData.endReason?.includes(index) ? SquareStatus.Highlighted :
      squares[index] ? SquareStatus.Selected : allowPlay ? SquareStatus.Empty : SquareStatus.Tied;
  }

  const square1Index = getSquareIndex(0);
  const square2Index = getSquareIndex(1);
  const square3Index = getSquareIndex(2);

  let square1Status = SquareStatus.Tied;
  let square2Status = SquareStatus.Tied;
  let square3Status = SquareStatus.Tied;

  if (props.endData.endStatus !== "TIE") {
    square1Status = getSquareStatus(square1Index);
    square2Status = getSquareStatus(square2Index);
    square3Status = getSquareStatus(square3Index);
  }

  return (
    <div>
      <Square value={squares[square1Index]} status={square1Status} onSquareClickEvent={() => props.onRowClickEvent(square1Index)} />
      <Square value={squares[square2Index]} status={square2Status} onSquareClickEvent={() => props.onRowClickEvent(square2Index)} />
      <Square value={squares[square3Index]} status={square3Status} onSquareClickEvent={() => props.onRowClickEvent(square3Index)} />
    </div>
  );
}

function Board(props: BoardProps) {
  const allowPlay = props.gameStatusData.allowPlay;
  const isXTurn = props.gameStatusData.isXTurn;
  const squares = props.gameStatusData.squares;

  function handleClick(index: number) {
    if (!allowPlay) return;

    //! Ignore if already has value
    if (squares[index] || calculateStatus(squares).endStatus) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXTurn ? "X" : "O";

    props.onPlay(nextSquares);
  }

  const endData = calculateStatus(squares);
  let status = `Game has ended! '${endData.endStatus}' has won!`;

  switch (endData.endStatus) {
    case "TIE":
      status = "Game has tied!";
      break;

    case null:
      status = "It is " + (isXTurn ? "X" : "O") + "'s turn.";
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
      <BoardRow gameStatusData={props.gameStatusData} rowValue={0} endData={endData} onRowClickEvent={handleClick} />
      <BoardRow gameStatusData={props.gameStatusData} rowValue={1} endData={endData} onRowClickEvent={handleClick} />
      <BoardRow gameStatusData={props.gameStatusData} rowValue={2} endData={endData} onRowClickEvent={handleClick} />
      <div className='status label'>{status}</div>
    </>
  );
}

function TicTacToeGame() {
  //! X is 'X', Y is 'O'
  const [winCount, setWinCount] = useState<Vector2>({ x: 0, y: 0 });
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [isViewingHistory, SetIsViewingHistory] = useState<boolean>(false);
  const [currentMove, setCurrentMove] = useState(0);
  const [hasGameEnded, setHasGameEnded] = useState<boolean>(false);

  const currentSquares = history[currentMove];
  const isXTurn = currentMove % 2 === 0;

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleGameEnd(winner: string) {
    if (hasGameEnded) return;
    setHasGameEnded(true);

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
    setHasGameEnded(false);
    SetIsViewingHistory(false);
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0)
  }

  function jumpToMove(nextMove: number) {
    setCurrentMove(nextMove);
    SetIsViewingHistory(nextMove !== history.length - 1);
  }

  const moves = history.map((squares, move) => {
    if (move <= 0) return null;
    const description = "#" + move;

    return (
      <button className={`move-button ${currentMove === move ? "selected-move-button" : ""}`} onClick={() => jumpToMove(move)}>{description}</button>
    );
  });

  const gameStatusData = {
    allowPlay: !hasGameEnded && !isViewingHistory,
    isXTurn: isXTurn,
    squares: currentSquares
  }

  return (
    <div id='game' className='label'>
      <button id='restart-button' className='label' onClick={handleGameRestart} style=
        {{ visibility: `${hasGameEnded ? "visible" : "hidden"}` }}>
        Restart Game?
      </button>
      <div id='game-board' className='label'>
        <Board gameStatusData={gameStatusData} onPlay={handlePlay} onGameEnd={handleGameEnd} />
      </div>
      <div id='game-info' className='label'>
        <div id='game-meta-info' className='label'>
          <p>{hasGameEnded || isViewingHistory ? "This was" : "Next is"} <b>move {currentMove + (hasGameEnded ? 0 : 1)}.</b></p>
          <p>'X' has won <b>{winCount.x} rounds</b>, while 'O' has won <b>{winCount.y} rounds</b>.</p>
        </div>
        <div id='game-history'>
          {currentMove > 0 ? "Moves History" : null}
        </div>
        <div>
          {moves}
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
