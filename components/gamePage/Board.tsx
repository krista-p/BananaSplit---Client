import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Grid from './Grid';
// import BunchProvider, { useBunchContext } from '../../contexts/BunchContext';
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

const Board = () => {
  // const { bunch, setBunch } = useBunchContext();
  const [playerTiles, setPlayerTiles] = useState([]);

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

  // const getRandomTile = () => {
  //   const updatedBunch = bunch.slice(0);
  //   const index = Math.floor(Math.random() * 26);
  //   if (updatedBunch[index].count === 0) getRandomTile();
  //   updatedBunch[index].count -= 1;
  //   // setBunch([...bunch, updatedBunch]);
  //   const id = bunch[index].letter + bunch[index].count.toString();
  //   return { letter: bunch[index].letter, id };
  // };

  const drawTiles = (drawNumber) => {
    let newPlayerTiles = [];
    for (let i = 0; i < drawNumber; i++) {
      const newTile = getRandomTile();
      newPlayerTiles = [...newPlayerTiles, newTile];
      setPlayerTiles([...playerTiles, ...newPlayerTiles]);
    }
  };

  useEffect(() => {
    drawTiles(10);
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const tiles = reorder(
      playerTiles,
      result.source.index,
      result.destination.index,
    );

    setPlayerTiles(tiles);
  };

  const onDragStart = () => {
    console.log('dragging');
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={styles.room}>
        <div className={styles.gamefield}>
          <Grid />
        </div>
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
                playerTiles.map((currentTile, index) => (
                  <Draggable
                    key={currentTile.id}
                    draggableId={currentTile.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={snapshot.isDragging ? styles.dragging : styles.tile}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {currentTile.letter}
                        {console.log(snapshot.isDragging)}
                      </div>
                    )}
                  </Draggable>
                ))
              }
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;