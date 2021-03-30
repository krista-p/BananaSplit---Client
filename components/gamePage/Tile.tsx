import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TileInterface } from '../../interfaces';

interface TileProps {
  currentTile: TileInterface,
  index: number,
}

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
          id={currentTile?.id}
          className={snapshot.isDragging ? 'dragging-tile' : 'tile'}
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
