import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import Grid from './Grid';
import styles from '../../styles/Room.module.css';
import PlayerTiles from './PlayerTiles';
import { reorder, move } from '../lib/utils';
import DumpZone from './DumpZone';

const Board = ({ state, setState, gridSize, handleDump }) => {
  const onBeforeCapture = ({ draggableId }) => {
    const tile = document.getElementById(draggableId);
    tile.classList.add('while-dragging');
    console.log(tile);
  };

  const onDragStart = (start) => {
    if (start.source.droppableId !== 'playerTiles') {
      const id = document.getElementById(start.source.droppableId);
      id.style.opacity = '0';
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    const sourceId: string = source.droppableId;
    if (!destination) {
      console.log('TRY AGAIN');
      if (sourceId !== 'playerTiles') {
        const id = document.getElementById(sourceId);
        id.style.opacity = '100';
      }
      return;
    }

    const sourceIndex: number = source.index;
    const destId: string = destination.droppableId;
    const [sRow, sCol] = sourceId.split('-');
    const [dRow, dCol] = destId.split('-');

    const tileToPlace = sourceId === 'playerTiles' ? state.playerTiles[sourceIndex] : state.matrix[sRow][sCol];

    if (sourceId !== 'playerTiles') {
      const id = document.getElementById(sourceId);
      id.style.opacity = '100';
    }

    if (sourceId === destId) {
      if (sourceId === 'playerTiles') {
        const tiles = reorder(state.playerTiles, result.source.index, result.destination.index);
        setState({ ...state, playerTiles: tiles });
      } else {
        const matrixClone = _.cloneDeep(state.matrix);
        setState({ ...state, matrix: matrixClone });
      }
    } else if (destId !== 'dumpzone') {
      const dragSource = sourceId !== 'playerTiles' ? state.matrix : state.playerTiles;
      const dragDest = destId !== 'playerTiles' ? state.matrix : state.playerTiles;
      const result = move(state, dragSource, dragDest, source, destination);

      const newMatrix = _.cloneDeep(state.matrix);
      const newPlayerTiles = sourceId === 'playerTiles' ? result[sourceId] : state.playerTiles;
      if (destId !== 'playerTiles') {
        newMatrix[dRow][dCol] = tileToPlace;
      } else {
        newMatrix[sRow][sCol] = 0;
      }

      const newState = sourceId === 'playerTiles'
        ? {
          playerTiles: newPlayerTiles,
          matrix: newMatrix,
        } : result.state;
      setState(newState);
    } else {
      console.log(tileToPlace);
      const stateClone = _.cloneDeep(state);
      if (sourceId !== 'playerTiles') {
        stateClone.matrix[sRow][sCol] = 0;
      } else {
        console.log(sourceIndex);
        stateClone.playerTiles.splice(sourceIndex, 1);
        console.log(stateClone.playerTiles);
      }
      // const dragSource = sourceId !== 'playerTiles' ? state.matrix : state.playerTiles;
      handleDump(tileToPlace, stateClone);
    }
  };

  return (
    <div className="flex flex-row h-full w-full">
      <DragDropContext
        onBeforeCapture={onBeforeCapture}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex flex-row w-full h-full">
          <div className="flex flex-col w-3/4 justify-center items-center h-full">
            <div className="h-full w-full border-8 border-secondary rounded-2xl overflow-scroll">
              <Grid
                state={state}
                setState={setState}
                gridSize={gridSize}
              />

            </div>
            <div className="h-1/4 mb-4 w-full">
              <PlayerTiles
                state={state}
                setState={setState}
              />

            </div>

          </div>
          {/* TODO: Testing making a droppable zone for dumping tiles */}
          <DumpZone />

        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
