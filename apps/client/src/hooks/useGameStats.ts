import { useState, useCallback } from "react";

export interface GameStats {
  level: number;
  linesCompleted: number;
  pointsPerLevel: number;
  points: number;
}

export type AddLinesCleared = (lines: number) => void;


const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  pointsPerLevel: 200,
  points: 0
});

export const useGameStats = (): [GameStats, AddLinesCleared] => {
  const [gameStats, setGameStats] = useState<GameStats>(buildGameStats());

  const addLinesCleared = useCallback((lines: number) => {
    setGameStats((previous) => {
      const points = previous.points + lines * 100;
      let { pointsPerLevel } = previous;
      const level =
      points >= pointsPerLevel && previous.level < 3
          ? previous.level + 1
          : previous.level;
      const linesCompleted = previous.linesCompleted + lines;
      pointsPerLevel = level > previous.level ? 1000 : pointsPerLevel;
      if (level === 3) pointsPerLevel = 0;
      return {
        level,
        linesCompleted,
        pointsPerLevel,
        points
      };
    });
  }, []);

  return [gameStats, addLinesCleared];
};