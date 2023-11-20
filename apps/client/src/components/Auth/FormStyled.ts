import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Section = styled(Box)({
  width: '100%',
  height: '100%',
});

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(6),
  height: '100%',
}));

export const Card = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: theme.shadows[7],
  padding: theme.spacing(6),
  width: '100%',
  maxWidth: "400px",
  '& label': {
    fontSize: '15px',    
  },
  '& a': {
    marginLeft: '1em',
    textDecoration: 'none',
  },
}));