import Menu from "../Menu/Menu";
import { Tetris } from "../Tetris/Tetris";

import { useGameOver } from "../../../hooks/useGameOver";
import { Box, Paper } from "@mui/material";
import { UserSettings } from '../../../hooks/useSettings'


export const Play = ({ rows, columns, settings }: {rows: number, columns: number, settings: UserSettings}) => {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const start = () => resetGameOver();

  return (
   <Box
   display="flex"
   flexDirection="column"
   alignItems="center"
   justifyContent="center"
   minHeight='90vh'
 >
   <Paper  elevation={3} sx={{width : '800px', minHeight: '80vh', display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"start", padding: "40px 0", position: 'relative'}}>
      {gameOver ? (
         <Menu onClick={start} />       
      ) : (
          <Tetris settings= {settings} rows={rows} columns={columns} setGameOver={setGameOver} />         
      )}
    </Paper>
   </Box>
  );
};