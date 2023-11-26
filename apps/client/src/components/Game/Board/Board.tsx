import React from 'react'
import { Cell } from '../Cell';
import { BoardCell } from '../BoardCell/BoardCell';
import { BoardStyled } from './BoardStyled';

export interface Board{
  rows: (typeof Cell)[][],
  size: {rows: number, columns: number}
}

export interface BoardProps{
  board : Board,  
}

export const Board = ({ board } : BoardProps) => {  
    return (
      <BoardStyled rows={board.size.rows} columns={board.size.columns}>
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} />
          ))
        )}
      </BoardStyled>
    );
}
