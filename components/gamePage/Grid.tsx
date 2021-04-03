import React, { useEffect } from 'react';
import GridSquare from './GridSquare';

export default function Grid({ state, setState, gridSize }) {
  const row: any[] = [];
  const boardMatrix: any[][] = [];

  useEffect(() => {
    setState({ ...state, gridTiles: boardMatrix });
  }, []);

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

  return (
    <div>
      {renderBoard()}
    </div>
  );
}
