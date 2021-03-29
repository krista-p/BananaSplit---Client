import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import Board from '../../components/gamePage/Board';
import { alertNotification } from '../../components/landingPage/popups/alertpopup/AlertPopup';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';
import GameEndPopup from '../../components/gamePage/gameEndPopup/GameEndPopup';
import { numBoards } from '../../components/lib/utils/wordChecker';

const gridSize: number = 19;
const initialState = {
  playerTiles: [],
  matrix: Array.from({ length: gridSize }, () => Array(gridSize).fill(0)),
};

const Room = () => {
  const router = useRouter();
  const { id } = router.query;
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [roomReady, setRoomReady] = useState(false);
  const [readyPressed, setReadyPressed] = useState(false);
  const [playerHost, setPlayerHost] = useState(false);
  const [state, setState] = useState(initialState);
  // THIS IS FOR END OF GAME POPUP
  const [endOpen, setEndOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on('playersInRoom', (players) => {
      setPlayersInRoom(players);
    });
    socket.on('roomReadyResponse', (res) => {
      console.log(res, 'ready response');
      setRoomReady(res);
    });
    socket.on('hostResponse', (res) => {
      console.log(res, 'host?');
      setPlayerHost(res);
    })
  }, []);

  useEffect(() => {
    socket.emit('enteredRoom', id);

    socket.on('receiveTiles', (tiles) => {
      setState((prevState) => ({
        ...prevState,
        playerTiles: prevState.playerTiles.concat(tiles[socket.id]),
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
    }
  };

  // TODO: Logic to only be pressed once
  const handleReadyPlayer = (e) => {
    e.preventDefault();
    try {
      setReadyPressed(true);
      socket.emit('hostSearch', id);
      socket.emit('playerReady', id);
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: Hide button after game starts
  const handleStartGame = (e) => {
    e.preventDefault();
    try {
      socket.emit('startGame', id);
    } catch (err) {
      console.error(err);
    }
  };

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
    }
  };

  const handleDump = (tileToDump, stateClone) => {
    const mockDumpTiles = [{ letter: 'A', id: 'testA'}, { letter: 'B', id: 'testB'}, { letter: 'C', id: 'testC'}];
    stateClone.playerTiles = [...stateClone.playerTiles, ...mockDumpTiles];
    setState(stateClone);
    // e.preventDefault();
    // console.log(e);
    // send tile back into server
    // then this:
    // console.log(state.playerTiles[0]);
    // console.log(state.playerTiles, 'current tiles');
    // socket.emit('tileCheck', id);
    socket.emit('tileCheck', id);
    // getRandomTile(3);
  };

  // TODO: Highlight player when ready
  // playersReady is no longer used with socket events..
  // const playerReady = (player) => {
  //   console.log(player);
  //   console.log('checking highligh', playersReady);
  //   if (playersReady.indexOf(player) !== -1) {
  //     return 'text-primary';
  //   }
  // };

  // TESTING END OF GAME POPUP!!!!!
  const toggleEndPopup = () => {
    setEndOpen(!endOpen);
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
              className="button-yellow"
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
                // className={playerReady(player)}
                <div key={index.toString().concat(player)}>
                  Player
                  {index + 1}
                  :
                  {player}
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
                {console.log(roomReady, 'room after ready')}
                {console.log(playerHost, 'host after ready')}
                Ready?!
              </button>
              )}
            { roomReady && playerHost
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
            handleDump={handleDump}
          />
        </div>

        <div className="flex flex-col flex-grow m-2">
          {/* NOTE: Dump will handle player giving one tile back and receiving three. */}
          <button type="submit" className="button-yellow" onClick={handleDump}>Dump!</button>

          {/* NOTE: Peel will be handled automatically once player runs out of tiles. Button can still be used to test function though. */}
          <button type="submit" className="button-yellow" onClick={handlePeel}>Peel!</button>
        </div>
      </div>

      {/* TESTING END OF GAME POPUP */}
                <button type="button" onClick={toggleEndPopup} className="bg-pink-400 text-white p-2 mb-8">click here to get game popup</button>
                {endOpen ? <GameEndPopup /> : null}
    </div>
  );
};

export default Room;
