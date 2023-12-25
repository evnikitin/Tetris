import React, { useState } from 'react';
import { Box, Button, FormControlLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useGetFiguresMutation, useAddFiguresMutation } from '../../store/slices/ApiSlices';

type CellType = 0 | 1;

type FigureType = CellType[][];

const TetrisFigure = ({ figure, handleCellClick }: {
  figure: FigureType;
  handleCellClick: (row: number, col: number) => void;
}) => {
  return (
    <Grid container spacing={0} width='400px' height='400px'>
      {figure.map((row, rowIndex) => (
        <Grid key={rowIndex} container item xs={12} spacing={0}>
          {row.map((cell, colIndex) => (
            <Grid key={colIndex} item xs={3} height='100px' sx={{border: '1px #000 solid'}}>
              <Paper
                onClick={() => handleCellClick(rowIndex, colIndex)}
                elevation={cell === 1 ? 3 : 0}
                style={{
                  backgroundColor: cell === 1 ? '#82a9e8' : '#ccd6e6',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

function matrixToNumber(matrix: number[][]): number {
  let binaryString = '';
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      binaryString += matrix[row][col];
    }
  }
  return parseInt(binaryString, 2);
}


export const AddFigure = () => {
  const [getFigures] = useGetFiguresMutation();
  const [addFigures] = useAddFiguresMutation();
  const [figure, setFigure] = useState<FigureType>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [selectedValue, setSelectedValue] = useState<string>('EASY');
  const [error, setError] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleCellClick = (row: number, col: number) => {
    setError('');
    const updatedFigure = [...figure];
    updatedFigure[row][col] = updatedFigure[row][col] === 1 ? 0 : 1;
    setFigure(updatedFigure);

  };

  const handleAddFigure = async() => {
    try{
      const isIntact = isFigureIntact();
      if (isIntact) {
       const shape =   matrixToNumber(figure);
       const res = await addFigures({levelName: selectedValue, shape})
       console.log(res);
       const result = await getFigures().unwrap();
       console.log(result);
      }
      else setError('Фигура нецелостная')
    } catch (err) {
      setError((err as Error).message);
    }
   
  };

  const isFigureIntact = () => {
   const rows = figure.length;
   const cols = figure[0].length;
   
   let filledCells = [];
   for (let row = 0; row < rows; row++) {
     for (let col = 0; col < cols; col++) {
       if (figure[row][col] === 1) {
         filledCells.push([row, col]);
       }
     }
   }   
 
   const clusters = [];
   while (filledCells.length > 0) {
     const cluster = [filledCells.pop()];
     let index = 0;
 
     while (index < cluster.length) {
       const cell = cluster[index];
       filledCells = filledCells.filter(otherCell => {
         if (cell !== undefined && (
           (otherCell[0] === cell[0] && Math.abs(otherCell[1] - cell[1]) === 1) ||
           (otherCell[1] === cell[1] && Math.abs(otherCell[0] - cell[0]) === 1)
         )) {
           cluster.push(otherCell);
           return false;
         } else {
           return true;
         }
       }); 
       index++;
     }
     clusters.push(cluster);
   }
 
   return clusters.length === 1;
 };

  return (
   <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='90vh'
    >      
      <Paper elevation={3} sx={{width : '800px', display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center", padding: "40px 0"}}>
         <Typography variant='h3' mb={4}>Добавить фигуру</Typography>
         <TetrisFigure figure={figure} handleCellClick={handleCellClick} />
         <p>{error}</p>
         <Box >
            <Typography fontWeight='bold'>Уровень сложности игры</Typography>
            <Typography>Выберите уровень, на котором эта фигура появляется</Typography>
            <Box display='flex' justifyContent='space-between' alignItems='flex-end'>               
               <RadioGroup value={selectedValue} onChange={handleChange}>
                  <FormControlLabel value="EASY" control={<Radio />} label="Первый уровень" />
                  <FormControlLabel value="MID" control={<Radio />} label="Второй уровень" />
                  <FormControlLabel value="DIFFICULT" control={<Radio />} label="Третий уровень" />
               </RadioGroup>
               <Button sx={{height: '50px'}} variant="contained" onClick={handleAddFigure}>
                  Добавить фигуру
               </Button>
            </Box>
            
            
         </Box>
         
         
      </Paper>
   </Box>   
  );
};
