import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';
import { TileType } from '../../types';
import Tile from './Tile';

type SquarePropsType = {
  state: GameStateType,
  squareId: string,
}
const gridSquare = (props: SquarePropsType) => {
  const { state, squareId } = props;
  const { matrix } = state;
  const placeholderTile = matrix[squareId[0]][squareId[2]];

  const squareContents = (squareId: string) => {
    if (!matrix[squareId[0]][squareId[2]]) {
      return squareId;
    }
    const currentTile: TileType = matrix[squareId[0]][squareId[2]];
    const index: number = parseInt(squareId[0], 10) * 7 + parseInt(squareId[2], 10);
    return (
      <Tile
        currentTile={currentTile}
        index={index}
      />
    );
  };

  return (
    <Droppable
      droppableId={squareId}
      renderClone={(provided) => (
        <div
          className={styles.tile}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {placeholderTile.letter}
        </div>
      )}
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={squareContents(squareId) === squareId ? styles.gameSquare : styles.tile}>
            {squareContents(squareId)}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default gridSquare;