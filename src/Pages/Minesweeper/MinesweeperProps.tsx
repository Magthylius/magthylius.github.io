import { Vector2 } from "../../HeaderInterfaces";

export enum GameState {
  Awaiting,
  Ongoing,
  Won,
  Lost
}

export interface TileData {
  value: number;
  isOpened: boolean;
}

export interface TileProps {
  tileData: TileData,
  onTileClicked: () => void;
}

export interface FieldProps {
  fieldSize: Vector2;
  fieldData: TileData[][];
  onTileClicked: (x: number, y: number) => void;
}