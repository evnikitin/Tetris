import { useState, useCallback } from "react";

export interface GameStats {
  level: number;
  linesCompleted: number;
  linesPerLevel: number;
  points: number;
}

export type AddLinesCleared = (lines: number) => void;


const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 10,
  points: 0
});

export const useGameStats = (): [GameStats, AddLinesCleared] => {
  const [gameStats, setGameStats] = useState<GameStats>(buildGameStats());

  const addLinesCleared = useCallback((lines: number) => {
    setGameStats((previous) => {
      const points = previous.points + lines * 100;
      const { linesPerLevel } = previous;
      const newLinesCompleted = previous.linesCompleted + lines;
      const level =
        newLinesCompleted >= linesPerLevel
          ? previous.level + 1
          : previous.level;
      const linesCompleted = newLinesCompleted % linesPerLevel;

      return {
        level,
        linesCompleted,
        linesPerLevel,
        points
      };
    });
  }, []);

  return [gameStats, addLinesCleared];
};