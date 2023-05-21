import { useState } from "react";
import { FieldProps, TileData, TileProps } from "./MinesweeperProps";
import { Vector2 } from "../../HeaderInterfaces";
import "./MinesweeperGame.scss"

function Tile(props: TileProps) {
  const value = props.tileData ? props.tileData.value : "null";
  return (
    <button className="tile" onClick={props.onTileClicked}>{value}</button>
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
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [mineCount, setMineCount] = useState<number>(10);
  const [fieldSize, setFieldSize] = useState<Vector2>({ x: 10, y: 10 });
  const [fieldData, setFieldData] =
    useState<TileData[][]>(Array(fieldSize.y).fill(0).map(row => new Array(fieldSize.x).fill(null)));

  function handleOnTileClicked(clickedX: number, clickedY: number) {
    const newFieldData = fieldData.slice(0, fieldData.length);

    if (!hasStarted) {
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

              if (newFieldData[actualX] && newFieldData[actualX][actualY] && newFieldData[actualX][actualY]?.value === -1) {
                surroundingMines++;
              }
            }
          }

          newFieldData[x][y] = { value: surroundingMines, isOpened: false };
        }
      }

      setHasStarted(true);
    }

    newFieldData[clickedX][clickedY] = { ...newFieldData[clickedX][clickedY], isOpened: true }
    setFieldData(newFieldData);
  }

  return (
    <div>
      <div id="spacing"></div>
      <Field fieldSize={fieldSize} fieldData={fieldData} onTileClicked={handleOnTileClicked} />
    </div>
  );
}
