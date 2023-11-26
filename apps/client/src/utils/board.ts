import { Board } from "../components/Game/Board/Board";
import { Cell } from "../components/Game/Cell";
import { NextBoardProps } from "../hooks/useBoard";
import { movePlayer } from "./PlayerController";
import { Position } from "../hooks/usePlayer";
import { transferToBoard } from "./tetrominous";

export const buildBoard = ({ rows, columns } : {rows: number, columns: number}) => {
   const builtRows = Array.from({ length: rows }, () =>
     Array.from({ length: columns }, () => ({ ...Cell }))
   ); 
   return {
     rows: builtRows,
     size: { rows, columns }
   };
};

const findDropPosition = ({ board, position, shape } : {board: Board, position: Position, shape: number[][]}) => {
  const max = board.size.rows - position.row + 1;
  let row = 0;

  for (let i = 0; i < max; i++) {
    const delta = { row: i, column: 0 };
    const result = movePlayer({ delta, position, shape, board });
    const { collided } = result;

    if (collided) {
      break;
    }

    row = position.row + i;
  }

  return { ...position, row };
};

export const nextBoard = ({ board, player, resetPlayer, addLinesCleared }: NextBoardProps) => {
  const { tetromino, position } = player;

  let rows = board.rows.map((row) =>
    row.map((cell) => (cell.occupied ? cell : { ...Cell }))
  );

  const dropPosition = findDropPosition({
    board,
    position,
    shape: tetromino.shape
  });

  const color= player.isFastDropping ? `${tetromino.color}` : 'gost'  

  rows = transferToBoard({
    color,
    isOccupied: player.isFastDropping,
    position: dropPosition,
    rows,
    shape: tetromino?.shape
  });

  if (!player.isFastDropping) {
   rows = transferToBoard({
     color: String(tetromino.color),
     isOccupied: player.collided,
     position,
     rows,
     shape: tetromino.shape
   });
  }

  const blankRow = rows[0].map((_) => ({ ...Cell }));
  let linesCleared = 0;
  rows = rows.reduce((acc : (typeof Cell)[][], row) => {
    if (row.every((column) => column.occupied)) {
      linesCleared++;
      acc.unshift([...blankRow]);
    } else {
      acc.push(row);
    }

    return acc;
  }, []);

  if (linesCleared > 0) {
    addLinesCleared(linesCleared);
  }
   
  if (player.collided || player.isFastDropping) {
    resetPlayer();
  }

  return {
    rows,
    size: { ...board.size }
  };
};

export const hasCollision = ({ board, position, shape } : {board: Board, position: Position, shape : number[][]}) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          board.rows[row] &&
          board.rows[row][column] &&
          board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isWithinBoard = ({ board, position, shape } : {board: Board, position: Position, shape : number[][]}) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};