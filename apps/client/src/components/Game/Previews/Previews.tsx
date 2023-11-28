import React from "react";

import { Tetromino } from "../../../hooks/usePlayer";

import Preview from "./Preview/Preview";

interface myProps{
   tetrominoes : Tetromino[];
}

const Previews = ({ tetrominoes } :myProps ) => {
  const previewTetrominoes = tetrominoes
    .slice(1 - tetrominoes.length)
    .reverse();

  return (
    <>
      {previewTetrominoes.map((tetromino, index) => (
        <Preview tetromino={tetromino} index={index} key={index} />
      ))}
    </>
  );
};

export default React.memo(Previews);