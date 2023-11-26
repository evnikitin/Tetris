import { styled } from "@mui/material";

export const GameStatsStyled = styled('ul')({
   width: '100px',
   listStyleType: 'none',
   color: 'rgba(29, 8, 8, 0.5)',
   textAlign: 'end',
   padding: '0',

   '& li:nth-child(even)': {
      fontSize: '2.8rem',
      marginBottom: '0.5em',
    },

 });