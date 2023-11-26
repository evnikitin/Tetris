import { Cell } from "../Cell";
import { BoardCellStyled, TetrominoSparkle} from "./BoardCellStyled";

export const BoardCell = ({ cell } : {cell: typeof Cell}) => (
   <BoardCellStyled color={cell.color}>
     <TetrominoSparkle/>
   </BoardCellStyled>
 );