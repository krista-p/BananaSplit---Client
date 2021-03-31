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
    <div className="popup-big h-3/5">
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
