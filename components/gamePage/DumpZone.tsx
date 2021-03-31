import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

export default function DumpZone() {
  return (
    <div className="w-1/4 h-1/4 mx-2 mt-8 bg-secondary border-4 border-primary rounded-2xl">
      <Droppable
        droppableId="dumpzone"
      >
        {(provided) => (
          <div
            className="w-4/5 h-4/5 m-4 text-center mt-6 justify-center text-primary text-xl md:text-3xl"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div>
              DUMP ZONE
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
