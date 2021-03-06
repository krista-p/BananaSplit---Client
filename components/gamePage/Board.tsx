import React, { useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import {
  ChevronDoubleLeftIcon, ChevronDoubleUpIcon, ChevronDoubleRightIcon, ChevronDoubleDownIcon,
} from '@heroicons/react/solid';
import Grid from './Grid';
import PlayerTiles from './PlayerTiles';
import { reorder, move } from '../lib/utils';
import DumpZone from './DumpZone';
import { StartInterface, ResultInterface } from '../../interfaces';

const Board = ({
  state, setState, gridSize, handleDump
}) => {
  const boardWindow = useRef(null);

  const onBeforeCapture = ({ draggableId }) => {
    const tile = document.getElementById(draggableId);
    tile.classList.add('while-dragging');
  };

  const onDragStart = (start: StartInterface) => {
    if (start.source.droppableId !== 'playerTiles') {
      const id = document.getElementById(start.source.droppableId);
      id.style.opacity = '0';
    }
  };

  const onDragEnd = (result: ResultInterface) => {
    const { source, destination } = result;
    const sourceId: string = source.droppableId;
    if (!destination) {
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
      const stateClone = _.cloneDeep(state);
      if (sourceId !== 'playerTiles') {
        stateClone.matrix[sRow][sCol] = 0;
      } else {
        stateClone.playerTiles.splice(sourceIndex, 1);
      }
      handleDump(tileToPlace, stateClone);
    }
  };

  const onDirectionClick = (direction: string): void => {
    if (direction === 'up') {
      boardWindow.current.scrollTop -= 20;
    }
    if (direction === 'right') {
      boardWindow.current.scrollLeft += 20;
    }
    if (direction === 'left') {
      boardWindow.current.scrollLeft -= 20;
    }
    if (direction === 'down') {
      boardWindow.current.scrollTop += 20;
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
          <ChevronDoubleLeftIcon onClick={() => onDirectionClick('left')} className="text-secondary h-12 w-12 hover:text-primary relative top-1/3 cursor-pointer" />
          <div className="flex flex-col w-3/4 justify-center items-center h-full">
            <ChevronDoubleUpIcon onClick={() => onDirectionClick('up')} className="text-secondary h-12 w-12 hover:text-primary relative top-0 cursor-pointer" />
            <div id="grid-window" ref={boardWindow} className="h-full w-full border-8 border-secondary rounded-2xl overflow-hidden">
              <Grid
                state={state}
                setState={setState}
                gridSize={gridSize}
              />
            </div>
            <ChevronDoubleDownIcon onClick={() => onDirectionClick('down')} className="text-secondary h-12 w-12 hover:text-primary relative bottom-0 cursor-pointer" />
            <div className="h-1/4 mb-4 w-full">
              <PlayerTiles
                state={state}
              />
            </div>
          </div>
          <ChevronDoubleRightIcon onClick={() => onDirectionClick('right')} className="text-secondary h-12 w-12 hover:text-primary relative top-1/3 cursor-pointer" />
          <DumpZone />

        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
