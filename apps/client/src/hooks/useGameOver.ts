import { useState, useCallback } from 'react';

export type SetGameOverFn = (value: boolean) => void;
export type ResetGameOverFn = () => void;

export const useGameOver = (): [boolean, SetGameOverFn, ResetGameOverFn] => {
  const [gameOver, setGameOver] = useState<boolean>(true);

  const resetGameOver = useCallback<ResetGameOverFn>(() => {
    setGameOver(false);
  }, []);

  return [gameOver, setGameOver, resetGameOver];
};
