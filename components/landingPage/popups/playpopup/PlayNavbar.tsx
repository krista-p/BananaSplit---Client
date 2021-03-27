// eslint-disable-next-line object-curly-newline
const PlayNavbar = ({ closePlay, handleJoinGameTab, handleCreateRoomTab, joinGameTab }) => (
  <nav className="flex flex-row justify-between w-full">
    <button type="button" onClick={handleJoinGameTab} className={joinGameTab ? 'open-tab-left' : 'closed-tab'}>join game</button>

    <button type="button" onClick={handleCreateRoomTab} className={!joinGameTab ? 'open-tab-right' : 'closed-tab'}>create game</button>

    <button type="button" onClick={closePlay} className="close-button">X</button>
  </nav>
);

export default PlayNavbar;
