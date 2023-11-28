import React from "react";
import { GameStatsStyled } from "./GameStatsStyled";

interface MyProps{
   gameStats:{
      level: number;
      linesCompleted: number;
      pointsPerLevel: number;
      points: number;
  }
}

const GameStats = ({ gameStats }: MyProps) => {
  const { level, points, linesCompleted, pointsPerLevel } = gameStats;
  const pointsToLevel = pointsPerLevel - points;

  return (
    <GameStatsStyled>
      <li>Уровень</li>
      <li>{level}</li>
      <li>Линии</li>
      <li>{linesCompleted}</li>
      <li>Очков до след уровня</li>
      <li>{pointsToLevel}</li>
      <li>Очки</li>
      <li>{points}</li>
    </GameStatsStyled>
  );
};

export default React.memo(GameStats);