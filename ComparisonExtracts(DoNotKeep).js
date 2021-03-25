import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, OnBeforeCaptureResponder, BeforeCapture } from 'react-beautiful-dnd';
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
  const onBeforeCapture: OnBeforeCaptureResponder = (before: BeforeCapture): void => {
    /* CW-TODO */
    /* onBeforeCapture -> https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md */
    /* We could modify the elems dimensions in here */
    /* I think reducing the elems droppable size coupled with the margins will resolve our error (almost) */
    /* In the `before` prop, you'll have access to the targeted elems id */
    /* Also with state, sometimes its better to have one state object rather multiple state instances */
  };
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onBeforeCapture={onBeforeCapture}
    >
      <div className={styles.room}>
        <div className={styles.gamefield}>
          <Grid />
        </div>
        <Droppable
          mode="standard"
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
                playerTiles.map(({ id, letter }, index) => (
                  <Draggable
                    key={id}
                    draggableId={id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className={styles.tile}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {letter}
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
export default Board;

/* CSS REFERENCE */

.room {
  background-color: #dfcf74;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
// CW-TODO
// Lets add some margin to all of the children of the grid, we want to end up with a small gap between our grid tiles.
// Hint: Take a look at the CSS Grid Gap Property
.grid {
  width: 50vw; 
  height: 50vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(100px, 1fr));
  border: solid 1px #000;
}
.gameBoard {
  width: 70vw;
  height: 70vh;
  background-color: white;
}
.gameRow {
  height: 100px;
  display: flex;
  flex-direction: row;
}
.gameSquare {
  width: 100px;
  height: 100px;
  border: 1px solid lightgrey;
}
.tile {
  width: 100px;
  height: 100px;
  border: solid 1px #fff;
  color: white;
  background-color: #000;
  font-size: 50px;
}
// CW-TODO

//   We still want to inherit all the styles from the tile above, and just override the dimensions
//   take a look at how you set the classes in the ternary on the board

.dragging {
  width: 40px;
  height: 40px;
  border: solid 1px #fff;
  color: white;
  background-color: red;
  font-size: 20px;
  translate: 30px 30px;
}
.playerTiles {
  width: 100vw;
  display: flex;
}
.letters {
  display: inherit;
  flex-direction: row;
  align-items: flex-end;
}
.gamefield {
  height: 60vh;
  width: 60vw;
  background-color: white;
}