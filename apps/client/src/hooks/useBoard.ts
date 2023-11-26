import { useEffect, useState } from "react";

import { buildBoard, nextBoard} from "../utils/board";

import { Player } from "./usePlayer";
import { AddLinesCleared } from "./useGameStats";
import { Board } from "../components/Game/Board/Board";

type ResetPlayer = () => void;

export interface NextBoardProps{
  player: Player;
  board: Board,
  resetPlayer: ResetPlayer;
  addLinesCleared: AddLinesCleared;
}

export type NextBoard = (props: NextBoardProps) => Board;

interface UseBoardProps {
  rows: number;
  columns: number;
  player: Player;
  resetPlayer: ResetPlayer;
  addLinesCleared: AddLinesCleared;
} 

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared
} : UseBoardProps) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));

  useEffect(() => {
    setBoard((previousBoard) =>
      nextBoard({
        board: previousBoard,
        player,
        resetPlayer,
        addLinesCleared
      })
    );
  }, [player, resetPlayer, addLinesCleared]);


  return [board];
};