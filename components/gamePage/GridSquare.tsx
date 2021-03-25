import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';

const gridSquare = (state, setState, squareId) => {
  const { matrix } = state;
  
  const squareContents = (squareId) => {
    if (!matrix[squareId[2]][squareId[0]]) {
      return squareId;
    }
    return matrix[squareId[2]][squareId[0]].letter;
  };
  return (
    <Droppable
      droppableId={squareId}
      renderClone={(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        />
      )}
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div
            className={
              squareContents(squareId) === squareId
                ? styles.gameSquare
                : styles.tile
            }
          >
            {squareContents(squareId)}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default gridSquare;