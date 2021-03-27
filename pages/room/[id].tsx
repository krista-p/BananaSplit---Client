import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Board from '../../components/gamePage/Board';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [playersReady, setPlayersReady] = useState(false);
  const [playerHost, setPlayerHost] = useState(false);
  const [playerTiles, setPlayerTiles] = useState([]);
  const [playerTileCount, setPlayerTileCount] = useState(0);

  let readyPressed = 0;

  socket.emit('getPlayersInRoom', id, (res) => {
    setPlayersInRoom(res);
  });
  socket.emit('roomReady', id, (res) => {
    setPlayersReady(res);
  });
  socket.emit('hostSearch', id, (res) => {
    setPlayerHost(res);
  });
  
  const handleLeaveGame = (e) => {
    e.preventDefault();
    try {
      router.push('/');
      socket.emit('leaveGame', id);
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: Logic to only be pressed once
  const handleReadyPlayer = (e) => {
    e.preventDefault();
    try {
      readyPressed++;
      socket.emit('playerReady', id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    try {
      socket.emit('startGame', id);
    } catch (err) {
      console.error(err);
    }
  };
  socket.on('receiveTiles', (tiles) => {
    setPlayerTiles(tiles);
  });




  
  const getRandomTile = (x) => {
    for(let i = 0; i < x; i++) {
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
    console.log(playerTiles[0]);
    console.log(playerTiles, 'current tiles');
    // getRandomTile(3);
  };

  const handlePeel = (e) => {
    e.preventDefault();
    socket.emit('getOneTile'); 
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

          {/* // TODO: Highlight players that are ready */}
          <div className="flex flex-col border-black border-2 h-1/4 rounded-md m-2">
            { playersInRoom &&
              playersInRoom.map((player, index) => (
                // className="text-red-600"
                <div key={index+player}>Player {index + 1}: {player}</div>
                ))
            }
          </div>

          <div className="flex justify-center">
            { !playersReady && readyPressed < 1 &&
              <button className="flex flex-grow bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md justify-center" onClick={handleReadyPlayer}>Ready?!</button>
            }
            { playersReady && playerHost &&
              <button className="flex flex-grow bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md justify-center" onClick={handleStartGame}>Start Game!</button>
            }
          </div>
        </div>

        <div className="flex justify-center items-center border-black border-2 w-3/5 h-3/4 rounded-lg">
          <div>
            <Board />
          </div>
        </div>


        <div className="flex flex-col flex-grow m-2">
          {/* NOTE: Dump will handle player giving one tile back and receiving three. */}
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleDump}>Dump!</button>

          {/* NOTE: Peel will be handled automatically once player runs out of tiles. Button can still be used to test function though. */}
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handlePeel}>Peel!</button>
        </div>
      </div>

    </div>
  );
};

export default Room;
