import { Box } from '@mui/material';
import { Cell } from '../Cell';
import { SetGameOverFn } from '../../../hooks/useGameOver'
import { useBoard } from '../../../hooks/useBoard';
import { Board } from '../Board/Board';
import { usePlayer } from '../../../hooks/usePlayer';
import { useGameStats } from '../../../hooks/useGameStats';
import GameController from '../GameController/GameController';
import GameStats from '../GameStats/GameStats';
import Previews from '../Previews/Previews';
import { UserSettings } from '../../../hooks/useSettings';
import { selectCurrentPoints, selectCurrentTimes, selectCurrentBoard } from '../../../store/slices/LevelsSlice';
import { useSelector } from 'react-redux';


export interface myType {
  tetrominoes: (typeof Cell)[];
}

export const Tetris = ({ settings, setGameOver } : {settings: UserSettings, setGameOver: SetGameOverFn}) => {  
  const boardValue = useSelector(selectCurrentBoard);
  const points = useSelector(selectCurrentPoints);
  const times = useSelector(selectCurrentTimes);
  const [gameStats, addLinesCleared, timeChange] = useGameStats(settings.level , times, points, settings.variant);
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board] = useBoard({
    rows: boardValue?.height !== undefined ? boardValue.height : 0,
    columns: boardValue?.width !== undefined ? boardValue.width : 0,
    player,
    resetPlayer,
    addLinesCleared
  });

    

  return (
    <Box display='flex' alignItems='end' gap={2}>
          <Box height='600px' display='flex' flexDirection='column' justifyContent='space-between'>
            <Previews tetrominoes={player.tetrominoes} /> 
            <GameStats gameStats={gameStats} timeChange = {timeChange} />
          </Box>          
          <Box position='relative'>
            <Board settings = {settings} board={board} />
            <GameController
              board={board}
              gameStats={gameStats}
              player={player}
              setGameOver={setGameOver}
              setPlayer={setPlayer}
            />
    </Box>
        </Box>
    
    
  );
};