import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Board from '../../components/gamePage/Board';
import { io } from 'socket.io-client';
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

  const handleReadyPlayer = (e) => {
    e.preventDefault();

    try {
      socket.emit('playerReady');
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
  };

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

      <div className="flex w-screen h-3/4 justify-center">
        <div className="flex flex-col h-full flex-grow content-center">
          <div className="flex justify-center">
            <button className="flex flex-grow bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md justify-center" onClick={handleLeaveGame}>Leave Game</button>
          </div>
        
          <div className="flex border-black border-2 h-1/4 rounded-md m-2">
            <div>Actions Coming!</div>
          </div>

<<<<<<< HEAD
          {/* // TODO: Highlight players that are ready */}
          <div className="flex flex-col border-black border-2 h-1/4 rounded-md m-2">
            { playersInRoom &&
              playersInRoom.map((player, index) => (
                <div key={index+player}>Player {index + 1}: {player}</div>
                ))
              }
          </div>

          <div className="flex justify-center">
            <button className="flex flex-grow bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md justify-center" onClick={handleReadyPlayer}>Ready?!</button>
          </div>
        </div>

        <div className="flex justify-center items-center border-black border-2 w-3/5 h-3/4 rounded-lg">
          <div>
            <Board />
          </div>
        </div>


        <div className="flex flex-col flex-grow m-2">
          {/* NOTE: Dump will handle player giving one tile back and receiving three. */}
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Dump!</button>

          {/* NOTE: Peel will be handled automatically once player runs out of tiles. Button can still be used to test function though. */}
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Peel!</button>
        </div>
=======
        {/* NOTE: Dump will handle player giving one tile back and receiving three. */}
        <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleDump}>Dump!</button>

        {/* NOTE: Peel will be handled automatically once player runs out of tiles. Button can still be used to test function though. */}
        <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handlePeel}>Peel!</button>
>>>>>>> 60bc4867791068623621d2c1468f615f36ee7570
      </div>

    </div>
  );
};

export default Room;
