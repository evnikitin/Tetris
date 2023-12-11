import { useState, useCallback } from "react";

import { randomTetromino } from "../utils/tetrominous";

export interface Tetromino {
   shape: number[][];
   color?: string;
}
 
export interface Position {
   row: number;
   column: number;
 }
 
export interface Player {
   collided: boolean;
   isFastDropping: boolean;
   position: Position;
   tetrominoes: Tetromino[];
   tetromino: Tetromino; 
 }

const buildPlayer = (previous?: Player): Player=> {
  let tetrominoes : Tetromino[];
  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  } else {
    tetrominoes = Array(3)
      .fill(0)
      .map((_) => randomTetromino());
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop() as Tetromino
  };
};

export const usePlayer = () : [Player, React.Dispatch<React.SetStateAction<Player>>, () => void] => {
  const [player, setPlayer] = useState(buildPlayer());

  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev));
  }, []);

  return [player, setPlayer, resetPlayer];
};
