import { Vector2 } from "../../HeaderInterfaces";

export interface TileProps {
  value: number;
}

export interface FieldProps {
  fieldSize: Vector2;
  fieldData: number[][];
}