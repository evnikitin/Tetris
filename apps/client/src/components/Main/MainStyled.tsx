import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export const LinkStyled = styled(Link)(({ theme }) => ({
   display: 'inline-flex',
   justifyContent: 'center',
   alignItems: 'center',
   padding: theme.spacing(1.5, 3),
   borderRadius: '4px',
   width: '15vw',
   height: '3.5vh',
   fontSize: '1.5em',
   backgroundColor: theme.palette.primary.light,
   color: theme.palette.common.white,
   textDecoration: 'none',
   '&:hover': {
     backgroundColor: theme.palette.primary.main,
   },
 }));
 