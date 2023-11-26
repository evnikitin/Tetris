import { styled } from "@mui/material";

interface BoardCellProps {
  color?: string;
}

export const BoardCellStyled = styled('div')<BoardCellProps>(({ color }) => ({
  width: 'auto',
  borderRadius: '6px',
  position: 'relative',
  backgroundColor : `${color !=='gost' ? color : 'transparent'}`,
  border:  `${color !=='gost' ? '' : '2px solid rgba(255, 255, 255, 0.2)'}`

}));



export const TetrominoSparkle = styled('div')({
   position: 'absolute',
   zIndex: 10,
   width: '6px',
   height: '6px',
   left: '-2px',
   top: '-2px',
   backgroundColor: 'rgba(255, 255, 255, 0.4)',
   borderRadius: '4px 4px',
   opacity: '0',
 });