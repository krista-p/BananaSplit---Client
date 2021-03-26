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
/*0*/  ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
/*1*/  ['B', 'B', 'B'],
/*2*/  ['C', 'C', 'C'],
/*3*/  ['D', 'D', 'D', 'D', 'D', 'D'],
/*4*/  ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
/*5*/  ['F', 'F', 'F'],
/*6*/  ['G', 'G', 'G', 'G'],
/*7*/  ['H', 'H', 'H'],
/*8*/  ['I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I'],
/*9*/  ['J', 'J'],
/*10*/  ['K', 'K'],
/*11*/  ['L', 'L', 'L', 'L', 'L'],
/*12*/  ['M', 'M', 'M'],
/*13*/  ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'],
/*14*/  ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
/*15*/  ['P', 'P', 'P'],
/*16*/  ['Q', 'Q'],
/*17*/  ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
/*18*/  ['S', 'S', 'S', 'S', 'S', 'S'],
/*19*/  ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
/*20*/  ['U', 'U', 'U', 'U', 'U', 'U'],
/*21*/  ['V', 'V', 'V'],
/*22*/  ['W', 'W', 'W'],
/*23*/  ['X', 'X'],
/*24*/  ['Y', 'Y', 'Y'],
/*25*/  ['Z', 'Z'],
];
// const gridSize = 6;

const getRandomTile = () => {
  const tileToAdd = {
    letter: '',
    id: '',
  };
  let index = Math.floor(Math.random() * 26);
  while (mockBunch[index].length < 1) {
    index = Math.floor(Math.random() * 26);
  }
  tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
  tileToAdd.letter = mockBunch[index].pop();
  return tileToAdd;
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
  // console.log(state);
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
            {/* {console.log(state.playerTiles)} */}
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
