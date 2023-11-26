import { Action } from "./input";
import { Board } from "../components/Game/Board/Board";
import { Player, Position } from "../hooks/usePlayer";
import { SetGameOverFn } from "../hooks/useGameOver";
import { rotate } from "./tetrominous";
import { hasCollision, isWithinBoard } from "./board";

export interface PlayerController{
   action: Action,
   board: Board,
   player: Player,
   setPlayer: React.Dispatch<React.SetStateAction<Player>>,
   setGameOver: SetGameOverFn
}




const attemptRotation = ({ board, player, setPlayer } : {board: Board, player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>}) => {
  const shape = rotate({
    piece: player.tetromino?.shape,
    direction: 1
  });

  const position = player.position;
  const isValidRotation =
    isWithinBoard({ board, position, shape }) &&
    !hasCollision({ board, position, shape });

  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player?.tetromino,
        shape
      }
    });
  } else {
    return false;
  }
};

export const movePlayer = ({ delta, position, shape, board } : {delta : { row: number, column: number }, position: Position, shape: number[][], board: Board}) => {
   const desiredNextPosition = {
     row: position.row + delta.row,
     column: position.column + delta.column
   };
 
   const collided = hasCollision({
     board,
     position: desiredNextPosition,
     shape
   });
 
   const isOnBoard = isWithinBoard({
     board,
     position: desiredNextPosition,
     shape
   });
 
   const preventMove = !isOnBoard || (isOnBoard && collided);
   const nextPosition = preventMove ? position : desiredNextPosition;
 
   const isMovingDown = delta.row > 0;
   const isHit = isMovingDown && (collided || !isOnBoard);
 
   return { collided: isHit, nextPosition };
 };

const attemptMovement = ({ board, action, player, setPlayer, setGameOver } : {board: Board, action: Action, player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setGameOver: SetGameOverFn}) => {
   const delta = { row: 0, column: 0 };
   let isFastDropping = false;
 
   if (action === Action.FastDrop) {
     isFastDropping = true;
   } else if (action === Action.SlowDrop) {
     delta.row += 1;
   } else if (action === Action.Left) {
     delta.column -= 1;
   } else if (action === Action.Right) {
     delta.column += 1;
   }
 
   const { collided, nextPosition } = movePlayer({
     delta,
     position: player.position,
     shape: player.tetromino.shape,
     board
   });
 
   const isGameOver = collided && player.position.row === 0;
   if (isGameOver) {
     setGameOver(isGameOver);
   }
   console.log(isFastDropping)
 
   setPlayer({
     ...player,
     collided,
     isFastDropping,
     position: nextPosition
   });
 };

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver
} : PlayerController) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  } else {
   attemptMovement({ board, player, setPlayer, action, setGameOver });
 }
};