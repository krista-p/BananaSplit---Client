import { useState } from 'react';
import JoinGame from './JoinGame';
import PlayNavbar from './PlayNavbar';
import CreateRoom from './CreateRoom';

const PlayPopup = ({ closePlay }) => {
  const [joinGameTab, setJoinGameTab] = useState(true);

  const handleJoinGameTab = () => {
    setJoinGameTab(true);
  };

  const handleCreateRoomTab = () => {
    setJoinGameTab(false);
  };

  return (
    <div className="w-3/4 h-1/2 left-16 md:w-1/2 md:h-3/4 md:inset-x-1/4 top-24 bottom-24 fixed border-black border-4 bg-white shadow-lg rounded-lg">
      <PlayNavbar
        closePlay={closePlay}
        joinGameTab={joinGameTab}
        handleJoinGameTab={handleJoinGameTab}
        handleCreateRoomTab={handleCreateRoomTab}
      />
      { joinGameTab ? <JoinGame /> : <CreateRoom />}
    </div>
  );
};

export default PlayPopup;
