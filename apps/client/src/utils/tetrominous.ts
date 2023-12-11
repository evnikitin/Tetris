import { Cell } from "../components/Game/Cell";

export const TETROMINOES = [
   {
     shape: [
       [0, 1, 0, 0],
       [0, 1, 0, 0],
       [0, 1, 0, 0],
       [0, 1, 0, 0]
     ],
     color: `yellow`
   },
   {
     shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
     ],
     color: `aqua`
   },
   {
     shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 1]
     ],
     color: `orange`
   },
   {
     shape: [
      [1, 1],
      [1, 1]
     ],
     color: `aqua`
   },
   {
     shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
     ],
     color: `green`
   },
   {
     shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0]
     ],
     color: `brown`
   },
   {
     shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
     ],
     color: `blue`
   }
];

export const randomTetromino = () => {
   const index = Math.floor(Math.random() * TETROMINOES.length);
   return TETROMINOES[index];
 };

export const rotate = ({ piece, direction } : {piece: number[][], direction: number} ) => {
  const newPiece = piece.map((_, index) =>
    piece.map((column) => column[index])
  );

  if (direction > 0) return newPiece.map((row) => row.reverse());

  return newPiece.reverse();
};

export const transferToBoard = ({
   color,
   isOccupied,
   position,
   rows,
   shape
 }:{color: string, isOccupied: boolean, position: {row: number, column: number} , rows: typeof Cell[][], shape: number[][]}) => {
   shape.forEach((row, y) => {
     row.forEach((cell, x) => {
       if (cell) {
         const occupied = isOccupied;
         const _y = y + position.row;
         const _x = x + position.column;
         rows[_y][_x] = { occupied, color };
       }
     });
   });
 
   return rows;
 };