import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';
import Grid from './Grid';
// import BunchProvider, { useBunchContext } from '../../contexts/BunchContext';
import styles from '../../styles/Room.module.css';
import PlayerTiles from './PlayerTiles';

// const mockBunch = [
//   ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
//   ['B', 'B', 'B'],
//   ['C', 'C', 'C'],
//   ['D', 'D', 'D', 'D', 'D', 'D'],
//   ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
//   ['F', 'F', 'F'],
//   ['G', 'G', 'G', 'G'],
//   ['H', 'H', 'H'],
//   ['I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I'],
//   ['J', 'J'],
//   ['K', 'K'],
//   ['L', 'L', 'L', 'L', 'L'],
//   ['M', 'M', 'M'],
//   ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
//   ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
//   ['P', 'P', 'P'],
//   ['Q', 'Q'],
//   ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
//   ['S', 'S', 'S', 'S', 'S', 'S'],
//   ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
//   ['U', 'U', 'U', 'U', 'U', 'U'],
//   ['V', 'V', 'V'],
//   ['W', 'W', 'W'],
//   ['X', 'X'],
//   ['Y', 'Y', 'Y'],
//   ['Z', 'Z'],
// ];
const gridSize = 6;

// const getRandomTile = () => {
//   const tileToAdd = {
//     letter: '',
//     id: '',
//   };
//   const index = Math.floor(Math.random() * 26);
//   if (mockBunch[index].length > 0) {
//     tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
//     tileToAdd.letter = mockBunch[index].pop();
//     return tileToAdd;
//   }
//   getRandomTile();
//   return null;
// };

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Board = () => {
  // const { bunch, setBunch } = useBunchContext();
  const [state, setState] = useState({
    playerTiles: [],
    matrix: Array.from({ length: gridSize }, () => Array(gridSize).fill(0)),
  });

  // const getRandomTile = () => {
  //   const updatedBunch = bunch.slice(0);
  //   const index = Math.floor(Math.random() * 26);
  //   if (updatedBunch[index].count === 0) getRandomTile();
  //   updatedBunch[index].count -= 1;
  //   // setBunch([...bunch, updatedBunch]);
  //   const id = bunch[index].letter + bunch[index].count.toString();
  //   return { letter: bunch[index].letter, id };
  // };

  // const drawTiles = (drawNumber) => {
  //   let newPlayerTiles = [];
  //   for (let i = 0; i < drawNumber; i++) {
  //     const newTile = getRandomTile();
  //     newPlayerTiles = [...newPlayerTiles, newTile];
  //     setState({
  //       ...state,
  //       playerTiles: newPlayerTiles,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   drawTiles(18);
  // }, []);

  const onDragStart = () => {
    console.log('dragging');
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const sourceInd = source.index;
    const destId = destination.droppableId;
    const [dRow,, dCol] = destId;

    const tileToPlace = state.playerTiles[sourceInd];
    console.log(tileToPlace);

    if (sourceId === destId) {
      const tiles = reorder(
        state.playerTiles,
        result.source.index,
        result.destination.index,
      );
      setState({
        ...state,
        playerTiles: tiles,
      });
    } else {
      const result = move(state[sourceId], destId, source, destination);
      const newMatrix = _.cloneDeep(state.matrix);
      newMatrix[dCol][dRow] = tileToPlace;
      const newPlayerTiles = result[sourceId];
      console.log(result[sourceId]);
      const newState = {
        playerTiles: newPlayerTiles,
        matrix: newMatrix,
      };
      setState(newState);
      // newState[destId] = result[destId];

      // setState(newState);
    }
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={styles.room}>
        <div className={styles.gamefield}>
          <Grid
            state={state}
            setState={setState}
            gridSize={gridSize}
          />
        </div>
        <PlayerTiles
          state={state}
          setState={setState}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;


// import React, { useEffect, useState } from 'react';
// import { DragDropContext, Droppable, Draggable, OnBeforeCaptureResponder, BeforeCapture } from 'react-beautiful-dnd';
// import Grid from './Grid';
// // import BunchProvider, { useBunchContext } from '../../contexts/BunchContext';
// import styles from '../../styles/Room.module.css';
// const mockBunch = [
//   ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
//   ['B', 'B', 'B'],
//   ['C', 'C', 'C'],
//   ['D', 'D', 'D', 'D', 'D', 'D'],
//   ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
//   ['F', 'F', 'F'],
//   ['G', 'G', 'G', 'G'],
//   ['H', 'H', 'H'],
//   ['I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I'],
//   ['J', 'J'],
//   ['K', 'K'],
//   ['L', 'L', 'L', 'L', 'L'],
//   ['M', 'M', 'M'],
//   ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
//   ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
//   ['P', 'P', 'P'],
//   ['Q', 'Q'],
//   ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
//   ['S', 'S', 'S', 'S', 'S', 'S'],
//   ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
//   ['U', 'U', 'U', 'U', 'U', 'U'],
//   ['V', 'V', 'V'],
//   ['W', 'W', 'W'],
//   ['X', 'X'],
//   ['Y', 'Y', 'Y'],
//   ['Z', 'Z'],
// ];
// const Board = () => {
//   // const { bunch, setBunch } = useBunchContext();
//   const [playerTiles, setState] = useState([]);
//   const getRandomTile = () => {
//     const tileToAdd = {
//       letter: '',
//       id: '',
//     };
//     const index = Math.floor(Math.random() * 26);
//     if (mockBunch[index].length > 0) {
//       tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
//       tileToAdd.letter = mockBunch[index].pop();
//       return tileToAdd;
//     }
//     getRandomTile();
//     return null;
//   };
//   // const getRandomTile = () => {
//   //   const updatedBunch = bunch.slice(0);
//   //   const index = Math.floor(Math.random() * 26);
//   //   if (updatedBunch[index].count === 0) getRandomTile();
//   //   updatedBunch[index].count -= 1;
//   //   // setBunch([...bunch, updatedBunch]);
//   //   const id = bunch[index].letter + bunch[index].count.toString();
//   //   return { letter: bunch[index].letter, id };
//   // };
//   const drawTiles = (drawNumber) => {
//     let newPlayerTiles = [];
//     for (let i = 0; i < drawNumber; i++) {
//       const newTile = getRandomTile();
//       newPlayerTiles = [...newPlayerTiles, newTile];
//       setState([...playerTiles, ...newPlayerTiles]);
//     }
//   };
//   useEffect(() => {
//     drawTiles(10);
//   }, []);
//   const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   };
//   const onDragEnd = (result) => {
//     if (!result.destination) {
//       return;
//     }
//     const tiles = reorder(
//       playerTiles,
//       result.source.index,
//       result.destination.index,
//     );
//     setState(tiles);
//   };
  // const onBeforeCapture: OnBeforeCaptureResponder = (before: BeforeCapture): void => {
    /* CW-TODO */
    /* onBeforeCapture -> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md */
    /* We could modify the elems dimensions in here */
    /* I think reducing the elems droppable size coupled with the margins will resolve our error (almost) */
    /* In the `before` prop, you'll have access to the targeted elems id */
    /* Also with state, sometimes its better to have one state object rather multiple state instances */
//   };
//   return (
//     <DragDropContext
//       onDragEnd={onDragEnd}
//       onBeforeCapture={onBeforeCapture}
//     >
//       <div className={styles.room}>
//         <div className={styles.gamefield}>
//           <Grid />
//         </div>
//         <Droppable
//           mode="standard"
//           droppableId="playerTiles"
//           direction="horizontal"
//         >
//           {(provided) => (
//             <div
//               className={styles.playerTiles}
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//             >
//               {
//                 playerTiles.map(({ id, letter }, index) => (
//                   <Draggable
//                     key={id}
//                     draggableId={id}
//                     index={index}
//                   >
//                     {(provided, snapshot) => (
//                       <div
//                         className={styles.tile}
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                       >
//                         {letter}
//                       </div>
//                     )}
//                   </Draggable>
//                 ))
//               }
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </div>
//     </DragDropContext>
//   );
// };
// export default Board;
