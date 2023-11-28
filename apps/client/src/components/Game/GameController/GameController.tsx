import { Action, actionForKey } from "../../../utils/input";

import { Board } from "../Board/Board";
import { GameStats } from "../../../hooks/useGameStats";
import { Player } from "../../../hooks/usePlayer";
import { SetGameOverFn } from "../../../hooks/useGameOver";
import { InputStyled } from "./GameControllerStyled";
import { playerController } from "../../../utils/PlayerController";

import { useInterval } from "../../../hooks/useInterval";
import { useDropTime } from "../../../hooks/useDropTime";
import { useRef } from "react";

export interface GameController{
   board: Board,
   gameStats: GameStats,
   player: Player,
   setGameOver: SetGameOverFn,
   setPlayer: React.Dispatch<React.SetStateAction<Player>>
}

const times = [1000,800,500];


const GameController = ({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer
}: GameController) => {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats, times
  });


  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleBlur = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);
 
  const onKeyUp = ({ code } : {code: string} ) => {
    const action = actionForKey(code);
   
  if (action === Action.Quit) {
      setGameOver(true);
    }
  };

  const onKeyDown = ({ code } : {code: string}) => {
    const action = actionForKey(code);

    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      } else {
        resumeDropTime();
      }
    } else if (action === Action.Quit) {
      setGameOver(true);
    } else {
      /* if (actionIsDrop(action)) pauseDropTime(); */
      if (!dropTime) {
        return;
      }
      handleInput({ action });
    }
  };

  const handleInput = ({ action } : {action: Action}) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver
    });
  };

  return (
    <InputStyled
      ref={inputRef}
      onBlur={handleBlur}
      type="text"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
};

export default GameController;
