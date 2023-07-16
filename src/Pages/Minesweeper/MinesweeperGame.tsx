import { useState } from "react";
import { FieldProps, GameState, TileData, TileProps } from "./MinesweeperProps";
import { Vector2 } from "../../HeaderInterfaces";
import "./MinesweeperGame.scss"

function Tile(props: TileProps) {
  const isOpened = props.tileData?.isOpened;
  const value = props.tileData?.value;
  const display = isOpened && value && value > 0 ? props.tileData.value : "";

  let tileClass = "tile ";
  if (isOpened) {
    if (value && value < 0) tileClass += "tile-mine ";
    else {
      tileClass += "tile-opened ";
      if (value > 0) tileClass += "tile-number ";
    }
  }
  else tileClass += "tile-closed ";

  return (
    <button className={tileClass} onClick={props.onTileClicked}>{display}</button>
  );
}

function Field(props: FieldProps) {
  const fieldSize: Vector2 = props.fieldSize;
  const fieldData: TileData[][] = props.fieldData;

  const rowTiles = fieldData.map((rowData: TileData[], rowIndex) => {
    const tiles = rowData.map((tileData: TileData, columnIndex) => {
      return <Tile key={columnIndex} tileData={tileData} onTileClicked={() => props.onTileClicked(rowIndex, columnIndex)} />;
    });

    return (
      <div key={rowIndex} className="fieldRow">
        {tiles}
      </div>
    );
  });

  return (
    <div className="field">
      {rowTiles}
    </div>
  );
}

export default function MinesweeperGame() {
  const [gameState, setGameState] = useState<GameState>(GameState.Awaiting);
  const [mineCount, setMineCount] = useState<number>(10);
  const [fieldSize, setFieldSize] = useState<Vector2>({ x: 10, y: 10 });
  const [remainderCount, setRemainderCount] = useState<number>(fieldSize.x * fieldSize.y);
  const [fieldData, setFieldData] =
    useState<TileData[][]>(Array(fieldSize.y).fill(0).map(row => new Array(fieldSize.x).fill(null)));

  function openTile(clickedX: number, clickedY: number, remainder: number, fieldData: TileData[][]): number {
    fieldData[clickedX][clickedY].isOpened = true;

    if (fieldData[clickedX][clickedY].value === -1) {
      setGameState(GameState.Lost);
      return remainder - 1;
    }

    if (fieldData[clickedX][clickedY].value === 0) {
      for (let a = -1; a < 2; a++) {
        for (let b = -1; b < 2; b++) {
          let neighbourX = clickedX + a;
          let neighbourY = clickedY + b;

          if (a === 0 && b === 0) continue;

          if (fieldData[neighbourX] && fieldData[neighbourX][neighbourY]
            && !fieldData[neighbourX][neighbourY].isOpened) {
            remainder = openTile(neighbourX, neighbourY, remainder, fieldData);
          }
        }
      }
    }

    return remainder - 1;
  }

  function handleOnTileClicked(clickedX: number, clickedY: number) {
    if (fieldData[clickedX] && fieldData[clickedX][clickedY] && fieldData[clickedX][clickedY].isOpened) return;
    if (gameState !== GameState.Awaiting && gameState !== GameState.Ongoing) return;

    const newFieldData = fieldData.slice(0, fieldData.length);
    if (gameState === GameState.Awaiting) {
      let currentMineCount: number = 0;
      while (currentMineCount < mineCount) {
        const randX = Math.round(Math.random() * (fieldSize.x - 1));
        const randY = Math.round(Math.random() * (fieldSize.y - 1));

        if (!(randX === clickedX && randY === clickedY) && !newFieldData[randX][randY]) {
          newFieldData[randX][randY] = { value: -1, isOpened: false };
          currentMineCount++;
        }
      }

      for (let y = 0; y < fieldSize.y; y++) {
        for (let x = 0; x < fieldSize.x; x++) {
          if (newFieldData[x][y]) continue;

          let surroundingMines = 0;
          for (let a = -1; a < 2; a++) {
            for (let b = -1; b < 2; b++) {
              let actualX = x + a;
              let actualY = y + b;

              if (a === 0 && b === 0) continue;

              if (newFieldData[actualX] && newFieldData[actualX][actualY] && newFieldData[actualX][actualY]?.value === -1) {
                surroundingMines++;
              }
            }
          }

          newFieldData[x][y] = { value: surroundingMines, isOpened: false };
        }
      }

      setGameState(GameState.Ongoing);
    }

    const newRemainderCount = openTile(clickedX, clickedY, remainderCount, newFieldData);

    setFieldData(newFieldData);
    setRemainderCount(newRemainderCount);

    if (newRemainderCount === mineCount) setGameState(GameState.Won);
  }

  let gameResult: string = "";
  switch (gameState) {
    case GameState.Lost:
      gameResult = "You Lost!"
      break;

    case GameState.Won:
      gameResult = "You Won!";
      break;
  }

  return (
    <div>
      <div id="spacing"></div>
      <div>Game is till WIP!</div>
      <Field fieldSize={fieldSize} fieldData={fieldData} onTileClicked={handleOnTileClicked} />
      <p>Remaining: {remainderCount}</p>
      <p>{gameResult}</p>
    </div>
  );
}
