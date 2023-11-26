import { useState, useCallback, useEffect } from "react";
import { GameStats } from "./useGameStats";

export const useDropTime = ({ gameStats, times } : {gameStats: GameStats, times: number[]}) : [number | null,  () => void,  () => void ] => {
  const [dropTime, setDropTime] = useState<number | null>(times[gameStats.level-1]);
  const [previousDropTime, setPreviousDropTime] = useState<number | null>(0);

  const resumeDropTime = useCallback(() => {
    if (!previousDropTime) {
      return;
    }
    setDropTime(previousDropTime);
    setPreviousDropTime(null);
  }, [previousDropTime]);

  const pauseDropTime = useCallback(() => {
    if (dropTime) {
      setPreviousDropTime(dropTime);
    }
    setDropTime(null);
  }, [dropTime, setPreviousDropTime]);

  useEffect(() => {
    
    setDropTime(times[gameStats.level-1]);
  }, [gameStats.level,times]);

  return [dropTime, pauseDropTime, resumeDropTime];
};