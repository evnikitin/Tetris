import { useState, useCallback } from "react";

export interface GameStats {
  variant: string,
  points: number[];
  times: number[];
  level: number;
  linesCompleted: number;
  pointsPerLevel: number;
  secondsToLevel: number;
  score: number;
  seconds: number;
}

export type AddLinesCleared = (lines: number) => void;

export type TimeChange = () => void;


const buildGameStats = (level: number, times: number[] , points: number[], variant : string) => ({
  variant,
  points,
  times,
  level,
  linesCompleted: 0,
  pointsPerLevel: points[level-1],
  secondsToLevel: times[level-1],
  score: 0,
  seconds: 0
});

export const useGameStats = (level: number, times: number[] , points: number[], variant : string ): [GameStats, AddLinesCleared, TimeChange] => {
  const [gameStats, setGameStats] = useState<GameStats>(buildGameStats(level, times, points, variant));

  const addLinesCleared = useCallback((lines: number) => {
    setGameStats((previous) => {
      const score = previous.score + lines * 100;
      let { pointsPerLevel } = previous;
      let level = previous.level;
      const linesCompleted = previous.linesCompleted + lines;
      if(previous.variant === 'points'){
        level =
        score >= pointsPerLevel && previous.level < 3
            ? previous.level + 1
            : previous.level;        
        pointsPerLevel = level > previous.level ? previous.points[level - 1] : pointsPerLevel;
      }      
      if (level === 3) pointsPerLevel = 0;
      return {
        variant: previous.variant,
        points: previous.points,
        times: previous.times,
        level,
        linesCompleted,
        pointsPerLevel,
        secondsToLevel: previous.secondsToLevel,
        score, 
        seconds: previous.seconds
      };
    });
  }, []);

  const timeChange = useCallback(() => {
    setGameStats((previous) => {
      const seconds = previous.seconds + 1;
      let { secondsToLevel } = previous;
      const level = previous.level;
      if(previous.variant === 'time'){
        const level =
        seconds >= secondsToLevel && previous.level < 3
            ? previous.level + 1
            : previous.level;
        secondsToLevel = level > previous.level ? previous.times[level - 1] : secondsToLevel;
      }      
      if (level === 3) secondsToLevel = 0;
      return {
        variant: previous.variant,
        points: previous.points,
        times: previous.times,
        level,
        linesCompleted: previous.linesCompleted,
        pointsPerLevel: previous.pointsPerLevel,
        secondsToLevel,
        score: previous.score,
        seconds
      };
    });
  }, []);

  return [gameStats, addLinesCleared, timeChange];
};