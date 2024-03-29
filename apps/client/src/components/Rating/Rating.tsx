import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuItem, Select, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { PointsResult, TimesResult } from '../../store/slices/ApiSlices';
import { useGetPointsResultsMutation, useGetTimesResultsMutation } from '../../store/slices/ApiSlices';

type ResultType = PointsResult[] | TimesResult[];

export function Rating() {  
  const [category, setCategory] = useState('points');
  const [results, setResults] = useState<ResultType>();

  const [getPointsResults] = useGetPointsResultsMutation();
  const [getTimesResults] = useGetTimesResultsMutation();

  useEffect (() => {
    const fetchPointsData = async () => {  
      let data
      if (category === 'points') {
        data = await getPointsResults().unwrap();
      }else{
        data = await getTimesResults().unwrap();
      } 

      setResults(data);
      return data;
    }
    const result = fetchPointsData().catch(console.error);
    result
    .then((value) => 
      {
        if (Array.isArray(value)) {
          setResults(value)
      }      
    });   
    
  }, [category, getPointsResults,getTimesResults]);

/*   if(category === 'points') rows.sort((a, b) => b.value[0] - a.value[0]);
  else rows.sort((a, b) => b.value[1] - a.value[1]); */
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h3" gutterBottom>Рейтинг</Typography>
      <TableContainer elevation={3} component={Paper } style={{maxWidth: '800px', width: '100%'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell align="right">Имя</TableCell>
              <TableCell sx={{width:'350px'}} align="right">
                <Select value={category} onChange={(event) => setCategory(event.target.value)}>
                  <MenuItem value="points">Очки</MenuItem>
                  <MenuItem value="time">Время</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results?.map((result, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="right">{result.name}</TableCell>
                { category === 'points' ? <TableCell align="right">{(result as PointsResult).pointsRecord }</TableCell> : <TableCell align="right">{(result as TimesResult).timeRecord } с</TableCell>}                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
