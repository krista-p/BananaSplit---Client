import _ from 'lodash';
import { DestinationInterface, GameStateInterface, SourceInterface, TileInterface } from '../../../interfaces';

export const reorder = (playerTiles: TileInterface[], startIndex: number, endIndex: number) => {
  const result: TileInterface[] = _.cloneDeep(playerTiles);
  const [removedTile] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removedTile);

  return result;
};

export const move = (
  state: GameStateInterface,
  dragSource: any,
  dragDestination: any,
  source: SourceInterface,
  destination: DestinationInterface,
) => {
  console.log(dragSource);
  console.log(dragDestination);
  const stateClone: GameStateInterface = _.cloneDeep(state);
  const [sRow, sCol] = source.droppableId.split('-');
  const [dRow, dCol] = destination.droppableId.split('-');

  const dragSourceClone: any = _.cloneDeep(dragSource);
  const result: any = {};
  if (source.droppableId === 'playerTiles') {
    // NOTE Drag from player tiles to game board
    const dragDestClone: any = _.cloneDeep(dragDestination);
    const tileToSwap: TileInterface = dragDestClone[dRow][dCol];
    let removedTile: TileInterface[] = [];
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
    const dragDestClone: any = _.cloneDeep(dragDestination);
    const removedTile: TileInterface = dragSourceClone[sRow][sCol];

    dragSourceClone[sRow][sCol] = dragDestination[dRow][dCol];
    dragDestClone[sRow][sCol] = dragDestClone[dRow][dCol];
    dragDestClone[dRow][dCol] = removedTile;

    stateClone.playerTiles = state.playerTiles;
    stateClone.matrix = dragDestClone;

    result.state = stateClone;
    result[source.droppableId] = dragSourceClone[sRow][sCol];
    result[destination.droppableId] = dragDestClone[dRow][dCol];
  } else {
    // NOTE Drag from game board to player tiles
    const dragDestClone: any = _.cloneDeep(dragDestination);
    const removedTile: TileInterface = dragSourceClone[sRow][sCol];

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