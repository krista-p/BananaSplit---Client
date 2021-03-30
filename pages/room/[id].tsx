import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import Board from '../../components/gamePage/Board';
import { alertNotification } from '../../components/landingPage/popups/alertpopup/AlertPopup';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';
import GameEndPopup from '../../components/gamePage/gameEndPopup/GameEndPopup';
import { numBoards } from '../../components/lib/utils/wordChecker';

const gridSize: number = 15;
const initialState = {
  playerTiles: [],
  matrix: Array.from({ length: gridSize }, () => Array(gridSize).fill(0)),
};

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [actionMessages, setActionMessages] = useState([]);
  const [readyPlayers, setReadyPlayers] = useState([]);
  const [roomReady, setRoomReady] = useState(false);
  const [readyPressed, setReadyPressed] = useState(false);
  const [startPressed, setStartPressed] = useState(false);
  const [playerHost, setPlayerHost] = useState(false);
  const [tilesRemaining, setTilesRemaining] = useState(0);
  const [state, setState] = useState(initialState);
  // THIS IS FOR END OF GAME POPUP
  const [endOpen, setEndOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on('playersInRoom', (players) => {
      setPlayersInRoom(players);
    });
    socket.on('actionMessage', (res) => {
      setActionMessages(prev => [...prev, res]);
    });
    socket.on('roomReadyResponse', (res) => {
      setRoomReady(res);
    });
    socket.on('playerReadyResponse', (res) => {
      setReadyPlayers(res);
    });
    socket.on('hostResponse', (res) => {
      setPlayerHost(res);
    });
    socket.on('tilesRemaining', (res) => {
      setTilesRemaining(res);
    });
  }, []);

  useEffect(() => {
    socket.emit('enteredRoom', id);

    socket.on('receiveTiles', (tiles) => {
      setState((prevState) => ({
        ...prevState,
        playerTiles: prevState.playerTiles.concat(tiles[socket?.id]),
      }));
    });
  }, []);

  const handleLeaveGame = (e) => {
    e.preventDefault();
    try {
      router.push('/');
      socket.emit('leaveGame', id);
    } catch (err) {
      console.error(err);
    };
  };

  const handleReadyPlayer = (e) => {
    e.preventDefault();
    try {
      setReadyPressed(true);
      socket.emit('hostSearch', id);
      socket.emit('playerReady', id);
    } catch (err) {
      console.error(err);
    };
  };

  // TODO: Hide button after game starts
  const handleStartGame = (e) => {
    e.preventDefault();
    try {
      setStartPressed(true);
      socket.emit('startGame', id);
    } catch (err) {
      console.error(err);
    };
  };

  // TODO: End game, check if bunch has any tiles
  const handlePeel = (e) => {
    e.preventDefault();
    try {
      if (numBoards(state.matrix) > 1) {
        alertNotification('Tiles must be connected!');
      } else if (state.playerTiles.length !== 0) {
        alertNotification('Tiles in your pile!');
      } else if (state.playerTiles.length === 0 && numBoards(state.matrix) < 2) {
        console.log(numBoards(state.matrix), 'peeling');
        socket.emit('peelAction', id);
      };
    } catch (err) {
      console.error(err);
    };
  };

  const handleDump = (tileToDump, stateClone) => {
    try {
      setState(stateClone);
      socket.emit('dumpAction', { id, tileToDump });
    } catch (err) {
      console.error(err);
    };
  };

  const playerReady = (player) => {
    if (readyPlayers.indexOf(player) !== -1) {
      return 'bg-primary text-secondary w-auto rounded-full m-2';
    }
    return 'm-2';
  };

  // TESTING END OF GAME POPUP!!!!!
  const toggleEndPopup = () => {
    setEndOpen(!endOpen);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />


      <div className="flex flex-row m-4 justify-between">
        <div className="flex flex-row items-center ml-8 bg-secondary p-2 rounded-full">
          <h1 className="mr-2 text-xl md:text-3xl text-primary">game room code:</h1>
          <div className="w-auto h-16 p-2 bg-primary text-xl md:text-3xl rounded-full flex items-center text-center">{id}</div>
        </div>
        <button type="submit" className="button-yellow" onClick={handlePeel}>Peel!</button>
        <div className="flex flex-row items-center mr-8 bg-secondary p-2 rounded-full">
          <h1 className="mr-2 text-xl md:text-3xl text-primary">tiles in bunch:</h1>
          <div className="w-16 h-16 p-2 bg-primary text-xl md:text-3xl rounded-full flex items-center text-center">{tilesRemaining}</div>
        </div>
      </div>

      <div className="flex w-screen h-3/4 justify-center">
        <div className="flex flex-col w-1/4 h-full flex-grow content-center">
          <div className="flex justify-center">
            <button
              type="button"
              className="button-yellow"
              onClick={handleLeaveGame}
            >
              Leave Game
            </button>
          </div>

          <div className="flex flex-col bg-secondary text-primary text-base md:text-xl h-1/4 rounded-2xl m-2 text-center overflow-y-scroll scroll-bar-light">
            { actionMessages
              && actionMessages.map((message, index) => (
                <div key={index.toString().concat(message)}>
                  {message}
                </div>
              ))
            }
          </div>

          <div className="flex flex-col bg-secondary text-primary text-base md:text-xl h-1/4 rounded-2xl m-2 text-center overflow-y-scroll scroll-bar-light">
            <div className="mt-2 width-full">
              { playersInRoom
                && playersInRoom.map((player, index) => (
                  // mt-2
                  <div className={playerReady(player)} key={index.toString().concat(player)}>
                    {`Player ${index + 1}: ${player}`}
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-center">
            { !readyPressed
              && (
              <button
                type="button"
                className="button-yellow"
                onClick={handleReadyPlayer}
              >
                Ready?!
              </button>
              )}
            { roomReady && playerHost && !startPressed
              && (
                <button
                  type="button"
                  className="button-yellow"
                  onClick={handleStartGame}
                >
                  Start Game!
                </button>
              )}
          </div>
        </div>
        <div className="w-3/4">
          <Board
            state={state}
            setState={setState}
            gridSize={gridSize}
            handleDump={handleDump}
          />
        </div>

      </div>

      {/* TESTING END OF GAME POPUP */}
                <button type="button" onClick={toggleEndPopup} className="bg-pink-400 text-white fixed bottom-8 right-8">click here to get game popup</button>
                {endOpen ? <GameEndPopup /> : null}
    </div>
  );
};

export default Room;
