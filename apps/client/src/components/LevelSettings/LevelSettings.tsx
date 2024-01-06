import { Box, Paper, Typography, RadioGroup, FormControlLabel, Radio, Button , Grid, TextField, Switch, Select, MenuItem, SelectChangeEvent} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetBoardsMutation, useGetLevelQuery, useUpdateLevelMutation} from '../../store/slices/ApiSlices';

export interface Option{
  value: string,
  label: string
}

export const LevelSettings = () => {
  const [getBoards] = useGetBoardsMutation();
  const [updateLevel] = useUpdateLevelMutation();
  useEffect( ()=>{
    const fetchBoards = async () => {        
      const result = await getBoards().unwrap()
      const optionBoards: Option[] = [];
      result.forEach((board) => optionBoards.push({value: board.id, label:`${board.height} x ${board.width}`}));
      setBoards(optionBoards); 
      
    }
   
    fetchBoards().catch(console.error);

  }, [getBoards])
    

  const [level, setLevel] = useState<string>('EASY');
  const { data } = useGetLevelQuery(`${level}`);
  console.log(data);
  const [boards, setBoards] = useState<Option[]>();
  const [sizeContainer, setSizeContainer] = useState<string>(data?.board === undefined ? "" : data.board.id);  
  const [tick, setTick] = useState<number>( 0 );
  const [time, setTime] = useState<number>( 0 );
  const [points, setPoints] = useState<number>( 0 );
  const [nextFigureVisibility, setNextFigureVisibility] = useState<boolean>(true);
  const [gridVisibility, setGridVisibility] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, определены ли данные
    if (data) {
      setSizeContainer(data.board.id);
      setTime(data.time ?? 0);
      setPoints(data.points ?? 0); 
      setTick(data.tick ?? 0);
      setNextFigureVisibility(data.isNextFigureShown);
      setGridVisibility(data.isGridShown);
    }
  }, [data]);
  
  const [TickError, setTickError] = useState<string>("");
    
  const handleChangeSizeContainer = (event: SelectChangeEvent<string>) => {
    setSizeContainer(event.target.value);
  };

  const handleChangeTick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTick(Number(event.target.value));
  };

  const handleChangePoints = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(event.target.value));
  };

  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(Number(event.target.value));
  };

  const handleSaveSettings = async() => {
    if ( tick <= 1000 && tick >= 500) {
      setTickError("");
      await updateLevel({
        name: level,
        boardId: sizeContainer,
        points: points,
        time: time,
        tick: tick,
        isGridShown: gridVisibility,
        isNextFigureShown: nextFigureVisibility
      })

      console.log({
        name: level,
        id: sizeContainer,
        points: points,
        time: time,
        tick: tick,
        isGridShown: gridVisibility,
        isNextFigureShown: nextFigureVisibility
      })
      navigate(-1);  
    } else {
      setTickError("Тик выходит за пределы диапазона 500-1000")
    } 
    console.log(tick)   
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
               <RadioGroup value={level} onChange={(e)=>{setLevel(e.target.value);}}>
                  <FormControlLabel value="EASY" control={<Radio />} label="Первый уровень" />
                  <FormControlLabel value="MID" control={<Radio />} label="Второй уровень" />
                  <FormControlLabel value="DIFFICULT" control={<Radio />} label="Третий уровень" />
               </RadioGroup>             
            </Box>  
            <Typography gutterBottom fontWeight='bold'>Игровой стакан</Typography>
            <Typography>Выберете размерность стакана</Typography>      
            <Grid item container justifyContent="flex-start" alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant='h6'>Выберите стакан</Typography>
                  </Grid> 
                  <Grid item xs={2}>
                  <Select value={sizeContainer} onChange={handleChangeSizeContainer}>
                    {boards?.map((option) => (
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
                  <Grid item xs={9}>
                    <Typography variant='h6'>Значение тика (время между перемещениями фигуры)</Typography>
                    <Typography color='red'>{TickError}</Typography>
                  </Grid>                  
                  <Grid item xs={2}>
                  <TextField
                    type="number"
                    size="small"
                    onChange={handleChangeTick}
                  />       
                  </Grid>
                  <Grid  item xs={1}>
                    <Typography  textAlign="center">мс</Typography>
                  </Grid>     
                </Grid>
                <Grid item container justifyContent="flex-start" alignItems="center">
                  <Grid item xs={9}>
                    <Typography variant='h6'>Количество очков для перехода на новый уровень</Typography>
                  </Grid> 
                  <Grid item xs={2}>
                    <TextField
                      type="number"
                      size="small"
                      onChange={handleChangePoints}
                    />      
                  </Grid>                        
                </Grid>
                <Grid item container mb={2} justifyContent="flex-start" alignItems="center">
                  <Grid item xs={9}>
                    <Typography variant='h6'>Время для перехода на новый уровень</Typography>
                  </Grid> 
                  <Grid item xs={2}>
                    <TextField
                      type="number"
                      size="small"
                      onChange={handleChangeTime}
                    />      
                  </Grid>
                  <Grid  item xs={1}>
                    <Typography  textAlign="center">секунд</Typography>
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