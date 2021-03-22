import { serialize } from 'node:v8';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';
import Tile from './Tile';

export default function Grid() {
  const gridSquare = (squareId) => (
    <Droppable
      droppableId={squareId}
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <div className={styles.gameSquare}>SQUARE</div>
        </div>
      )}
    </Droppable>
  );

  const gridRow = (rowId) => (
    <div className={styles.gameRow}>
      {gridSquare('A'.concat(rowId))}
      {gridSquare('B'.concat(rowId))}
      {gridSquare('C'.concat(rowId))}
      {gridSquare('D'.concat(rowId))}
    </div>
  );

  const gridBoard = () => (
    <div className={styles.gameBoard}>
      {gridRow('1')}
      {gridRow('2')}
      {gridRow('3')}
      {gridRow('4')}
    </div>
  );
  const [gridState, setGridState] = useState(gridBoard);
  return (
    <div className={styles.gameBoard}>
      {/* <style jsx>
        {`
          margin-top: 5vh;
          height: 75vh;
          width: 75vw;
          background-color: white;
        `}
      </style> */}
      <Droppable
        droppableId="gameBoard"
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {gridBoard()}
          </div>
        )}
      </Droppable>
    </div>
  );
}
