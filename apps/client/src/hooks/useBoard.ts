import { useEffect, useState } from "react";

import { buildBoard, nextBoard} from "../utils/board";

import { Player } from "./usePlayer";
import { AddLinesCleared } from "./useGameStats";
import { Board } from "../components/Game/Board/Board";
import { Figure } from "../components/Game/Game";

type ResetPlayer = (figures: Figure[]) => void;

export interface NextBoardProps{
  player: Player;
  board: Board,
  figures: Figure[],
  resetPlayer: ResetPlayer;
  addLinesCleared: AddLinesCleared;
}

export type NextBoard = (props: NextBoardProps) => Board;

interface UseBoardProps {
  rows: number;
  columns: number;
  player: Player;
  figures: Figure[][],
  resetPlayer: ResetPlayer;
  addLinesCleared: AddLinesCleared;
  gameStats: {
    variant: string,
    level: number;
    linesCompleted: number;
    pointsPerLevel: number;
    secondsToLevel: number;
    score: number;
    seconds: number;
  }
} 
export const useBoard = ({
  rows,
  columns,
  player,
  figures,
  gameStats,
  resetPlayer,
  addLinesCleared
} : UseBoardProps) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));
  const { level } = gameStats;
  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        figures: figures[level-1],
        resetPlayer,
        addLinesCleared
      })
    );
  }, [player, resetPlayer, addLinesCleared]);


  return [board];
};