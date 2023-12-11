import React from "react";

import { buildBoard } from "../../../../utils/board";
import { transferToBoard } from '../../../../utils/tetrominous';

import { Tetromino } from "../../../../hooks/usePlayer";

import { BoardCell } from "../../BoardCell/BoardCell";
import { PreviewStyled, PreviewBoard } from "./PreviewStyled";

const Preview = ({ tetromino, index } : {tetromino : Tetromino, index: number}) => {
  const { shape, color } = tetromino;

  const board = buildBoard({ rows: 4, columns: 4 });

  board.rows = transferToBoard({
    color: String(color),
    isOccupied: false,
    position: { row: 0, column: 0 },
    rows: board.rows,
    shape
  });

  return (
    <PreviewStyled>
      <PreviewBoard>
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell}  gridVisibility = {false}/>
          ))
        )}
      </PreviewBoard>
    </PreviewStyled>
  );
};

export default React.memo(Preview);