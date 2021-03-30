import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import NavBar from '../../components/Navbar';
import Board from '../../components/gamePage/Board';
import GameEndPopup from '../../components/gamePage/gameEndPopup/GameEndPopup';
import { alertNotification } from '../../components/landingPage/popups/alertpopup/AlertPopup';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import { numBoards, wordFinder } from '../../components/lib/utils/wordChecker';
import { GameStateInterface, TileInterface } from '../../interfaces';

const gridSize: number = 15;
const initialState: GameStateInterface = {
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
    socket.on('playersInRoom', (players: string[]) => {
      setPlayersInRoom(players);
    });
    socket.on('actionMessage', (res: string) => {
      setActionMessages((prev: string[]) => [...prev, res]);
    });
    socket.on('roomReadyResponse', (res: boolean) => {
      setRoomReady(res);
    });
    socket.on('playerReadyResponse', (res: string[]) => {
      setReadyPlayers(res);
    });
    socket.on('hostResponse', (res: boolean) => {
      setPlayerHost(res);
    });
    socket.on('roomActive', (res: boolean) => {
      setRoomActive(res);
    });
    socket.on('tilesRemaining', (res: number) => {
      setTilesRemaining(res);
    });
  }, []);

  useEffect(() => {
    socket.emit('enteredRoom', id);

    socket.on('receiveTiles', (tiles: TileInterface[]) => {
      setState((prevState: GameStateInterface) => ({
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

  const handleDump = (tileToDump: TileInterface, stateClone: GameStateInterface) => {
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
      // Take out tiles from board and send back to playerTiles
      console.log(state.matrix);
      const { matrix, playerTiles } = state;
      const matrixClone: any[][] = _.cloneDeep(matrix);
      const playerTilesClone: TileInterface[] = _.cloneDeep(playerTiles);
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (matrixClone[row][col] !== 0) {
            playerTilesClone.push(matrixClone[row][col]);
            matrixClone[row][col] = 0;
          }
        }
      }
      setState({ matrix: matrixClone, playerTiles: playerTilesClone });
    } catch (err) {
      console.error(err);
    }
  };

  const handleBanana = (e) => {
    e.preventDefault();
    try {
      if (state.playerTiles.length > 0 || tilesRemaining > 0) {
        alertNotification('Play all tiles!');
      } else if (state.playerTiles.length === 0 && tilesRemaining === 0) {
        // Check if all words are valid
        if (true) { // TODO (CHANGE THIS 'TRUE'): result of word check. should be boolean
          const matrixClone: any[][] = _.cloneDeep(state.matrix);
          const rottenTiles: TileInterface[] = _.cloneDeep(state.playerTiles);

          for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
              if (matrixClone[row][col] !== 0) {
                rottenTiles.push(matrixClone[row][col]);
                matrixClone[row][col] = 0;
              }
            }
          }
          socket.emit('rottenBanana', { id, rottenTiles });
          setState(initialState);
        }
        else {
          console.log('board is good');
        }
      };
    } catch (err) {
      console.error(err);
    }
  }

  const playerReady = (player: string) => {
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
        {/* <button type="submit" className="button-yellow" onClick={handlePeel}>Peel!</button> */}
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

          <div className="flex flex-col bg-secondary text-primary text-base md:text-xl h-1/4 rounded-2xl m-2 text-center overflow-y-scroll">
            { actionMessages 
              && actionMessages.map((message: string, index: number) => (
                <div key={index.toString().concat(message)}>
                  {message}
                </div>
              ))
            }
          </div>

          <div className="flex flex-col bg-secondary text-primary text-base md:text-xl h-1/4 rounded-2xl m-2 text-center">
            <div className="mt-2 width-full">
              { playersInRoom
                && playersInRoom.map((player: string, index: number) => (
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

        <div className="w-3/4">
          <Board
            state={state}
            setState={setState}
            gridSize={gridSize}
            handleDump={handleDump}
          />
        </div>

        <div className="flex flex-col flex-grow m-2">
          <button type="submit" className="button-yellow" onClick={handleReset}>Reset</button>

          <button type="submit" className="button-yellow" onClick={handlePeel}>Peel!</button>
          
          <div>
            <button type="submit" className="button-yellow" onClick={handleBanana}>Banana!</button>
            {/* { tilesRemaining < 1 && state.playerTiles.length < 1 &&
            } */}
          </div>
        </div>

      {/* TESTING END OF GAME POPUP */}
                <button type="button" onClick={toggleEndPopup} className="bg-pink-400 text-white fixed bottom-8 right-8">click here to get game popup</button>
                {endOpen ? <GameEndPopup /> : null}
      </div>
    </div>
  );
};

export default Room;
