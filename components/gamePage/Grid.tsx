import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';
import Tile from './Tile';

// const gridSize = 7;

export default function Grid({ state, setState, gridSize }) {
  const boardMatrix = [];
  const row = [];
  const { playerTiles, matrix } = state;

  const squareContents = (squareId) => {
    if (!matrix[squareId[2]][squareId[0]]) {
      return squareId;
    }
    return matrix[squareId[2]][squareId[0]].letter;
  };

  const gridSquare = (squareId) => (
    <Droppable
      droppableId={squareId}
      renderClone={(provided, snapshot, rubric) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        />
      )}
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={squareContents(squareId) === squareId ? styles.gameSquare : styles.tile}>{squareContents(squareId)}</div>
        </div>
      )}
    </Droppable>
  );

  const renderCol = (rowNum) => {
    row.push(gridSquare(`${rowNum}`));
  };

  const renderBoardMatrix = () => {
    for (let rowNum = 0; rowNum < gridSize; rowNum++) {
      renderCol(rowNum);
      boardMatrix.push(row);
    }
    console.log('line 45:', state);
  };

  renderBoardMatrix();

  useEffect(() => {
    setState({ ...state, gridTiles: boardMatrix });
  }, []);

  const gridRow = (rowId) => (
    <div className={styles.gameRow}>
      {
        row.map((_, index) => gridSquare(`${rowId}-${index}`))
      }
    </div>
  );

  const gridBoard = () => (
    <div className={styles.gameBoard}>
      {
        boardMatrix.map((_, index) => gridRow(index))
      }
    </div>
  );

  return (
    <div className={styles.gameBoard}>
      <div>
        {gridBoard()}
      </div>
    </div>
  );
}
