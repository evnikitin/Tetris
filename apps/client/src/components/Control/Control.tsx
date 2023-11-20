import {  Box, Grid, Paper, Typography } from '@mui/material';
import { ArrowBack, ArrowDownward, ArrowForward, ArrowUpward, SpaceBar, SubdirectoryArrowLeftRounded} from '@mui/icons-material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';


function Icon({children, ...props}: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      {children}
    </SvgIcon>
  );
}

export function Control() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='90vh'
    >      
      <Paper elevation={3} sx={{width : '800px', display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
      <Typography variant='h3' gutterBottom>Управление</Typography>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <Icon sx={{ fontSize: 80 }}>{<ArrowBack/>}</Icon>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Переместить фигуру влево </Typography>
        </Grid>
        <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <Icon sx={{ fontSize: 80 }}>{<ArrowDownward/>}</Icon>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Ускорить падение фигуры</Typography>
        </Grid>
        <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <Icon sx={{ fontSize: 80 }}>{<ArrowForward/>}</Icon>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Переместить фигуру вправо</Typography>
        </Grid>
        <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <Icon sx={{ fontSize: 80 }}>{<ArrowUpward/>}</Icon>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Поворот фигуры по часовой стрелке</Typography>
        </Grid>
        <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <Icon sx={{ fontSize: 80 }}>{<SpaceBar/>}</Icon>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Сбросить фигуру вниз</Typography>
        </Grid>
        <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px'}}>
          <Icon sx={{ fontSize: 80 }}>{<SubdirectoryArrowLeftRounded/>}</Icon>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Начать игру</Typography>
        </Grid>        
      </Grid>
    </Paper>

    </Box>
    
      
  );
}