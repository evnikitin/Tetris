import React from "react";

import { Tetromino } from "../../../hooks/usePlayer";
import { selectCurrentShowFigures } from "../../../store/slices/LevelsSlice";
import { useSelector } from "react-redux";

import Preview from "./Preview/Preview";

interface myProps{
   tetrominoes : Tetromino[];
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

const Previews = ({gameStats, tetrominoes } :myProps ) => {
  const { level } = gameStats;
  const showFigures = useSelector(selectCurrentShowFigures);
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  return (
    <>
      {showFigures[level-1] && previewTetrominoes.map((tetromino, index) => (
          <Preview tetromino={tetromino} index={index} key={index} />
        ))}
      ''
    </>
    
      
    
  );
};

export default React.memo(Previews);