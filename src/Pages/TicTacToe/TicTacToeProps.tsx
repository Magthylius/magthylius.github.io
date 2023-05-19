export enum SquareStatus {
    Empty,
    Selected,
    Tied,
    Highlighted
}

export interface GameEndData {
    endStatus: string | null;
    endReason?: number[];
}

export interface SquareProps {
    squareValue?: string;
    status: SquareStatus;
    onSquareClickEvent: () => void;
}

export interface BoardRowProps {
    refData: string[];
    endData: GameEndData;
    rowValue: number;
    onRowClickEvent: (index: number) => void;
}

export interface BoardProps {
    gameStatusData: GameStatusData,
    onPlay: (squares: string[]) => void,
    onGameEnd: (winner: string) => void
}

export interface GameStatusData {
    allowPlay: boolean,
    isXTurn: boolean,
    squares: string[],
}