import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function DumpZone() {
  return (
    <Droppable
      droppableId="dumpzone"
    >
      {(provided) => (
        <div
          style={{
            height: '200px',
            width: '200px',
            border: 'solid 1px black',
            position: 'absolute',
            right: 0,
            bottom: '50%',
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
