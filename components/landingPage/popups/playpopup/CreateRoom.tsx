import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import { createGameRoomCode } from '../../../lib/utils/createGameRoomCode';
import { AuthContext } from '../../../../contexts/auth';
import { alertNotification } from '../alertpopup/AlertPopup';

export const socket = io('http://localhost:4300', {
  withCredentials: true,
});

const CreateRoom = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  let userName, userID;
  if (currentUser) {
    userName = currentUser.displayName;
    userID = currentUser.uid;
  }

  // Create Private Game
  const handleCreateGame = (e) => {
    e.preventDefault();

    try {
      if (currentUser) { 
        const gameRoomCode = createGameRoomCode(6);
        socket.emit('privateGame', { gameRoomCode, userName }, (res) => {
          if (res) {  
            router.push(`/room/${gameRoomCode}`);
          } else {  
            console.log('Player already has game!');
            alertNotification('User attached to game');
          }
        });
      } else {
        alertNotification('Login or Create Account!');
      }
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
          <h2 className="m-2 font-bold text-2xl text-primary">Igor Recommended No Size Selection</h2>
          {/* <select name="players" className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" onChange={handleSelection}>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
          </select> */}
        </div>

        <div className="m-4 flex flex-col items-center">
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleCreateGame}>Go bananas!</button>
        </div>
      </form>

    </div>
  );
};

export default CreateRoom;
