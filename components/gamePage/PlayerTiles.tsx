
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TileInterface } from '../../interfaces';
import Tile from './Tile';

export default function PlayerTiles({ state }) {
  return (
    <div className="w-full h-full flex justify-center bg-secondary rounded-full mt-4">
      <Droppable
        droppableId="playerTiles"
        direction="horizontal"
      >
        {(provided) => (
          <div
            className="w-full m-4 flex justify-center items-center overflow-x-scroll"
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
