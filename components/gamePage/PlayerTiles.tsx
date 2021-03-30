
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TileInterface } from '../../interfaces';
import Tile from './Tile';

export default function PlayerTiles({ state }) {
  return (
    <div className="w-full h-full flex justify-center bg-secondary rounded-full mt-4 px-8 overflow-x-scroll scroll-bar-light">
      <Droppable
        droppableId="playerTiles"
        direction="horizontal"
      >
        {(provided) => (
          <div
            className="w-full min-w-max flex items-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              state.playerTiles.map((currentTile: TileInterface, index: number) => (
                <Tile
                  key={currentTile.id}
                  currentTile={currentTile}
                  index={index}
                />
              ))
            }
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
