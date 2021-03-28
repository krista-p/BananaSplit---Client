import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Board from '../../components/gamePage/Board';
import { alertNotification } from '../../components/landingPage/popups/alertpopup/AlertPopup';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';

const gridSize: number = 15;
const initialState = {
  playerTiles: [],
  matrix: Array.from({ length: gridSize }, () => Array(gridSize).fill(0)),
};

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [playersReady, setPlayersReady] = useState([]);
  const [roomReady, setRoomReady] = useState(false);
  const [playerHost, setPlayerHost] = useState(false);
  const [state, setState] = useState(initialState);

  let readyPressed = 0;

  useEffect(() => {
    socket.emit('getPlayersInRoom', id, (res) => {
      setPlayersInRoom(res);
    });

    socket.emit('hostSearch', id, (res) => {
      setPlayerHost(res);
    });

    socket.on('receiveTiles', (tiles) => {
      setState({
        ...state,
        playerTiles: tiles[socket.id],
      });
    });
  }, [socket]);

  socket.emit('getPlayersReady', id, useCallback((res) => {
    setPlayersReady(res);
  }, []));

  socket.emit('roomReady', id, useCallback((res) => {
    setRoomReady(res);
  }, []));

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

  // TODO: Hide button after game starts
  const handleStartGame = useCallback((e) => {
    e.preventDefault();
    try {
      socket.emit('startGame');
      socket.emit('createBunch', id);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handlePeel = useCallback((e) => {
    e.preventDefault();
    try {
      if (state.playerTiles.length === 0) {
        socket.emit('peelAction', id);
      } else {
        alertNotification('Tiles still on board!');
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleDump = (e) => {
    e.preventDefault();
    // send tile back into server
    // then this:
    console.log(state.playerTiles[0]);
    console.log(state.playerTiles, 'current tiles');
    socket.emit('tileCheck', id);
    // getRandomTile(3);
  };

  const playerReady = (player) => {
    if (playersReady.indexOf(player) !== -1) {
      return 'text-primary';
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen font-sans items-center">
      <NavBar />

      <div className="flex flex-col items-center">
        <div>
          Game Room Code:
          {id}
        </div>
        <div>
          Socket ID:
          {socket.id}
        </div>
      </div>

      <div className="flex w-screen h-3/4 justify-center">
        <div className="flex flex-col h-full flex-grow content-center">
          <div className="flex justify-center">
            <button
              type="button"
              className="flex flex-grow bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md justify-center"
              onClick={handleLeaveGame}
            >
              Leave Game
            </button>
          </div>

          <div className="flex border-black border-2 h-1/4 rounded-md m-2">
            <div>Actions Coming!</div>
          </div>

          {/* // TODO: Highlight players that are ready */}
          <div className="flex flex-col border-black border-2 h-1/4 rounded-md m-2">
            { playersInRoom
              && playersInRoom.map((player, index) => (
                //
                <div className={playerReady(player)} key={index + player}>
                  Player
                  {index + 1}
                  :
                  {player}
                </div>
              ))}
          </div>

          <div className="flex justify-center">
            { !roomReady && readyPressed < 1
              && (
              <button
                type="button"
                className="flex flex-grow bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md justify-center"
                onClick={handleReadyPlayer}
              >
                Ready?!
              </button>
              )}
            { roomReady && playerHost
              && (
              <button
                type="button"
                className="flex flex-grow bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md justify-center"
                onClick={handleStartGame}
              >
                Start Game!
              </button>
              )}
          </div>
        </div>

        <div
          className="flex justify-center items-center border-black border-2 w-3/5 h-3/4 rounded-lg"
          style={{
            overflow: 'auto',
          }}
        >
          <Board
            state={state}
            setState={setState}
            gridSize={gridSize}
          />
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
