import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import NavBar from '../../components/Navbar';
import Board from '../../components/gamePage/Board';
import GameEndPopup from '../../components/gamePage/gameEndPopup/GameEndPopup';
import { alertNotification } from '../../components/landingPage/popups/alertpopup/AlertPopup';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
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
  const [roomActive, setRoomActive] = useState(false);
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
    socket.on('roomActive', (res) => {
      setRoomActive(res);
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

  const handleReset = (e) => {
    e.preventDefault();
    try {
      console.log(state.matrix);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSplit = (e) => {
    e.preventDefault();
    try {
      if (state.playerTiles.length > 0 || tilesRemaining > 0) {
        alertNotification('Play all tiles!');
      } else if (state.playerTiles.length === 0 && tilesRemaining === 0) {
        console.log('Ready to Split!');
      };
    } catch (err) {
      console.error(err);
    }
  }

  const playerReady = (player) => {
    if (readyPlayers.indexOf(player) !== -1) {
      return 'text-green-400';
    }
  };

  // TESTING END OF GAME POPUP!!!!!
  const toggleEndPopup = () => {
    setEndOpen(!endOpen);
  };

  return (
    <div className="flex flex-col h-screen w-screen font-sans items-center">
      <NavBar />

<<<<<<< HEAD

=======
>>>>>>> 194e2f28fe3e4893bc0ef35f94a63239aa7f3bad
      <div className="flex flex-row m-4">
        <div className="flex flex-col items-center">
          <div>
          {`Game Room Code: ${id}`}
          </div>
        </div>

        <div className="flex flex-row items-center">
          <h1 className="mr-2 text-3xl text-primary">tiles in bunch:</h1>
<<<<<<< HEAD
          <div className="w-auto h-auto p-2 border-4 border-secondary bg-primary text-3xl">{tilesRemaining}</div>
=======
          <div className="w-auto h-auto p-2 border-4 border-secondary bg-primary text-3xl">NUMBER</div>
>>>>>>> 194e2f28fe3e4893bc0ef35f94a63239aa7f3bad
        </div>
      </div>

      <div className="flex w-screen h-3/4 justify-center">
        <div className="flex flex-col h-full flex-grow content-center">
          <div className="flex justify-center">
            <button
              type="button"
              className="button-yellow"
              onClick={handleLeaveGame}
            >
              Leave Game
            </button>
          </div>

<<<<<<< HEAD
          <div className="flex flex-col bg-secondary text-primary text-xl h-1/4 rounded-full m-2 justify-center">
            { actionMessages 
              && actionMessages.map((message, index) => (
                <div key={index.toString().concat(message)}>
                  {message}
                </div>
              ))
            }
=======
          <div className="flex bg-secondary text-primary text-xl h-1/4 rounded-full m-2 justify-center">
            <div>Actions Coming!</div>
>>>>>>> 194e2f28fe3e4893bc0ef35f94a63239aa7f3bad
          </div>

          <div className="flex flex-col bg-secondary text-primary text-xl h-1/4 rounded-full m-2 text-center">
            { playersInRoom
              && playersInRoom.map((player, index) => (
<<<<<<< HEAD
                // mt-2
                <div className={playerReady(player)} key={index.toString().concat(player)}>
                  {`Player ${index + 1}: ${player}`}
=======
                // className={playerReady(player)}
                <div className="mt-2" key={index.toString().concat(player)}>
                  Player
                  {index + 1}
                  :
                  {player}
>>>>>>> 194e2f28fe3e4893bc0ef35f94a63239aa7f3bad
                </div>
              ))}
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
            { roomReady && playerHost && !roomActive
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

        <Board
          state={state}
          setState={setState}
          gridSize={gridSize}
          handleDump={handleDump}
        />

        <div className="flex flex-col flex-grow m-2">
          <button type="submit" className="button-yellow" onClick={handleReset}>Reset</button>

          <button type="submit" className="button-yellow" onClick={handlePeel}>Peel!</button>
          
          <div>
            { tilesRemaining < 1 && state.playerTiles.length < 1 &&
              <button type="submit" className="button-yellow" onClick={handleSplit}>Split!</button>
            }
          </div>
        </div>
      </div>

      {/* TESTING END OF GAME POPUP */}
                <button type="button" onClick={toggleEndPopup} className="bg-pink-400 text-white fixed bottom-8 right-8">click here to get game popup</button>
                {endOpen ? <GameEndPopup /> : null}
    </div>
  );
};

export default Room;
