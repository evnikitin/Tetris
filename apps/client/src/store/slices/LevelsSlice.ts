import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Board } from './ApiSlices';
import { Figure } from '../../components/Game/Game';

type LevelState = {
  board: Board | null;
  points: number[];
  tickes: number[];
  times: number[];
  figures: Figure[];
};

type RootState = {
   level: LevelState
};
const initialState: LevelState = {
   board: null,  // Assumes no board to begin with
   points: [],
   tickes: [],
   times: [],
   figures: []
 };
const levelSlice = createSlice({
  name: 'level',
  initialState: initialState,
  reducers: {
    setLevels:
    (state: LevelState, action: PayloadAction<{ board: Board , points: number[], tickes: number[], times: number[], figures: Figure[] }>) => {
      state.board = action.payload.board;
      state.points = action.payload.points;
      state.tickes = action.payload.tickes;
      state.times = action.payload.times;
      state.figures = action.payload.figures;
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
