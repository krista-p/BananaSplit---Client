import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import Grid from './Grid';
import styles from '../../styles/Room.module.css';
import PlayerTiles from './PlayerTiles';
import { GameStateType, TileType } from '../../types';

const gridSize: number = 6;

const reorder = (playerTiles: TileType[], startIndex: number, endIndex: number) => {
  const result: TileType[] = Array.from(playerTiles);
  const [removedTile] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removedTile);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removedTile] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removedTile);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const Board = () => {
  const [state, setState] = useState({
    playerTiles: [],
    matrix: Array.from({ length: gridSize }, () => Array(gridSize).fill(0)),
  });

  const onDragStart = () => {
    console.log('DRAGGING TODO');
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const sourceId: string = source.droppableId === 'playerTiles' ? source.droppableId : 'matrix';
    const sourceIndex: number = source.index;
    const destId: string = destination.droppableId;
    const [dRow,, dCol] = destId;

    const tileToPlace = state.playerTiles[sourceIndex];

    if (sourceId === destId) {
      const tiles = reorder(
        state.playerTiles,
        result.source.index,
        result.destination.index,
      );
      setState({
        ...state,
        playerTiles: tiles,
      });
    } else {
      const result = move(state[sourceId], destId, source, destination);
      const newMatrix = _.cloneDeep(state.matrix);
      newMatrix[dCol][dRow] = tileToPlace;
      const newPlayerTiles = result[sourceId];
      const newState = {
        playerTiles: newPlayerTiles,
        matrix: newMatrix,
      };
      setState(newState);
    }
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className={styles.room}>
        <Grid
          state={state}
          setState={setState}
          gridSize={gridSize}
        />
        <PlayerTiles
          state={state}
          setState={setState}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;