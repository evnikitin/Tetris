import { useState, useCallback } from "react";

import { randomTetromino } from "../utils/tetrominous";
import { Figure } from "../components/Game/Game";

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

const buildPlayer = (figures: Figure[], previous?: Player): Player=> {
  let tetrominoes : Tetromino[];
  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino(figures));
  } else {
    tetrominoes = Array(3)
      .fill(0)
      .map((_) => randomTetromino(figures));
  }

  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop() as Tetromino
  };
};

export const usePlayer = (gameStats: {
  variant: string,
  level: number;
  linesCompleted: number;
  pointsPerLevel: number;
  secondsToLevel: number;
  score: number;
  seconds: number;
}, figures: Figure[][]) : [Player, React.Dispatch<React.SetStateAction<Player>>, (figuresfigures: Figure[]) => void] => {
  const { level } = gameStats;
  const [player, setPlayer] = useState(buildPlayer(figures[level-1]));

  const resetPlayer = useCallback((figures: Figure[]) => {
    setPlayer((prev) => buildPlayer(figures, prev));
  }, []);

  return [player, setPlayer, resetPlayer];
};
