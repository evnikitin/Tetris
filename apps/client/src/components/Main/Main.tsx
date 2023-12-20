import React from 'react';
import {  Grid, Typography, Paper, Box } from '@mui/material';
import { LinkStyled } from './MainStyled';
import { useSelector } from 'react-redux';
import { selectCurrentUser, logOut } from '../../store/slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../store/slices/ApiSlices';


export const Main = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const clickButtonHandler = async () => {
    await logout().unwrap();
    dispatch(logOut());
    console.log("Нажал")
  };

  console.log(user?.role)

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
          {user?.role === undefined  ? <Grid item>
            <LinkStyled to="/login">Войти в аккаунт</LinkStyled>
          </Grid> : <Grid item>
            <LinkStyled onClick={clickButtonHandler} to="/">Выйти из аккаунта</LinkStyled>
          </Grid>
          }     
          
          <Grid item>
            <LinkStyled to="/game">Играть</LinkStyled>
          </Grid>
          <Grid item>
            <LinkStyled to="/settings">Настройка игры</LinkStyled>
          </Grid>
          <Grid item>
            <LinkStyled to="/rating">Рейтинг</LinkStyled>
          </Grid>
          {user?.role === "ADMIN" && 
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
