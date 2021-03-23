import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { createGameRoomCode } from '../../../lib/api/api';

export const socket = io('http://localhost:4300', {
  withCredentials: true,
});

const CreateRoom = () => {
  const router = useRouter();

  const handleNewGame = () => {
    try {
      const roomId = createGameRoomCode(6);
      socket.emit('privateGame', roomId);
      router.push(`/room/${roomId}`);
      console.log(`New Game: ${roomId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-4 font-bold text-5xl text-secondary">
        <h1>Create a room!</h1>
      </div>

      <form>
        <div className="m-4 flex flex-col items-center">
          <h2 className="m-2 font-bold text-2xl text-primary">Number of players</h2>
          <select name="players" className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6">
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>

        <div className="m-4 flex flex-col items-center">
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleNewGame}>Go bananas!</button>
        </div>
      </form>

    </div>
  );
};

export default CreateRoom;
