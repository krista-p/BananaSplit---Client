import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  const [playersInRoom, setPlayersInRoom] = useState([]);
  
  socket.emit('getPlayersInRoom', id);
  useEffect(() => {
    socket.on('playersInRoom', player => setPlayersInRoom(player));
  }, [socket]);

  return (
    <div className="flex flex-col h-screen w-screen font-sans items-center">
      <NavBar />

      <div className="flex flex-col items-center">
        <div>Game Room Code: {id} </div>
        <div>Socket ID: {socket.id} </div>
      </div>

      <div className="flex flex-col justify-center items-center border-black border-2 w-1/6 h-1/6 rounded-lg">
        <div>Socket Room #</div>
        {
          playersInRoom.map((player, index) => (
            <div key={index+player}>Player {index + 1}: {player}</div>
          ))
        }
      </div>
    </div>
  );
};

export default Room;
