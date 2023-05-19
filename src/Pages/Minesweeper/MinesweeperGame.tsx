import { useState } from "react";
import { FieldProps, TileProps } from "./MinesweeperProps";
import { Vector2 } from "../../HeaderInterfaces";
import "./MinesweeperGame.scss"

function Tile(props: TileProps) {
  return (
    <button className="tile">{props.value}</button>
  );
}

function Field(props: FieldProps) {
  const fieldSize: Vector2 = props.fieldSize;
  const fieldData: number[][] = props.fieldData;
  const rows = Array(fieldSize.y);

  for (let index = 0; index < fieldSize.y; index++) {
    const fieldIndex = index * fieldSize.x;
    rows[index] = fieldData.slice(fieldIndex, fieldIndex + fieldSize.x);
  }

  const rowTiles = rows.map((rowData, index) => {

  });
  return (
    <></>
  );
}

export default function MinesweeperGame() {
  const [fieldSize, setFieldSize] = useState<Vector2>({ x: 10, y: 10 });
  const [fieldData, setFieldData] = useState<number[][]>([Array(fieldSize.x * fieldSize.y).fill(0)]);

  return (
    <div>
      <div id="spacing"></div>
      <Field fieldSize={fieldSize} fieldData={fieldData}></Field>
    </div>
  );
}