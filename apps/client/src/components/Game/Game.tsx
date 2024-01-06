/* eslint-disable prefer-const */
import React from 'react'
import { Play } from './Play/Play'
import { UserSettings } from '../../hooks/useSettings'
import { useEffect } from 'react';
import { Level, useGetLevelsMutation } from '../../store/slices/ApiSlices';
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
  figures: Figure[][],
  points: number[],
  times: number[],
  tickes: number[],
  grids: boolean[],
  showFigures: boolean[]
}

function compareLevels(a: Level, b: Level) {
  if (a.name === "EASY") {
    return -1;
  } else if (a.name === "MID") {
    if (b.name === "EASY") {
      return 1;
    } else if (b.name === "DIFFICULT") {
      return -1;
    }
  } else if (a.name === "DIFFICULT") {
    return 1;
  }
  
  return 0;
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
      const figures: Figure[][] = [];
      const levels: AdminSettings = {
        board: {width: 0, height: 0}, 
        points: [],
        tickes: [],
        times: [],
        figures: [],
        grids: [],
        showFigures: [],
      };
      let result = await getLevels().unwrap();
      
      const colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink"];
      let index = 0;
      const new_arr = JSON.parse(JSON.stringify(result)) as Level[];
      new_arr.sort(compareLevels).forEach(level => {     
        figures[index] = figures[index] || [];
        level.figures.forEach((f,i)=>{
          const colorIndex = i % colors.length; 
          const color = colors[colorIndex];
          figures[index].push({shape: numberToMatrix(f.shape), color: color})
        })
        levels.points.push(level.points);
        levels.tickes.push(level.tick);
        levels.times.push(level.time);
        levels.grids.push(level.isGridShown);
        levels.showFigures.push(level.isNextFigureShown);
        index++;
      })
      levels.board = { height: new_arr[settings.level-1].board.height, width: new_arr[settings.level-1].board.width}
      levels.figures=figures;
      console.log(result);
      console.log(levels);
      dispatch(setLevels(levels));
    }   
    fetchLevels().catch(console.error);
  },[getLevels , dispatch]);
  return (
    <Play settings={settings} />
  )
}