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
  console.log('Move(): source:', dragSource);
  console.log('Move(): destination:', dragDestination);
  console.log('Move(): droppableSource:', source);
  console.log('Move(): droppableDestination:', destination);
  const stateClone = _.cloneDeep(state);
  console.log(stateClone);
  const [sRow,, sCol] = source.droppableId;
  const [dRow,, dCol] = destination.droppableId;

  const dragSourceClone = _.cloneDeep(dragSource);
  const result: any = {};
  if (source.droppableId === 'playerTiles') {
    const dragDestClone = _.cloneDeep(dragDestination);
    const [removedTile] = dragSourceClone.splice(source.index, 1);

    console.log(dragDestClone);
    console.log(removedTile);
    dragDestClone[dRow][dCol] = removedTile;
    console.log(dragDestClone);

    stateClone.playerTiles = dragSourceClone;
    stateClone.matrix = dragDestClone;
    console.log(stateClone);
    result.state = stateClone;
    result[source.droppableId] = dragSourceClone;
    result[destination.droppableId] = dragDestClone[dRow][dCol];
  } else if (destination.droppableId !== 'playerTiles') {
    const dragDestClone = _.cloneDeep(dragDestination);
    const removedTile = dragSourceClone[sRow][sCol];

    console.log(dragSourceClone);
    console.log(removedTile);
    dragSourceClone[sRow][sCol] = dragDestination[dRow][dCol];
    dragDestClone[sRow][sCol] = dragDestClone[dRow][dCol];
    dragDestClone[dRow][dCol] = removedTile;
    console.log(dragSourceClone);

    stateClone.playerTiles = state.playerTiles;
    stateClone.matrix = dragDestClone;
    console.log('state', stateClone);
    result.state = stateClone;
    result[source.droppableId] = dragSourceClone[sRow][sCol];
    result[destination.droppableId] = dragDestClone[dRow][dCol];
  } /*else {
    const dragDestClone = _.cloneDeep(dragDestination);
    const removedTile = dragSourceClone[sRow][sCol];

    dragSourceClone[sRow][sCol] = 0;
    dragDestClone.splice(destination.index, 0, removedTile);
    res
  }*/
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

    const sourceId: string = source.droppableId;
    const sourceIndex: number = source.index;
    const destId: string = destination.droppableId;
    const [sRow,, sCol] = sourceId;
    const [dRow,, dCol] = destId;

    console.log(dRow, dCol);
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
      tileToPlace.onBoard = true;
      // resolve source before state[sourceId]
      // if sourceId === 'playerTiles' -> state.playerTiles : state.matrix
      const dragSource = sourceId !== 'playerTiles' ? state.matrix : state.playerTiles;
      const dragDest = destId !== 'playerTiles' ? state.matrix : state.playerTiles;
      const result = move(state, dragSource, dragDest, source, destination);
      console.log('result:', result);
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
  console.log(state);
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