import { Box, Button, styled } from "@mui/material";
import React, { MouseEventHandler } from "react";


interface MenuProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}


const MenuButton = styled(Button)({
   padding: '40px 80px',
   fontSize: '2em',
   borderRadius: '20px',
   border: 'none',
   boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 20px',
   cursor: 'pointer',
});



const Menu: React.FC<MenuProps> = ({ onClick }) => (
  <Box display='flex' justifyContent='center' alignItems='center'>
    <MenuButton onClick={onClick}>
      Начать игру
    </MenuButton>
  </Box>
);

export default Menu;
