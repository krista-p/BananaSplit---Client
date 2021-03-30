import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/auth";
import { alertNotification } from "../alertpopup/AlertPopup";
import { socket } from "./CreateRoom";

const JoinGame = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [gameRoomCode, setGameRoomCode] = useState('');
  const [guestPrivateUserName, setGuestPrivateUserName] = useState('');
  const [guestRandomUserName, setGuestRandomUserName] = useState('');

  let userName;
  if (currentUser) {
    userName = currentUser.displayName;
  }

  const handlePrivateUserName = (e) => {
    setGuestPrivateUserName(e.target.value);
  };

  const handleRandomUserName = (e) => {
    setGuestRandomUserName(e.target.value);
  };

  const handleGameCode = (e) => {
    setGameRoomCode(e.target.value);
  };

  // User or Guest can Join Game (Only Private Currently)
  const handleSumbitJoinPrivateGame = (e) => {
    e.preventDefault();
    try {
      if (userName) {
        socket.emit('joinGame', { gameRoomCode, userName }, (res) => {
          if (res === 'Game Active') {
            alertNotification('Game in Progress!');
          } else if (res === 'No Room') {
            alertNotification('No Room Available');
          } else if (res === 'Room Full') {
            alertNotification('Room Full');
          } else {
            router.push(`/room/${gameRoomCode}`);
          }
        });
      } else {
        userName = guestPrivateUserName;
        socket.emit('joinGame', { gameRoomCode, userName }, (res) => {
          if (res === 'Game Active') {
            alertNotification('Game in Progress!');
          } else if (res === 'No Room') {
            alertNotification('No Room Available');
          } else if (res === 'Room Full') {
            alertNotification('Room Full');
          } else {
            router.push(`/room/${gameRoomCode}`);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRandomGame = (e) => {
    e.preventDefault();
    alertNotification('Function not Ready');
  };

  return (
    <div className="flex flex-col items-center">

      <div className="mt-2 md:mt-4 font-bold text-3xl md:text-5xl text-secondary">
        <h1>Join A Room</h1>
      </div>

      <div className="m-2 flex flex-row">
        <form onSubmit={handleSumbitJoinPrivateGame}>
          <div className="m-2 md:m-4 flex flex-col items-center">
            <h2 className="popup-title-small">private</h2>
            {
              !currentUser &&
              <input type="text" placeholder="username..." className="my-4 w-full input-field" value={guestPrivateUserName} onChange={handlePrivateUserName} />
            }

            <input type="text" placeholder="room code..." className="my-4 w-full input-field" value={gameRoomCode} onChange={handleGameCode} />

            <button type="submit" className="w-full button-yellow">go bananas!</button>
          </div>
        </form>

        <form onSubmit={handleRandomGame}>
          <div className="m-2 md:m-4 flex flex-col items-center">
            <h2 className="popup-title-small">random</h2>
            {
              !currentUser
              && <input type="text" placeholder="username..." className="my-4 w-full input-field" value={guestRandomUserName} onChange={handleRandomUserName} />
            }
            <button type="submit" className="w-full button-yellow">go bananas!</button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default JoinGame;
