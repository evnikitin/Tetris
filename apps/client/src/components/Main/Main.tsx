import React from 'react';
import {  Grid, Typography, Paper, Box } from '@mui/material';
import { LinkStyled } from './MainStyled';

enum Roles{
  admin= "ADMIN",
  user= "USER"
  
}

export const Main = () => {
  const role :string = Roles.admin // будет получение роли админа
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='80vh'
    >
      <Paper elevation={3} sx={{width : '800px', display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
        <Grid container spacing={2} height='100vh' justifyContent='center' alignItems='center' direction="column">
          <Typography variant='h2'>Тетрис</Typography>
          <Grid item>
            <LinkStyled to="/login">Войти в аккаунт</LinkStyled>
          </Grid>
          <Grid item>
            <LinkStyled to="/game">Играть</LinkStyled>
          </Grid>
          <Grid item>
            <LinkStyled to="/settings">Настройка игры</LinkStyled>
          </Grid>
          <Grid item>
            <LinkStyled to="/rating">Рейтинг</LinkStyled>
          </Grid>
          {role === "ADMIN" && 
          <>
            <Grid item>
              <LinkStyled to="/container">Добавить стакан</LinkStyled>
            </Grid>
            <Grid item>
              <LinkStyled to="/figure">Добавить фигуру</LinkStyled>
            </Grid>
            <Grid item>
              <LinkStyled to="/level">Настройка уровней</LinkStyled>
            </Grid>
          </>}        
          
          <Grid item>
            <LinkStyled to="/control">Управление</LinkStyled>
          </Grid>
          <Grid item>
            <LinkStyled to="/system">О системе</LinkStyled>
          </Grid>
          <Grid item>
            <LinkStyled to="/developers">О разработчиках</LinkStyled>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Main;
