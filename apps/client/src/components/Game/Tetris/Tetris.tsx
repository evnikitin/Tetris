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
import { useEffect, useState } from 'react';

export interface myType {
  tetrominoes: (typeof Cell)[];
}

export const Tetris = ({ rows, columns, setGameOver } : {rows: number, columns: number, setGameOver: SetGameOverFn}) => {
  const [gameStats, addLinesCleared] = useGameStats();
  const [time, setTime] = useState<number>(0);
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time, setTime]);  

  return (
    <Box display='flex' alignItems='end' gap={2}>
          <Box height='600px' display='flex' flexDirection='column' justifyContent='space-between'>
            <Previews tetrominoes={player.tetrominoes} /> 
            <GameStats gameStats={gameStats} />
          </Box>          
          <Box position='relative'>
            <Board board={board} />
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