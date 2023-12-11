import React, { useEffect } from "react";
import { GameStatsStyled } from "./GameStatsStyled";
import { TimeChange } from "../../../hooks/useGameStats";

enum VariantToPlay {
  POINTS = 'points',
  TIME = 'time'

}

interface MyProps{
   gameStats: {
      variant: string,
      level: number;
      linesCompleted: number;
      pointsPerLevel: number;
      secondsToLevel: number;
      score: number;
      seconds: number;
   },
   timeChange: TimeChange
}

const GameStats = ({ gameStats, timeChange}: MyProps) => {
  const { level, score, seconds ,linesCompleted, pointsPerLevel, secondsToLevel, variant } = gameStats;
  const secondsPerLevel = level === 3 ? secondsToLevel : secondsToLevel - seconds;
  const pointsToLevel = level === 3 ? pointsPerLevel : pointsPerLevel - score;

  useEffect(() => {
    const timer = setInterval(() => {
      timeChange();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });


  return (
    <GameStatsStyled>
      <li>Уровень</li>
      <li>{level}</li>
      <li>Линии</li>
      <li>{linesCompleted}</li>
      <li>{variant === VariantToPlay.TIME ? "Секунд до след уровня" : "Очков до след уровня"}</li>
      <li>{variant === VariantToPlay.TIME ? secondsPerLevel : pointsToLevel}</li>
      <li>{variant === VariantToPlay.TIME ? 'Время (с)' : 'Очки'}</li>
      <li>{variant === VariantToPlay.TIME ? seconds : score}</li>
    </GameStatsStyled>
  );
};

export default React.memo(GameStats);