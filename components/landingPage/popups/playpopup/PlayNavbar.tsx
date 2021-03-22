// eslint-disable-next-line object-curly-newline
const PlayNavbar = ({ closePlay, handleJoinGameTab, handleCreateRoomTab, joinGameTab }) => (
  <nav className="flex flex-col justify-between w-full md:flex-row md:items-center">
    <button type="button" onClick={handleJoinGameTab} className={joinGameTab ? 'h-16 text-2xl text-primary w-2/3 border-t-4 border-r-4 border-primary' : 'h-16 text-2xl text-secondary w-2/3 border-b-4 border-primary'}>Join A Game</button>

    <button type="button" onClick={handleCreateRoomTab} className={!joinGameTab ? 'h-16 text-2xl text-primary w-2/3 border-t-4 border-l-4 border-primary' : 'h-16 text-2xl text-secondary w-2/3 border-b-4 border-primary'}>Create A Room</button>

    <button type="button" onClick={closePlay} className="h-16 w-24 text-primary text-4xl font-bold bg-secondary border-4 border-primary hover:bg-primary hover:text-secondary rounded-sm">X</button>
  </nav>
);

export default PlayNavbar;
