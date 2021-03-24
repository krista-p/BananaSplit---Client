import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playersInRoom, setPlayersInRoom] = useState([]);

  // Update player list in room
  socket.emit('getPlayersInRoom', id);
  useEffect(() => {
    socket.on('playersInRoom', player => {
      setPlayersInRoom(player);
    });
  }, []);
  
  const handleLeaveGame = (e) => {
    e.preventDefault();
    try {
      router.push('/');
      socket.emit('leaveGame', id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen font-sans items-center">
      <NavBar />

      <div className="flex flex-col items-center">
        <div>Game Room Code: {id} </div>
        <div>Socket ID: {socket.id} </div>
      </div>

      <div className="flex w-screen h-3/4 justify-center">
        <div className="flex flex-col h-full flex-grow content-center">
          <div className="flex justify-center">
            <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleLeaveGame}>Leave Game</button>
          </div>
        
          <div className="flex border-black border-2 h-1/4 rounded-md m-2">
            <div>Actions Coming!</div>
          </div>

          <div className="flex border-black border-2 h-1/4 rounded-md m-2">
            { playersInRoom &&
              playersInRoom.map((player, index) => (
                <div key={index+player}>Player {index + 1}: {player}</div>
                ))
              }
          </div>
        </div>

        <div className="flex justify-center items-center border-black border-2 w-1/2 h-3/4 rounded-lg">
          <div>Game Incoming!</div>
        </div>


        <div className="flex flex-col">
          {/* NOTE: Dump will handle player giving one tile back and receiving three. */}
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Dump!</button>

          {/* NOTE: Peel will be handled automatically once player runs out of tiles. Button can still be used to test function though. */}
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Peel!</button>
        </div>
      </div>

    </div>
  );
};

export default Room;
