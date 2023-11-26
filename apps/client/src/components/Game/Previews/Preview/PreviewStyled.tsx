import { styled } from "@mui/material";

export const PreviewStyled = styled('div')({
   background: 'rgba(0, 0, 0, 0.1)',
   border: '10px solid rgba(0, 0, 0, 0)',
   borderRadius: '10px',
   margin: '25px 0',
});

export const PreviewBoard  = styled('div')({
   display: 'grid',
   gridGap: '2px',
   gridTemplateRows: 'repeat(4, 1fr)',
   gridTemplateColumns: 'repeat(4, 1fr)',
   width: '100px',
   height: '100px',
 });

