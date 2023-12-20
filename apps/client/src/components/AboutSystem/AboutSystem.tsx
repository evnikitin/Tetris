import { Box, Link, CardContent, CardMedia, List, ListItem, Paper, Typography, IconButton } from '@mui/material'
import React from 'react';
import { ArrowUpward} from '@mui/icons-material';

const AnchorLink = ({ to, children } : {to: string, children: string} ) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetElement = document.getElementById(to);
    targetElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Link sx={{fontSize: '20px'}} href={`#${to}`} target="_blank" rel="noopener noreferrer" underline="none" onClick={handleClick}>
      {children}
    </Link>
  );
};

const ScrollToTopButton = () => (
  <IconButton
    color="primary"
    size="small"
    onClick={handleScrollToTop}
    sx={{ position: 'fixed', bottom: 20, right: 20 }}
  >
    <ArrowUpward />
  </IconButton>
);

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

export const AboutSystem = () => {
  

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight='90vh'
    >
      <ScrollToTopButton />
      <Paper elevation={3} sx={{width : '1200px', display:"flex", flexDirection:"column", alignItems:"start",justifyContent:"start", padding: "40px"} }>
      <Typography ml={2} variant='h5'>Оглавление</Typography>
      <List>
        <ListItem>
          <AnchorLink to="section1">1) Авторизация</AnchorLink>
        </ListItem>
        <ListItem>
          <AnchorLink to="section2">2) Регистрация</AnchorLink>
        </ListItem>
        <ListItem>
          <AnchorLink to="section3">3) Просмотр управления</AnchorLink>
        </ListItem>
        <ListItem>
          <AnchorLink to="section4">4) Настройка игры</AnchorLink>
        </ListItem>   
        <ListItem>
          <AnchorLink to="section5">5) Играть</AnchorLink>
        </ListItem>             
        <ListItem>
          <AnchorLink to="section6">6) Просмотр рейтинга</AnchorLink>
        </ListItem>
      </List>
      
      <Box id="section1" sx={{width: '900px'}}>
        <CardContent>
          <Typography variant="h5">1) Авторизация</Typography>
          <Typography ml={2} variant="body1">
            a) Для перехода на страницу авторизации нажмите на главной странице пункт меню "Войти в аккаунт"
          </Typography>
        </CardContent>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/auth_1.jpg"
          alt="Image Alt Text"
        />
        <Typography ml={2} my={2} variant="body1">
            б) Введите почту и пароль в соответствующие поля формы
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/auth_2.jpg"
          alt="Image Alt Text"
        />

        <Typography ml={2} my={2} variant="body1">
            в) Нажмите кнопку "Войти". В случае корректной авторизации вы будете возвращены на главное меню. 
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/auth_3.jpg"
          alt="Image Alt Text"
        />

        <Typography ml={2} my={2} variant="body1">
            г) Если у вас нет аккаунта, нажмите на кнопку авторизация и вы перейдете на страницу регистрации
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/auth_4.jpg"
          alt="Image Alt Text"
        />        
      </Box>

      <Box id="section2" sx={{width: '900px'}}>
        <CardContent>
          <Typography variant="h5">2) Регистрация</Typography>
          <Typography ml={2} variant="body1">
            a) Сначала перейдите на страницу авторизации, нажав на главной странице пункт меню "Войти в аккаунт"
          </Typography>
        </CardContent>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/auth_1.jpg"
          alt="Image Alt Text"
        />
        <Typography ml={2} my={2} variant="body1">
            б) Далее нажмите на кнопку регистрация
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/auth_4.jpg"
          alt="Image Alt Text"
        />
        <Typography ml={2} my={2} variant="body1">
            в) Введите имя, почту и пароль и подтвердите пароль в соответствующие поля формы
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/register_1.jpg"
          alt="Image Alt Text"
        />

        <Typography ml={2} my={2} variant="body1">
            г) Нажмите кнопку "Создать аккаунт". В случае корректной авторизации вы будете возвращены на главное меню. 
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/register_2.jpg"
          alt="Image Alt Text"
        />

        <Typography ml={2} my={2} variant="body1">
            д) Если у вас уже есть аккаунт, нажмите на кнопку войти и вы перейдете на страницу авторизации
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/register_3.jpg"
          alt="Image Alt Text"
        />        
      </Box>

      <Box id="section3" sx={{width: '900px'}}>
        <CardContent>
          <Typography variant="h5">3) Просмотр управления</Typography>
          <Typography ml={2} variant="body1">
            a) Для перехода на страницу авторизации нажмите на главной странице пункт меню "Управление"
          </Typography>
        </CardContent>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/control_1.jpg"
          alt="Image Alt Text"
        />
        <Typography ml={2} my={2} variant="body1">
            б) Изучив управление, можете вернуться обратно на главную страницу нажав на стрелку
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/control_2.jpg"
          alt="Image Alt Text"
        />
                
      </Box>

      <Box id="section4" sx={{width: '900px'}}>
        <CardContent>
          <Typography variant="h5">4) Настройка игры</Typography>
          <Typography ml={2} variant="body1">
            a) Для перехода на страницу настройки игры нажмите на главной странице пункт меню "Настройка игры"
          </Typography>
        </CardContent>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/settings_1.jpg"
          alt="Image Alt Text"
        />
        <Typography ml={2} my={2} variant="body1">
            б) Выберите уровень, с которого вы хотите начать, цвет стакана, способ определения результата, музыкальное сопровождение и отображение сетки нажав на соответствующие поля формы
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/settings_2.jpg"
          alt="Image Alt Text"
        />       

        <Typography ml={2} my={2} variant="body1">
            в) Для сохранения выбранных параметров игры нажмите кнопку "Сохранить"
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/settings_3.jpg"
          alt="Image Alt Text"
        />                
      </Box>

      <Box id="section5" sx={{width: '900px'}}>
        <CardContent>
          <Typography variant="h5">6) Играть</Typography>
          <Typography ml={2} variant="body1">
            a) Для перехода на страницу игры нажмите на главной странице пункт меню "Играть"
          </Typography>
        </CardContent>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/play_1.jpg"
          alt="Image Alt Text"
        />
        <Typography ml={2} my={2} variant="body1">
            б) Для того чтобы начать играть, нажмите кнопку "Начать игру"
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/play_2.jpg"
          alt="Image Alt Text"
        />       

        <Typography ml={2} my={2} variant="body1">
            в) Нажимая кнопки согласно управлению, можно начать играть. Управление можно посмотреть <AnchorLink to="section3">здесь</AnchorLink>.
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/play_3.jpg"
          alt="Image Alt Text"
        />                
      </Box>

      <Box id="section6" sx={{width: '900px'}}>
        <CardContent>
          <Typography variant="h5">6) Просмотр рейтинга</Typography>
          <Typography ml={2} variant="body1">
            a) Для перехода на страницу рейтинга нажмите на главной странице пункт меню "Рейтинг"
          </Typography>
        </CardContent>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/rating_1.jpg"
          alt="Image Alt Text"
        />
        <Typography ml={2} my={2} variant="body1">
            б) Для того чтобы поменять критерий отображения рейтинга нажмите на кнопку, указанную на картинке
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/rating_2.jpg"
          alt="Image Alt Text"
        />       

        <Typography ml={2} my={2} variant="body1">
            в) Выберете критерий: очки или время, таблица изменится в соответствии с указанным критерием
        </Typography>
        <CardMedia sx={{width: '500px'}}
          component="img"
          image="../../assets/images/rating_3.jpg"
          alt="Image Alt Text"
        />                
      </Box>

      </Paper>
    </Box>
  )
}