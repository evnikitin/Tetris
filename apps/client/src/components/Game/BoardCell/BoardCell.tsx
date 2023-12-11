import { Cell } from "../Cell";
import { BoardCellStyled, TetrominoSparkle} from "./BoardCellStyled";

export const BoardCell = ({ cell, gridVisibility } : {cell: typeof Cell, gridVisibility: boolean}) => (
   <BoardCellStyled gridVisibility={gridVisibility} color={cell.color}>
     <TetrominoSparkle/>
   </BoardCellStyled>
 );