import React from "react";
import { GameStatsStyled } from "./GameStatsStyled";

interface MyProps{
   gameStats:{
      level: number;
      linesCompleted: number;
      linesPerLevel: number;
      points: number;
  }
}

const GameStats = ({ gameStats }: MyProps) => {
  const { level, points, linesCompleted, linesPerLevel } = gameStats;
  const linesToLevel = linesPerLevel - linesCompleted;

  return (
    <GameStatsStyled>
      <li>Level</li>
      <li>{level}</li>
      <li>Lines to level</li>
      <li>{linesToLevel}</li>
      <li>Points</li>
      <li>{points}</li>
    </GameStatsStyled>
  );
};

export default React.memo(GameStats);