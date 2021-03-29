import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import Grid from './Grid';
import styles from '../../styles/Room.module.css';
import PlayerTiles from './PlayerTiles';
import { reorder, move } from '../lib/utils/dragDropHelpers';
import DumpZone from './DumpZone';

const Board = ({ state, setState, gridSize, handleDump }) => {
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
        setState(stateClone);
      } else {
        stateClone.playerTiles.splice(source.Index, 1);
        console.log('CLONE:', stateClone);
      }
      // const dragSource = sourceId !== 'playerTiles' ? state.matrix : state.playerTiles;
      handleDump(tileToPlace, stateClone);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-3/5 h-full">
      <DragDropContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="h-full w-full border-4 border-secondary rounded-xl overflow-scroll">
          <Grid
            state={state}
            setState={setState}
            gridSize={gridSize}
          />

        </div>
        <PlayerTiles
          state={state}
          setState={setState}
        />
        {/* TODO: Testing making a droppable zone for dumping tiles */}
        <DumpZone />
      </DragDropContext>
    </div>
  );
};

export default Board;
