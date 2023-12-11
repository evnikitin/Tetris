import { styled } from "@mui/material";

interface BoardProps {
   rows: number;
   columns: number;
   backgroundColor: string;
}

export const BoardStyled = styled('div')<BoardProps>(({ rows, columns, backgroundColor }) => ({
   margin: '2em auto',
   display: 'grid',
   gridGap: '2px',
   backgroundColor: `${backgroundColor}`, //'rgb(32, 0, 64)'
   border: `10px solid ${backgroundColor}`,
   borderRadius: '10px',
   boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
   gridTemplateRows: `repeat(${rows}, ${Math.floor(500/rows)}px)`,
   gridTemplateColumns: `repeat(${columns}, ${Math.floor(500/rows)}px)`
 }));