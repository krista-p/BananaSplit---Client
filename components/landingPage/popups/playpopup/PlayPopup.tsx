import { useState } from 'react';
import JoinGame from './JoinGame';
import PlayNavbar from './PlayNavbar';
import CreateRoom from './CreateRoom';

const PlayPopup = ({ closePlay }) => {
  const [joinGameTab, setJoinGameTab] = useState<boolean>(true);

  const handleJoinGameTab = () => {
    setJoinGameTab(true);
  };

  const handleCreateRoomTab = () => {
    setJoinGameTab(false);
  };

  return (
    <div className="popup-big sm:inset-x-20 lg:inset-x-1/4 h-2/3 sm:w-3/4 lg:w-1/2 mt-12 overflow-y-auto scroll-bar-white">
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
