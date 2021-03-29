import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';
import { TileType } from '../../types';

type TileProps = {
  currentTile: TileType,
  index: number,
};

export default function Tile(props: TileProps) {
  const { currentTile, index } = props;
  return (
    <Draggable
      key={currentTile?.id}
      draggableId={currentTile?.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? styles.dragging : styles.tile}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {currentTile?.letter}
        </div>
      )}
    </Draggable>
  );
}
