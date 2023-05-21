import { useState } from "react";
import { FieldProps, TileData, TileProps } from "./MinesweeperProps";
import { Vector2 } from "../../HeaderInterfaces";
import "./MinesweeperGame.scss"

function Tile(props: TileProps) {
  const value = props.tileData.value;
  const display = value <= 0 ? "" : value;
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
  const [fieldSize, setFieldSize] = useState<Vector2>({ x: 10, y: 10 });
  const [fieldData, setFieldData] =
    useState<TileData[][]>(Array(fieldSize.y).fill(0).map(row => new Array(fieldSize.x).fill({ value: -1, isOpened: false })));

  function handleOnTileClicked(x: number, y: number) {
    const newFieldData = fieldData.slice(0, fieldData.length);
    newFieldData[x][y] = { ...newFieldData[x][y], value: 0, isOpened: true }
    setFieldData(newFieldData);
  }

  return (
    <div>
      <div id="spacing"></div>
      <Field fieldSize={fieldSize} fieldData={fieldData} onTileClicked={handleOnTileClicked} />
    </div>
  );
}