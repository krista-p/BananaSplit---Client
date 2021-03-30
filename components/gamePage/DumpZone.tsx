import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function DumpZone() {
  return (
    <Droppable
      droppableId="dumpzone"
    >
      {(provided) => (
        <div
          className="w-1/4 h-1/4 mx-2 mt-8 bg-secondary rounded-2xl text-primary text-xl md:text-3xl"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className="m-2 text-2xl text-center">
            DUMP ZONE
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
