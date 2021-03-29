
import React, { useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { mockBunch } from '../../mocks';
import Tile from './Tile';
import styles from '../../styles/Room.module.css';

// const getRandomTile = () => {
//   const tileToAdd = {
//     letter: '',
//     id: '',
//   };
//   let index = Math.floor(Math.random() * 26);
//   while (mockBunch[index].length < 1) {
//     index = Math.floor(Math.random() * 26);
//   }
//   tileToAdd.id = mockBunch[index][0] + mockBunch[index].length.toString();
//   tileToAdd.letter = mockBunch[index].pop();
//   return tileToAdd;
// };

export default function PlayerTiles({ state, setState }) {
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

  return (
    <div className="w-full h-1/4 flex justify-center bg-secondary rounded-full mt-4">
      <Droppable
        droppableId="playerTiles"
        direction="horizontal"
      >
        {(provided) => (
          <div
            className="w-3/4 flex justify-center items-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              state.playerTiles.map((currentTile, index) => (
                <Tile
                  key={currentTile.id}
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
