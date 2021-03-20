// eslint-disable-next-line object-curly-newline
const PlayNavbar = ({ closePlay, handleJoinGameTab, handleCreateRoomTab, joinGameTab }) => (
  <nav className="flex flex-col justify-between w-full md:flex-row md:items-center">
    <button type="button" onClick={handleJoinGameTab} className={joinGameTab ? 'h-16 text-yellow-300 w-2/3 border-t-8 border-r-8 border-yellow-300' : ' h-16 text-black w-2/3 border-b-4 border-yellow-300'}>Join A Game</button>

    <button type="button" onClick={handleCreateRoomTab} className={!joinGameTab ? 'h-16 text-yellow-300 w-2/3 border-t-8 border-l-8 border-yellow-300' : 'h-16 text-black w-2/3 border-b-4 border-yellow-300'}>Create A Room</button>

    <button type="button" onClick={closePlay} className="h-16 w-16 text-black font-bold bg-yellow-300 border-4 border-black rounded-sm">X</button>
  </nav>
);

export default PlayNavbar;
