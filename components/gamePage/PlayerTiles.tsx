// import { useEffect, useState } from 'react';
// import { Droppable } from 'react-beautiful-dnd';
// import { io } from 'socket.io-client';
// import Tile from './Tile';
// import styles from '../../styles/Room.module.css';
// import { socket } from '../landingPage/popups/playpopup/CreateRoom';

// socket.emit('store');


// export default function PlayerTiles({ state, setState }) {
//   const getRandomTile = (x) => {
//     socket.emit('getOneTile', x);
//     socket.on('returnOneTile', (tiles) => {
//       setState({ playerTiles: [...playerTiles, tiles] });
//     });
//     // const tileToAdd = {
//     //   letter: '',
//     //   id: '',
//     // };
//     // const index = Math.floor(Math.random() * 26);
//     // if (mockBunch[index].length > 0) {
//     //   tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
//     //   tileToAdd.letter = mockBunch[index].pop();
//     //   return tileToAdd;
//     // }
//   };
//   const { playerTiles } = state;
//   //   const drawTiles = (drawNumber) => {
//   //     let newPlayerTiles = [];
//   //     for (let i = 0; i < drawNumber; i++) {
//   //       const newTile = getRandomTile();
//   //       newPlayerTiles = [...newPlayerTiles, newTile];
//   //       setState({
//   //         ...state,
//   //         playerTiles: newPlayerTiles,
//   //       });
//   //     }
//   //   };

//   getRandomTile(12);

//   // const [playerTiles, setPlayerTiles] = useState([]);
  
//   const handlePeel = (e) => {
//     e.preventDefault();
//     io('localhost:4300').emit('getOneTile');
//   };
//   const handleDump = (e) => {
//     e.preventDefault();
//     socket.emit('storeOneTile');
//     getRandomTile(3);
//   };
//   const tileSet = () => {

//   }
//   const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
  
//     return result;
//   };
  
//   const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);
  
//     destClone.splice(droppableDestination.index, 0, removed);
  
//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;
  
//     return result;
//   };
//   return (
//     <div className={styles.playerTiles}>
//       <Droppable
//         droppableId="playerTiles"
//         direction="horizontal"
//       >
//         {(provided) => (
//           <div
//             className={styles.playerTiles}
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {
//               state.playerTiles.map((currentTile, index) => (
//                 <Tile
//                   currentTile={currentTile}
//                   index={index}
//                 />
//               ))
//             }
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Tile from './Tile';
import styles from '../../styles/Room.module.css';

const mockBunch = [
  ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
  ['B', 'B', 'B'],
  ['C', 'C', 'C'],
  ['D', 'D', 'D', 'D', 'D', 'D'],
  ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
  ['F', 'F', 'F'],
  ['G', 'G', 'G', 'G'],
  ['H', 'H', 'H'],
  ['I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I'],
  ['J', 'J'],
  ['K', 'K'],
  ['L', 'L', 'L', 'L', 'L'],
  ['M', 'M', 'M'],
  ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
  ['P', 'P', 'P'],
  ['Q', 'Q'],
  ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
  ['S', 'S', 'S', 'S', 'S', 'S'],
  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  ['U', 'U', 'U', 'U', 'U', 'U'],
  ['V', 'V', 'V'],
  ['W', 'W', 'W'],
  ['X', 'X'],
  ['Y', 'Y', 'Y'],
  ['Z', 'Z'],
];
// const gridSize = 6;

const getRandomTile = () => {
  const tileToAdd = {
    letter: '',
    id: '',
  };
  const index = Math.floor(Math.random() * 26);
  if (mockBunch[index].length > 0) {
    tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
    tileToAdd.letter = mockBunch[index].pop();
    return tileToAdd;
  }
  getRandomTile();
  return null;
};

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

export default function PlayerTiles({ state, setState }) {
  const drawTiles = (drawNumber) => {
    let newPlayerTiles = [];
    for (let i = 0; i < drawNumber; i++) {
      const newTile = getRandomTile();
      newPlayerTiles = [...newPlayerTiles, newTile];
      setState({
        ...state,
        playerTiles: newPlayerTiles,
      });
    }
  };

  useEffect(() => {
    drawTiles(18);
  }, []);

  return (
    <div className={styles.playerTiles}>
      <Droppable
        droppableId="playerTiles"
        direction="horizontal"
      >
        {(provided) => (
          <div
            className={styles.playerTiles}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              state.playerTiles.map((currentTile, index) => (
                <Tile
                  currentTile={currentTile}
                  index={index}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import { Droppable } from 'react-beautiful-dnd';
// import { io } from 'socket.io-client';
// import Tile from './Tile';
// import styles from '../../styles/Room.module.css';
// import { socket } from '../landingPage/popups/playpopup/CreateRoom';

// socket.emit('store');
// const getRandomTile = (x) => {
//   socket.emit('getOneTile');
//   // const tileToAdd = {
//   //   letter: '',
//   //   id: '',
//   // };
//   // const index = Math.floor(Math.random() * 26);
//   // if (mockBunch[index].length > 0) {
//   //   tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
//   //   tileToAdd.letter = mockBunch[index].pop();
//   //   return tileToAdd;
//   // }
//   if (x !== 0) getRandomTile(x - 1);
// };

// export default function PlayerTiles({ state, setState }) {
//   const { playerTiles } = state;
//   //   const drawTiles = (drawNumber) => {
//   //     let newPlayerTiles = [];
//   //     for (let i = 0; i < drawNumber; i++) {
//   //       const newTile = getRandomTile();
//   //       newPlayerTiles = [...newPlayerTiles, newTile];
//   //       setState({
//   //         ...state,
//   //         playerTiles: newPlayerTiles,
//   //       });
//   //     }
//   //   };

//   useEffect(() => {
//     getRandomTile(10);
//   }, []);

//   // const [playerTiles, setPlayerTiles] = useState([]);
//   socket.on('returnOneTile', (tile) => {
//     setState({ playerTiles: [...playerTiles, tile] });
//   });
//   const handlePeel = (e) => {
//     e.preventDefault();
//     io('localhost:4300').emit('getOneTile');
//   };
//   const handleDump = (e) => {
//     e.preventDefault();
//     socket.emit('storeOneTile');
//     getRandomTile(3);
//   };

//   return (
//     <div className={styles.playerTiles}>
//       <Droppable
//         droppableId="playerTiles"
//         direction="horizontal"
//       >
//         {(provided) => (
//           <div
//             className={styles.playerTiles}
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//           >
//             {
//               state.playerTiles.map((currentTile, index) => (
//                 <Tile
//                   currentTile={currentTile}
//                   index={index}
//                 />
//               ))
//             }
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }
