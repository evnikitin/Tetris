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

export interface myType {
  tetrominoes: (typeof Cell)[];
}

export const Tetris = ({ settings, rows, columns, setGameOver } : {settings: UserSettings, rows: number, columns: number, setGameOver: SetGameOverFn}) => {
  const [gameStats, addLinesCleared, timeChange] = useGameStats(settings.level ,[10,100], [100,500], settings.variant);
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board] = useBoard({
    rows,
    columns,
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