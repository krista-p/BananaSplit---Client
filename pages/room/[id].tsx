import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import Image from 'next/image';
import Board from '../../components/gamePage/Board';
import GameEndPopup from '../../components/gamePage/gameEndPopup/GameEndPopup';
import { alertNotification } from '../../components/landingPage/popups/alertpopup/AlertPopup';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import { numBoards, wordFinder, dictCheckInvalid, dictCheckValid } from '../../components/lib/utils/wordChecker';
import * as dictionary from '../../components/lib/utils/dictionary.json';
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
  const [gameWinner, setGameWinner] = useState('');
  const [state, setState] = useState(initialState);
  // THIS IS FOR END OF GAME POPUP
  const [endOpen, setEndOpen] = useState<boolean>(false);

  useEffect(() => {
    socket.on('playersInRoom', (players: string[]) => {
      setPlayersInRoom(players);
    });
    socket.on('actionMessage', (res) => {
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
    socket.on('endGameResponse', (res: string) => {
      setGameWinner(res);
      setEndOpen(true);
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
    }
  };

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

  const handleStartGame = (e) => {
    e.preventDefault();
    try {
      socket.emit('startGame', id);
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: End game, check if bunch has any tiles
  const handlePeel = (e) => {
    e.preventDefault();
    try {
      if (numBoards(state.matrix) > 1) {
        alertNotification('Tiles must be connected!');
      } else if (state.playerTiles.length !== 0) {
        alertNotification('Tiles in your pile!');
      } else if (state.playerTiles.length === 0 && numBoards(state.matrix) < 2 && tilesRemaining > 0) {
        socket.emit('peelAction', id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // TODO: Dump only if bunch tiles is > 0
  const handleDump = (tileToDump: TileInterface, stateClone: GameStateInterface) => {
    try {
      setState(stateClone);
      socket.emit('dumpAction', { id, tileToDump });
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    try {
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
    const gridWords = wordFinder(state.matrix);
    const invalidWords = dictCheckInvalid(gridWords, dictionary.default);
    const validWords = dictCheckValid(gridWords, dictionary.default);

    try {
      if (state.playerTiles.length > 0 || tilesRemaining >= playersInRoom.length) {
        alertNotification('Play all tiles!');
      } else if (state.playerTiles.length === 0 && tilesRemaining < playersInRoom.length) {
        // Check if all words are valid

        if (invalidWords.length) {
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
          socket.emit('rottenBanana', id);
          console.log(validWords, 'valid incoming');
          console.log(invalidWords, 'valid incoming');
          setState(initialState);
        } else {
          const matrixObject: any = {};
          console.log(validWords, 'valid incoming');
          console.log(invalidWords, 'valid incoming');

          // TODO: store count of words -> server can sort between clients

          socket.emit('endGame', id);
        }
      };
    } catch (err) {
      console.error(err);
    }
  };

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
      {/* <NavBar /> */}

      <div className="flex flex-col flex-grow h-3/4 w-full">
        <div className="flex flex-row m-4 justify-between">
          <div className="flex flex-row items-center bg-secondary p-2 border-4 border-primary rounded-full">
            <h1 className="ml-4 mr-2 text-xl md:text-3xl text-primary">game room code:</h1>
            <div className="mr-2 w-auto p-2 px-4 bg-primary text-xl md:text-3xl rounded-full flex items-center text-center">{id}</div>
          </div>

          <div className="flex flex-row items-center bg-secondary px-8 border-4 border-primary rounded-full">
            <Image
                src="/bananasplitlogo.png"
                alt="banana split logo"
                width="320"
                height="100"
              />
          </div>

          <div className="flex flex-row items-center mr-8 bg-secondary p-2 border-4 border-primary rounded-full">
            <h1 className="ml-4 mr-2 text-xl md:text-3xl text-primary">tiles in bunch:</h1>
            <div className="w-16 h-16 p-3 bg-primary text-xl md:text-3xl rounded-full flex items-center text-center">{tilesRemaining}</div>
          </div>
        </div>

        <div className="flex w-screen h-4/5 w-1/4 justify-center">
          <div className="flex flex-col w-1/4 content-center m-2">
            <div className="flex justify-center">
              <button
                type="button"
                className="button-yellow text-4xl"
                onClick={handleLeaveGame}
              >
                leave game
              </button>
            </div>

            <div className="flex flex-col bg-secondary text-primary text-base md:text-xl h-1/3 w-full mr-2 border-4 border-primary rounded-2xl">
              <div className="h-3/4 w-5/6 pl-8 text-center overflow-y-scroll scroll-bar-light">
                { actionMessages
                  && actionMessages.map((message, index) => (
                    <div key={index.toString().concat(message)}>
                      {message}
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="flex flex-col bg-secondary text-primary text-base md:text-xl h-1/3 w-full mr-2 mt-2 border-4 border-primary rounded-2xl">
              <div className="h-3/4 w-5/6 text-center pl-8 overflow-y-scroll scroll-bar-light">
                { playersInRoom
                  && playersInRoom.map((player, index) => (
                    <div className={playerReady(player)} key={index.toString().concat(player)}>
                      {`player ${index + 1}: ${player}`}
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-center">
              { !readyPressed
                && (
                <button
                  type="button"
                  className="button-yellow text-4xl"
                  onClick={handleReadyPlayer}
                >
                  ready?!
                </button>
                )}
              { roomReady && playerHost && !roomActive
                && (
                  <button
                    type="button"
                    className="button-yellow text-4xl"
                    onClick={handleStartGame}
                  >
                    start game!
                  </button>
                )}
              { roomActive
              && (
                <button
                  type="submit"
                  className="button-yellow text-4xl"
                  onClick={handleReset}
                >
                  reset
                </button>
              )}
            </div>
          </div>

          <div className="w-3/4 h-full">
            <Board
              state={state}
              setState={setState}
              gridSize={gridSize}
              handleDump={handleDump}
            />
          </div>

          <div className="fixed flex flex-col bottom-32 right-2">
            { state.playerTiles.length < 1 && tilesRemaining > 0 && roomActive &&
              <button type="submit" className="button-yellow" onClick={handlePeel}>peel!</button>
            }

            { tilesRemaining < playersInRoom.length &&
              <button type="submit" className="button-yellow" onClick={handleBanana}>BANANA!</button>
            }

          </div>

        {/* TESTING END OF GAME POPUP */}
                  <button type="button" onClick={toggleEndPopup} className="bg-pink-400 text-white fixed bottom-8 right-8">click here to get game popup</button>
                  {endOpen ? <GameEndPopup winner={gameWinner} /> : null}
        </div>

      </div>
    </div>
  );
};

export default Room;
