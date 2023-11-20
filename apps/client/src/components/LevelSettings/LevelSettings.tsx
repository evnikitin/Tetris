import { Box, Paper, Typography, RadioGroup, FormControlLabel, Radio, Button , Grid, TextField, Switch, Select, MenuItem, SelectChangeEvent} from '@mui/material'
import React, { useState } from 'react'

export const LevelSettings = () => {
  const [selectedValue, setSelectedValue] = useState<string>('1');
  const [nextFigureVisibility, setNextFigureVisibility] = useState<boolean>(true);
  const [gridVisibility, setGridVisibility] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: '8 x 16', label: '8 x 16' },
    { value: '10 x 20', label: '10 x 20' },
    { value: '9 x 30', label: '9 x 30' },
  ];

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleSaveSettings = () => {
    //
  };
  const handleChangeNextFigureVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNextFigureVisibility(event.target.checked );
   };
  const handleChangeGridVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGridVisibility(event.target.checked);
   };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='90vh'
    >      
      <Paper elevation={3} sx={{width : '800px', display:"flex", flexDirection:"column", alignItems:"flex-start", padding: "40px"}}>
         <Box >
          <Typography variant='h5' fontWeight='bold'>Настройки уровней сложности</Typography>
            <Typography mb={2}>Настройте уровень сложности так, как считаете нужным</Typography>
            <Typography fontWeight='bold'>Уровень для настройки</Typography>
            <Typography>Выберите уровень, настройки которого хотите изменить</Typography>
            <Box display='flex' justifyContent='space-between' alignItems='flex-end'>               
               <RadioGroup value={selectedValue} onChange={(e)=>{setSelectedValue(e.target.value);}}>
                  <FormControlLabel value="1" control={<Radio />} label="Первый уровень" />
                  <FormControlLabel value="2" control={<Radio />} label="Второй уровень" />
                  <FormControlLabel value="3" control={<Radio />} label="Третий уровень" />
               </RadioGroup>             
            </Box>  
            <Typography gutterBottom fontWeight='bold'>Игровой стакан</Typography>
            <Typography>Выберете размерность стакана</Typography>      
            <Grid item container justifyContent="flex-start" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant='h6'>Выберите стакан</Typography>
                  </Grid> 
                  <Grid item xs={2}>
                  <Select value={selectedOption} onChange={handleChange}>
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>  
                  </Grid>
              </Grid>                   
              <Typography gutterBottom fontWeight='bold'>Игровые значения</Typography>
              <Typography mb={2}>Введите значаения скорости, очков и времени</Typography>     
              <Grid  container direction="column" spacing={3}  sx={{width : '100%'}}>
                <Grid item container justifyContent="flex-start" alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant='h6'>Значение тика (время между двумя перемещениями фигуры)</Typography>
                  </Grid>                  
                  <Grid item xs={2}>
                  <TextField
                    type="number"
                    size="small"
                  />       
                  </Grid> 
                </Grid>
                <Grid item container justifyContent="flex-start" alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant='h6'>Количество очков для перехода на новый уровень</Typography>
                  </Grid> 
                  <Grid item xs={2}>
                    <TextField
                      type="number"
                      size="small"
                    />      
                  </Grid>                        
                </Grid>
                <Grid item container mb={2} justifyContent="flex-start" alignItems="center">
                  <Grid item xs={10}>
                    <Typography variant='h6'>Время для перехода на новый уровень</Typography>
                  </Grid> 
                  <Grid item xs={2}>
                    <TextField
                      type="number"
                      size="small"
                    />      
                  </Grid>                        
                </Grid>
              </Grid> 
              <Typography gutterBottom fontWeight='bold'>Следующая фигура и сетка</Typography>
              <Typography>Выберите: показывать ли следующую игровую фигуру и сетку</Typography>
              <Typography mb={1}>если она доступна</Typography>      
              <Grid  container direction="column" spacing={3}  sx={{width : '100%'}}>
                <Grid item container justifyContent="flex-start" alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant='h6'>Отображение следующей фигуры</Typography>
                  </Grid>                  
                  <Grid item>
                      <Switch
                          checked={nextFigureVisibility}
                          onChange={handleChangeNextFigureVisibility}
                          inputProps={{ 'aria-label': 'controlled' }}
                          name="checked"
                        />      
                  </Grid> 
                </Grid>
                <Grid item container mb={2} justifyContent="flex-start" alignItems="center">
                  <Grid item xs={8}>
                    <Typography variant='h6'>Отображение сетки</Typography>
                  </Grid> 
                  <Grid item>
                    <Switch
                        checked={gridVisibility}
                        onChange={handleChangeGridVisibility}
                        inputProps={{ 'aria-label': 'controlled' }}
                        name="checked"
                      />      
                  </Grid>                        
                </Grid>
                <Button sx={{height: '50px', width: '200px', margin: '0 auto'}} variant="contained" onClick={handleSaveSettings}>
                  Сохранить
                </Button>  
              </Grid>           
                         
         </Box>
         
         
      </Paper>
   </Box>   
  )
}