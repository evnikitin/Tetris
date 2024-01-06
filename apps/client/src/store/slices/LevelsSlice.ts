import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateBoard } from './ApiSlices';
import { Figure } from '../../components/Game/Game';

type LevelState = {
  board: CreateBoard | null;
  points: number[];
  tickes: number[];
  times: number[];
  figures: Figure[][];
  grids: boolean[];
  showFigures: boolean[];
};

type RootState = {
   level: LevelState
};
const initialState: LevelState = {
   board: null,  // Assumes no board to begin with
   points: [],
   tickes: [],
   times: [],
   figures: [],
   grids: [],
   showFigures: [],
 };
const levelSlice = createSlice({
  name: 'level',
  initialState: initialState,
  reducers: {
    setLevels:
    (state: LevelState, action: PayloadAction<{ board: CreateBoard , points: number[], tickes: number[], times: number[], figures: Figure[][], grids: boolean[], showFigures: boolean[] }>) => {
      state.board = action.payload.board;
      state.points = action.payload.points;
      state.tickes = action.payload.tickes;
      state.times = action.payload.times;
      state.figures = action.payload.figures;
      state.grids = action.payload.grids;
      state.showFigures = action.payload.showFigures;
    },
    
  },
});

export const { setLevels } = levelSlice.actions;

export default levelSlice.reducer;

export const selectCurrentBoard = (state: RootState) => state.level.board;
export const selectCurrentFigures = (state: RootState) => state.level.figures;
export const selectCurrentTickes = (state: RootState) => state.level.tickes;
export const selectCurrentPoints = (state: RootState) => state.level.points;
export const selectCurrentTimes = (state: RootState) => state.level.times;
export const selectCurrentGrids = (state: RootState) => state.level.grids;
export const selectCurrentShowFigures = (state: RootState) => state.level.showFigures;
