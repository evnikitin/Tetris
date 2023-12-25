import React from 'react'
import { Play } from './Play/Play'
import { UserSettings } from '../../hooks/useSettings'
import { useEffect } from 'react';
import { useGetLevelsMutation } from '../../store/slices/ApiSlices';
import { useDispatch } from 'react-redux';
import { CreateBoard } from '../../store/slices/ApiSlices';
import { setLevels } from '../../store/slices/LevelsSlice';

interface GameProps {
  settings: UserSettings
}

export interface Figure {
  shape: number[][],
  color: string
}

export interface AdminSettings{
  board: CreateBoard;
  figures: Figure[],
  points: number[],
  times: number[],
  tickes: number[]
}

function numberToMatrix(num: number): number[][] {
  const matrix: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  const binaryString = num.toString(2).padStart(16, '0');
  for (let i = 0; i < 16; i++) {
    const row = Math.floor(i / 4);
    const col = i % 4;
    matrix[row][col] = parseInt(binaryString[i], 10);
  }
  return matrix;
}

export const Game = ( {settings} : GameProps) => {
  const [getLevels] = useGetLevelsMutation();
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchLevels = async () => {  
      const levels: AdminSettings = {
        board: {width: 0, height: 0}, 
        points: [],
        tickes: [],
        times: [],
        figures: []
      };
      const result = await getLevels().unwrap();
      levels.board = { height: result[settings.level-1].board.height, width: result[settings.level-1].board.width}
      result.forEach(level => {
        levels.points.push(level.points);
        levels.tickes.push(level.tick);
        levels.times.push(level.time);
      })
      console.log(result);
      console.log(levels);
      //dispatch(setLevels(levels));
    }   
    fetchLevels().catch(console.error);
  },[getLevels , dispatch]);
  return (
    <Play settings={settings} />
  )
}