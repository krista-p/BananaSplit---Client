import { TileType } from '../../../types';

export const reorder = (playerTiles: TileType[], startIndex: number, endIndex: number) => {
  const result: TileType[] = _.cloneDeep(playerTiles);
  const [removedTile] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removedTile);

  return result;
};

export const move = (state, dragSource, dragDestination, source, destination) => {
  const stateClone = _.cloneDeep(state);
  const [sRow, sCol] = source.droppableId.split('-');
  const [dRow, dCol] = destination.droppableId.split('-');

  const dragSourceClone = _.cloneDeep(dragSource);
  const result: any = {};
  if (source.droppableId === 'playerTiles') {
    // NOTE Drag from player tiles to game board
    const dragDestClone = _.cloneDeep(dragDestination);
    const tileToSwap = dragDestClone[dRow][dCol];
    let removedTile = [];
    if (tileToSwap) {
      [removedTile] = dragSourceClone.splice(source.index, 1, tileToSwap);
    } else {
      [removedTile] = dragSourceClone.splice(source.index, 1);
    }

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
  // } else if (destination.droppableId === 'dumpzone') { // TODO: Logic to handle dump zone drop
  //   console.log('YAY YOU CAN DUMP');
  } else {
    // NOTE Drag from game board to player tiles
    const dragDestClone = _.cloneDeep(dragDestination);
    const removedTile = dragSourceClone[sRow][sCol];

    dragDestClone.splice(destination.index, 0, removedTile);

    stateClone.playerTiles = dragDestClone;
    stateClone.matrix = dragSourceClone;

    result.state = stateClone;
    result[source.droppableId] = dragSourceClone[sRow][sCol];
    result[destination.droppableId] = dragSourceClone[sRow][sCol];
    dragSourceClone[sRow][sCol] = 0;
  }
  return result;
};