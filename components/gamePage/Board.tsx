
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// import styles from '../../styles/Room.module.css';


// export default function Board() {
//   const gridSquare = () => (
//     <div className={styles.gameSquare}> DIS IS SQUARE </div>
//   );

//   const gridRow = () => (
//     <div className={styles.gameRow}>
//       {gridSquare()}
//       {gridSquare()}
//       {gridSquare()}
//       {gridSquare()}
//     </div>
//   );

//   const gridBoard = () => (
//     <div className={styles.gameBoard}>
//       {gridRow()}
//       {gridRow()}
//       {gridRow()}
//       {gridRow()}
//     </div>
//   );

//   return (
//     <div className={styles.gameBoard}>
//       {/* <style jsx>
//         {`
//           margin-top: 5vh;
//           height: 75vh;
//           width: 75vw;
//           background-color: white;
//         `}
//       </style> */}
//       <Droppable
//         droppableId="gameBoard"
//       >
//         {(provided) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {gridBoard()}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }
