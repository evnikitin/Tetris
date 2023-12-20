import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

export function AddContainer() {
  const [height, setHeight] = React.useState(16);
  const [width, setWidth] = React.useState(8);
  const navigate = useNavigate();

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= 16 && value <= 36) {
      setHeight(value);
    }
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= 8 && value <= 16) {
      setWidth(value);
    }
  };

  const handleOutput = () => {
    //добавление в бд.
    navigate(-1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='90vh'
    >      
      <Paper elevation={3} sx={{width : '800px', display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center", padding: "40px"}}>
      <Typography variant='h3' mb={4}>Добавить стакан</Typography>
      <Grid container mb={2} direction="column" spacing={3}  sx={{width : '100%'}}>
        <Grid item container justifyContent="space-between" alignItems="center" sx={{padding: '0 20px'}}>
          <Typography variant='h4'>Высота стакана (16-24 клеток)</Typography>
          <TextField
            type="number"
            inputProps={{ min: 16, max: 24 }}
            value={height}
            onChange={handleHeightChange}
          />
        </Grid>
        <Grid item container justifyContent="space-between" alignItems="center" sx={{padding: '0 20px'}}>
          <Typography variant='h4'>Ширина стакана (8-16 клеток)</Typography>
          <TextField
            type="number"
            inputProps={{ min: 8, max: 16 }}
            value={width}
            onChange={handleWidthChange}
          />          
        </Grid> 
    </Grid>              
      <Button sx={{height: '50px', width: '200px', margin: '0 auto'}} variant="contained" onClick={handleOutput}>
        Добавить стакан
      </Button>
    </Paper>

    </Box>
  );
}