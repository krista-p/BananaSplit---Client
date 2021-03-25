import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';
import { AuthContext } from '../../contexts/auth';

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useContext(AuthContext);

  let userName;
  if (currentUser) {
    userName = currentUser.displayName;
  }

  const [playersInRoom, setPlayersInRoom] = useState([]);
  
  socket.emit('getPlayersInRoom', id);
  useEffect(() => {
    socket.on('playersInRoom', player => setPlayersInRoom(player));
  }, [socket]);

  const handleLeaveGame = (e) => {
    e.preventDefault();

    try {
      router.push('/');
      socket.emit('leaveGame', id);
    } catch (err) {
      console.error(err);
    }
  };
  const [playerTiles, setPlayerTiles] = useState([]);
  const [playerTileCount, setPlayerTileCount] = useState(0);
  const bunch = [];
  socket.emit('store', bunch);
  const getRandomTile = (x) => {
    for(let i = 0; i<x; i++) {
      socket.emit('getOneTile');
      socket.on('returnOneTile', (tile) => {
        setPlayerTiles(current => [...current, tile]);
        setPlayerTileCount(current => current + 1);
      });
    }
    console.log(playerTiles, playerTileCount);
  };
  const handleDump = (e) => {
    e.preventDefault();
    // send tile back into server
    // then this:
    getRandomTile(3);
  }
  const handlePeel = (e) => {
    e.preventDefault();
    io('localhost:4300').emit('getOneTile'); 
  };
  return (
    <div className="flex flex-col h-screen w-screen font-sans items-center">
      <NavBar />

      <div className="flex flex-col items-center">
        <div>Game Room Code: {id} </div>
        <div>Socket ID: {socket.id} </div>
      </div>

      <div className="flex flex-col justify-center items-center border-black border-2 w-1/6 h-1/6 rounded-lg">
        <div>Socket Room #</div>
        { playersInRoom &&
          playersInRoom.map((player, index) => (
            <div key={index+player}>Player {index + 1}: {player}</div>
          ))
        }
      </div>
      <div>
        <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleLeaveGame}>Leave Game</button>

        {/* NOTE: Dump will handle player giving one tile back and receiving three. */}
        <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleDump}>Dump!</button>

        {/* NOTE: Peel will be handled automatically once player runs out of tiles. Button can still be used to test function though. */}
        <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handlePeel}>Peel!</button>
      </div>
    </div>
  );
};

export default Room;
