import React from 'react'
import { Cell } from '../Cell';
import { BoardCell } from '../BoardCell/BoardCell';
import { BoardStyled } from './BoardStyled';
import { UserSettings } from '../../../hooks/useSettings';

export interface Board{
  rows: (typeof Cell)[][],
  size: {rows: number, columns: number}
}

export interface BoardProps{
  board : Board,  
  settings: UserSettings
}

export const Board = ({ board, settings } : BoardProps) => {  
    return (
      <BoardStyled backgroundColor={settings.color} rows={board.size.rows} columns={board.size.columns}>
        {board.rows.map((row, y) =>
          row.map((cell, x) => (
            <BoardCell key={x * board.size.columns + x} cell={cell} gridVisibility={settings.gridVisibility}/>
          ))
        )}
      </BoardStyled>
    );
}
