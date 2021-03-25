import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { io } from 'socket.io-client';
import Tile from './Tile';
import styles from '../../styles/Room.module.css';
import { socket } from '../landingPage/popups/playpopup/CreateRoom';

socket.emit('store');
const getRandomTile = (x) => {
  socket.emit('getOneTile');
  // const tileToAdd = {
  //   letter: '',
  //   id: '',
  // };
  // const index = Math.floor(Math.random() * 26);
  // if (mockBunch[index].length > 0) {
  //   tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
  //   tileToAdd.letter = mockBunch[index].pop();
  //   return tileToAdd;
  // }
  if (x !== 0) getRandomTile(x - 1);
};

export default function PlayerTiles({ state, setState }) {
  const { playerTiles } = state;
  //   const drawTiles = (drawNumber) => {
  //     let newPlayerTiles = [];
  //     for (let i = 0; i < drawNumber; i++) {
  //       const newTile = getRandomTile();
  //       newPlayerTiles = [...newPlayerTiles, newTile];
  //       setState({
  //         ...state,
  //         playerTiles: newPlayerTiles,
  //       });
  //     }
  //   };

  useEffect(() => {
    getRandomTile(10);
  }, []);

  // const [playerTiles, setPlayerTiles] = useState([]);
  socket.on('returnOneTile', (tile) => {
    setState({ playerTiles: [...playerTiles, tile] });
  });
  const handlePeel = (e) => {
    e.preventDefault();
    io('localhost:4300').emit('getOneTile');
  };
  const handleDump = (e) => {
    e.preventDefault();
    socket.emit('storeOneTile');
    getRandomTile(3);
  };

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
          </div>
        )}
      </Droppable>
    </div>
  );
}
