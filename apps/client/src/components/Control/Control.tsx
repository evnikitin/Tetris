import {  Box, Grid, Paper, Typography } from '@mui/material';
import { ArrowBack, ArrowDownward, ArrowForward, ArrowUpward, SpaceBar} from '@mui/icons-material';
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
      <Paper elevation={3} sx={{width : '800px', padding: '20px 0' ,display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center"}}>
      <Typography variant='h3' gutterBottom>Управление</Typography>
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item container justifyContent="space-evenly" alignItems="center">
          <Grid item ml={1} xs={1}>
            <Icon sx={{ fontSize: 80 }}>{<ArrowBack/>}</Icon>
         </Grid>                  
          <Grid item xs={10}>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>Переместить фигуру влево </Typography>   
         </Grid>   
        </Grid>
        <Grid item container justifyContent="space-evenly" alignItems="center">
          <Grid item ml={1} xs={1}>
            <Icon sx={{ fontSize: 80 }}>{<ArrowDownward/>}</Icon>
         </Grid>                  
          <Grid item xs={10}>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Ускорить падение фигуры</Typography>
         </Grid>   
        </Grid>
        <Grid item container justifyContent="space-evenly" alignItems="center">
          <Grid item ml={1} xs={1}>
            <Icon sx={{ fontSize: 80 }}>{<ArrowForward/>}</Icon>
          </Grid>                  
          <Grid item xs={10}>
           <Typography variant='h4' sx={{ textAlign: 'center' }}>Переместить фигуру вправо</Typography>
          </Grid>   
        </Grid>
        <Grid item container justifyContent="space-evenly" alignItems="center">
          <Grid item ml={1} xs={1}>
          <Icon sx={{ fontSize: 80 }}>{<ArrowUpward/>}</Icon>
          </Grid>                  
          <Grid item xs={10}>
          <Typography variant='h4' sx={{ textAlign: 'center' }}>Поворот фигуры по часовой стрелке</Typography>
          </Grid>   
        </Grid>
        <Grid item container justifyContent="space-evenly" alignItems="center">
          <Grid item ml={1} xs={1}>
            <Icon sx={{ fontSize: 80 }}>{<SpaceBar/>}</Icon>
          </Grid>                  
          <Grid item xs={10}>
            <Typography variant='h4' sx={{ textAlign: 'center' }}>Сбросить фигуру вниз</Typography>
          </Grid>   
        </Grid>
      </Grid>
    </Paper>

    </Box>
    
      
  );
}