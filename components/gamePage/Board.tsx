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

const move = (state, dragSource, dragDestination, source, destination) => {
  const stateClone = _.cloneDeep(state);
  const [sRow,, sCol] = source.droppableId;
  const [dRow,, dCol] = destination.droppableId;

  const dragSourceClone = _.cloneDeep(dragSource);
  const result: any = {};
  if (source.droppableId === 'playerTiles') {
    // NOTE Drag from player tiles to game board
    const dragDestClone = _.cloneDeep(dragDestination);
    const [removedTile] = dragSourceClone.splice(source.index, 1);

    dragDestClone[dRow][dCol] = removedTile;

    stateClone.playerTiles = dragSourceClone;
    stateClone.matrix = dragDestClone;

    result.state = stateClone;
    result[source.droppableId] = dragSourceClone;
    result[destination.droppableId] = dragDestClone[dRow][dCol];
  } else if (destination.droppableId !== 'playerTiles') {
    // NOTE Drag from game board to game board
    const dragDestClone = _.cloneDeep(dragDestination);
    const removedTile = dragSourceClone[sRow][sCol];

    dragSourceClone[sRow][sCol] = dragDestination[dRow][dCol];
    dragDestClone[sRow][sCol] = dragDestClone[dRow][dCol];
    dragDestClone[dRow][dCol] = removedTile;

    stateClone.playerTiles = state.playerTiles;
    stateClone.matrix = dragDestClone;

    result.state = stateClone;
    result[source.droppableId] = dragSourceClone[sRow][sCol];
    result[destination.droppableId] = dragDestClone[dRow][dCol];
  } else {
    // NOTE Drag from game board to player tiles
    const dragDestClone = _.cloneDeep(dragDestination);
    const removedTile = dragSourceClone[sRow][sCol];

    dragSourceClone[sRow][sCol] = 0;
    dragDestClone.splice(destination.index, 0, removedTile);

    stateClone.playerTiles = dragDestClone;
    stateClone.matrix = dragSourceClone;

    result.state = stateClone;
    result[source.droppableId] = dragSourceClone[sRow][sCol];
    result[destination.droppableId] = dragSourceClone[dRow][dCol];
  }
  return result;
};

const Board = () => {
  const [state, setState] = useState({
    playerTiles: [],
    matrix: Array.from({ length: gridSize }, () => Array(gridSize).fill(0)),
  });

  const onDragStart = (start) => {
    console.log(start);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    const sourceId: string = source.droppableId;
    const sourceIndex: number = source.index;
    const destId: string = destination.droppableId;
    const [sRow,, sCol] = sourceId;
    const [dRow,, dCol] = destId;

    const tileToPlace = sourceId === 'playerTiles' ? state.playerTiles[sourceIndex] : state.matrix[sRow][sCol];

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
      // resolve source before state[sourceId]
      // if sourceId === 'playerTiles' -> state.playerTiles : state.matrix
      const dragSource = sourceId !== 'playerTiles' ? state.matrix : state.playerTiles;
      const dragDest = destId !== 'playerTiles' ? state.matrix : state.playerTiles;
      const result = move(state, dragSource, dragDest, source, destination);

      const newMatrix = _.cloneDeep(state.matrix);
      newMatrix[dRow][dCol] = tileToPlace;
      const newPlayerTiles = sourceId === 'playerTiles' ? result[sourceId] : state.playerTiles;
      const newState = sourceId === 'playerTiles'
        ? {
          playerTiles: newPlayerTiles,
          matrix: newMatrix,
        } : result.state;
      setState(newState);
    }
  };

  return (
    <div className={styles.room}>
      <DragDropContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Grid
          state={state}
          setState={setState}
          gridSize={gridSize}
        />
        <PlayerTiles
          state={state}
          setState={setState}
        />
      </DragDropContext>
    </div>
  );
};

export default Board;