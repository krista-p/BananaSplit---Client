import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/auth";
import { alertNotification } from "../alertpopup/AlertPopup";
import { socket } from "./CreateRoom";

const JoinGame = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [gameRoomCode, setGameRoomCode] = useState('');
  const [guestUserName, setGuestUserName] = useState('');
  
  let userName;
  if (currentUser) {
    userName = currentUser.displayName;
  }

  const handleGuestUserName = (e) => {
    setGuestUserName(e.target.value);
  }

  const handleGameCode = (e) => {
    setGameRoomCode(e.target.value);
  }

  // User or Guest can Join Game (Only Private Currently)
  const handleSumbitJoinGame = (e) => {
    e.preventDefault();
    try {
      if (userName) {
        socket.emit('joinGame', { gameRoomCode, userName });
      } else {
        userName = guestUserName;
        socket.emit('joinGame', { gameRoomCode, userName });
      }
      
      socket.on('joinGameResponse', ({ res, userName }) => {
        console.log(res, 'hello');
        if (res === 'No Room') {
          alertNotification('No Room Available');
        } else if (res === 'Room Full') {
          alertNotification('Room Full');
        } else {
          router.push(`/room/${gameRoomCode}`);
        }
      })
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

      <div className="m-4 font-bold text-5xl text-secondary">
        <h1>Join A Room</h1>
      </div>

      <div className="flex flex-row">
        <form onSubmit={handleSumbitJoinGame}>
          <div className="m-4 flex flex-col items-center">
            <h2 className="m-2 font-bold text-2xl text-primary">Private</h2>
            {
              !currentUser &&
              <input type="text" placeholder="enter username..." className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6 m-2" value={guestUserName} onChange={handleGuestUserName} />
            }

            <input type="text" placeholder="enter room code..." className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" value={gameRoomCode} onChange={handleGameCode} />

            <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Go bananas!</button>
          </div>
        </form>

        <form onSubmit={handleRandomGame}>
          <div className="m-4 flex flex-col items-center">
            <h2 className="m-2 font-bold text-2xl text-primary">Random</h2>
            {
              !currentUser &&
              <input type="text" placeholder="enter username..." className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6 m-2" value={guestUserName} onChange={handleGuestUserName} />
            }

            <div className="m-4 flex flex-col items-center">
              <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Go bananas!</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default JoinGame;
