import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from '../../styles/Room.module.css';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export default function PlayerTiles() {
  return (
    <div className={styles.playerTiles}>
      <DragDropContext>
        <Droppable droppableId="letters" direction="horizontal">
          {(provided) => (
            <ul className={styles.letters} {...provided.droppableProps} ref={provided.innerRef}>
              {letters.map((letter, index) => (
                <div className={styles.gameTile}>
                  <Draggable key={letter} draggableId={letter} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={styles.tile}>{letter}</div>
                      </li>
                    )}
                  </Draggable>
                </div>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
