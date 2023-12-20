import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';

export function AboutDevelopers() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='90vh'
    >
      <Paper elevation={3} sx={{width : '800px', display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center", padding: "40px 0"}}>
        <Typography variant="h2" gutterBottom>О разработчиках</Typography>
        <Typography variant="h4" >Самарский университет</Typography>
        <Typography variant="h4" mb={2}>Кафедра программных систем</Typography>
        <Typography variant="h5" mb={3}>Курсовой проект по дисциплине «Программная инженерия»</Typography>
        <Typography variant="h5" >Тема проекта: «Автоматизированная система «Игра в «Тетрис»</Typography>
        <Typography variant="h5" mb={3}>с функциями администратора»</Typography>
        <Typography variant="h5" >Разработчики ( обучающиеся группы 6414-020302D )</Typography>
        <Typography variant="h5" >Никитин Е.В</Typography>
        <Typography variant="h5" mb={3}>Нефедов Л.А</Typography>
        <Typography variant="h5">Преподаватель: Доцент кафедры ПС</Typography>
        <Typography variant="h5" mb={3}> Зеленко Л.С</Typography>
        <Typography variant="h6" >Самара 2023</Typography>
      </Paper>
    </Box>
      
      
      

  );
}