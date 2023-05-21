import { Vector2 } from "../../HeaderInterfaces";

export interface TileProps {
  value: number;
  isOpened: false;
}

export interface FieldProps {
  fieldSize: Vector2;
  fieldData: TileProps[][];
}