import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { TileInterface } from '../../interfaces';
import { TileType } from '../../types';
import Tile from './Tile';

export default function PlayerTiles({ state }) {
  return (
    <div className="w-full h-4/5 flex justify-center bg-secondary rounded-full mt-4 px-8 border-4 border-primary">
      <div className="w-4/5 h-full overflow-x-scroll overflow-y-hidden scroll-bar-light scrollbar-track-gray-100 m-4">
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
                state.playerTiles.map((currentTile: TileType, index: number) => (
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
    </div>
  );
}
