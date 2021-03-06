import { useContext } from 'react';
import { useRouter } from 'next/router';
import { io } from 'socket.io-client';
import getConfig from 'next/config';
import { createGameRoomCode } from '../../../lib/utils/createGameRoomCode';
import { AuthContext } from '../../../../contexts/auth';
import { alertNotification } from '../alertpopup/AlertPopup';

const { publicRuntimeConfig } = getConfig();

export const socket = io(publicRuntimeConfig.serverUrl, {
  withCredentials: true,
  forceNew: true,
});

const CreateRoom = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);

  let userName;
  let userID;
  if (currentUser) {
    userName = currentUser.displayName;
    userID = currentUser.uid;
  }

  // Create Private Game
  const handleCreateGame = (e) => {
    e.preventDefault();

    try {
      if (currentUser) {
        const ALLOWABLE_CHARACTERS = 6;
        const gameRoomCode = createGameRoomCode(ALLOWABLE_CHARACTERS);
        socket.emit('privateGame', { gameRoomCode, userName }, (res) => {
          if (res) {
            router.push(`/room/${gameRoomCode}`);
          } else {
            alertNotification('User attached to game');
          }
        });
      } else {
        alertNotification('Login or Create Account!');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center w-1/2 text-center">
      <div className="mt-2 md:mt-4 font-bold text-3xl md:text-4xl text-secondary">
        <h1>create a room!</h1>
      </div>

      <form>

        <div className="m-4 flex flex-col items-center">
          <button type="submit" className="button-yellow text-3xl" onClick={handleCreateGame}>go bananas!</button>
        </div>
      </form>

    </div>
  );
};

export default CreateRoom;
