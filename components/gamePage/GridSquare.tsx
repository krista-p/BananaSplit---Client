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
              ? 'while-dragging'
              : 'dragging-tile'
          }
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {matrix[rowIndex][colIndex] ? placeholderTile.letter : null}
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
                ? 'w-16 h-16 min-w-16 hover:bg-gray-100 border-2 border-gray-100'
                : 'w-16 h-14 min-w-16 border-2 border-gray-100'
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
