import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';
import { GameStateType, TileType } from '../../types';
import Tile from './Tile';

type SquarePropsType = {
  state: GameStateType,
  squareId: string,
  gridSize: number,
}

const gridSquare = (props: SquarePropsType) => {
  const { state, squareId, gridSize } = props;
  const { matrix } = state;
  const [rowIndex, colIndex] = squareId.split('-');
  const placeholderTile = matrix[rowIndex][colIndex];

  const squareContents = () => {
    if (!matrix[rowIndex][colIndex]) {
      return '';
    }
    const currentTile: TileType = matrix[rowIndex][colIndex];
    const index: number = parseInt(rowIndex, 10) * gridSize + parseInt(colIndex, 10);
    return (
      <Tile
        key={currentTile.id}
        currentTile={currentTile}
        index={index}
      />
    );
  };

  return (
    <Droppable
      droppableId={squareId}
      renderClone={(provided, snapshot) => (
        <div
          className={
            snapshot.isDragging
              ? styles.dragging
              : styles.tile
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {placeholderTile?.letter}
        </div>
      )}
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div
            id={squareId}
            className={
              !squareContents()
                ? styles.gameSquare
                : styles.tile
            }
          >
            {squareContents()}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default gridSquare;
