import Menu from "../Menu/Menu";
import { Tetris } from "../Tetris/Tetris";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../store/slices/AuthSlice";
import { useSaveScoreMutation } from "../../../store/slices/ApiSlices";

import { useGameOver } from "../../../hooks/useGameOver";
import { Box, Paper } from "@mui/material";
import { UserSettings } from '../../../hooks/useSettings'


 const Result = ({gameOver}: {gameOver: boolean}) => {
  const [saveScore] = useSaveScoreMutation();
  
  const id = useSelector(selectCurrentToken);
  if(id){
    const {sub} = JSON.parse(atob(id));
    console.log(sub);
  }
  
  if (gameOver){
    const storedJsonString = localStorage.getItem('score');
    const id = localStorage.getItem('id');
    if(storedJsonString && id){
      const storedDifficultyLevels = JSON.parse(storedJsonString);
      console.log(storedDifficultyLevels)
      saveScore({...storedDifficultyLevels, id})
    }
    
  }
  localStorage.removeItem('score');

  return (
    <div></div>
  )
}


export const Play = ({ settings }: { settings: UserSettings}) => {
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
        <>
          <Result gameOver/>
         <Menu onClick={start} />   
        </>
              
      ) : (
          <Tetris settings= {settings} setGameOver={setGameOver} />         
      )}
    </Paper>
   </Box>
  );
};