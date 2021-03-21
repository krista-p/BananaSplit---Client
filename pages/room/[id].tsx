import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Board from '../../components/gamePage/Board';
import Grid from '../../components/gamePage/Grid';
import PlayerTiles from '../../components/gamePage/PlayerTiles';
import styles from '../../styles/Room.module.css';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export default function GameRoom() {
  const grid = 4;
  return (
    <div className={styles.room}>
      <Board />
      <PlayerTiles />
    </div>
  );
}
