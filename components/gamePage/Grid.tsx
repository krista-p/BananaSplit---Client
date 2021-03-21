import { serialize } from 'node:v8';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';
import Tile from './Tile';

export default function Grid() {
  const grid = [];
  let size = 4;
  for (let row = 1; row <= size; row++) {
    const currentRow = [];
    for (let col = 1; col <= size; col++) {
      currentRow.push('bob ');
    }
    grid.push(currentRow);
  }

  return (
    <div>
      {grid}
    </div>
  );
}
