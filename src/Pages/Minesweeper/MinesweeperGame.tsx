import { useState } from "react";
import { FieldProps, TileProps } from "./MinesweeperProps";
import { Vector2 } from "../../HeaderInterfaces";
import "./MinesweeperGame.scss"

function Tile(props: TileProps) {
  const value = props.value;
  const display = value <= 0 ? "" : value;
  return (
    <button className="tile">{value}</button>
  );
}

function Field(props: FieldProps) {
  const fieldSize: Vector2 = props.fieldSize;
  const fieldData: TileProps[][] = props.fieldData;

  const rowTiles = fieldData.map((rowData: TileProps[], index) => {
    const tiles = rowData.map((tile: TileProps, index) => {
      return <Tile value={tile.value} isOpened={tile.isOpened} />;
    });
    return (
      <div>
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
  const [fieldData, setFieldData] = useState<TileProps[][]>([Array(fieldSize.x * fieldSize.y).fill({ value: 0, isOpened: false })]);

  return (
    <div>
      <div id="spacing"></div>
      <Field fieldSize={fieldSize} fieldData={fieldData}></Field>
    </div>
  );
}