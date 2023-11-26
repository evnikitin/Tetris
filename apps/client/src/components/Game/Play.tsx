import Menu from "./Menu";
import { Tetris } from "./Tetris/Tetris";

import { useGameOver } from "../../hooks/useGameOver";
import { Box, Paper } from "@mui/material";

export const Play = ({ rows, columns }: {rows: number, columns: number}) => {
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
          <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />         
      )}
    </Paper>
   </Box>
  );
};