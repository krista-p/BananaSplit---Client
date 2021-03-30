import React, { useEffect } from 'react';
import GridSquare from './GridSquare';

export default function Grid({ state, setState, gridSize }) {
  const boardMatrix: any[] = [];
  const row: any[] = [];

  useEffect(() => {
    setState({ ...state, gridTiles: boardMatrix });
  }, []);

  /* NOTE Start game board render functions */
  const renderSquare = (squareId: string) => (
    <div className="w-14 h-14" key={`square${squareId}`}>
      <GridSquare
        state={state}
        squareId={squareId}
        gridSize={gridSize}
      />
    </div>
  );

  const renderRow = (rowId: number) => (
    <div className="h-14 flex flex-row" key={`row${rowId}`}>
      {
        row.map((_, index: number) => renderSquare(`${rowId}-${index}`))
      }
    </div>
  );

  const renderBoard = () => (
    <div className="w-full h-full">
      {
        boardMatrix.map((_, index: number) => renderRow(index))
      }
    </div>
  );
  /* NOTE End game board render functions */

  /* NOTE Start game board builder functions */
  const buildCol = (colId: number) => {
    row.push(renderSquare(`${colId}`));
  };

  const buildBoard = () => {
    for (let colId = 0; colId < gridSize; colId++) {
      buildCol(colId);
      boardMatrix.push(row);
    }
  };

  buildBoard();
  /* NOTE End game board builder functions */

  return (
    <div>
      {renderBoard()}
    </div>
  );
}
