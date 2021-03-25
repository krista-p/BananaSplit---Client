import React, { useEffect } from 'react';
import GridSquare from './GridSquare';
import styles from '../../styles/Room.module.css';

export default function Grid({ state, setState, gridSize }) {
  const boardMatrix: any[] = [];
  const row: any[] = [];

  useEffect(() => {
    setState({ ...state, gridTiles: boardMatrix });
  }, []);

  /* NOTE Start game board render functions */

  const renderSquare = (squareId: string) => (
    <div className={styles.gameSquare}>
      <GridSquare
        state={state}
        squareId={squareId}
      />
    </div>
  );

  const renderRow = (colId: number) => (
    <div className={styles.gameRow}>
      {
        row.map((_, index: number) => renderSquare(`${colId}-${index}`))
      }
    </div>
  );

  const renderBoard = () => (
    <div className={styles.gameBoard}>
      {
        boardMatrix.map((_, index: number) => renderRow(index))
      }
    </div>
  );
  /* NOTE End game board render functions */

  /* NOTE Start game board builder functions */
  const buildCol = (rowNum: number) => {
    row.push(renderSquare(`${rowNum}`));
  };

  const buildBoard = () => {
    for (let rowNum = 0; rowNum < gridSize; rowNum++) {
      buildCol(rowNum);
      boardMatrix.push(row);
    }
  };

  buildBoard();
  /* NOTE End game board builder functions */

  return (
    <div className={styles.gameBoard}>
      <div>
        {renderBoard()}
      </div>
    </div>
  );
}
