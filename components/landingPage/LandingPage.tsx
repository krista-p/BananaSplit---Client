import { useState } from 'react';
import Image from 'next/image';
import ButtonContainer from './ButtonContainer';
import LoginPopup from './popups/loginpopup/LoginPopup';
import PlayPopup from './popups/playpopup/PlayPopup';
import LoggedInMessage from './popups/loggedinmessage/LoggedInMessage';
import Rules from './Rules';
import Rooms from './Rooms';

const LandingPage = () => {
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [playOpen, setPlayOpen] = useState<boolean>(false);
  const [loggedInMessage, setLoggedInMessage] = useState<boolean>(false);

  const toggleLoginPopup = () => {
    setLoginOpen(!loginOpen);
  };

  const togglePlayPopup = () => {
    setPlayOpen(!playOpen);
  };

  const toggleLoggedInMessage = () => {
    setLoggedInMessage(!loggedInMessage);
  };

  return (
    <div className="flex flex-grow w-full justify-between bg-hero-pattern bg-center bg-contain bg-no-repeat">
      { loginOpen
        || playOpen
        || loggedInMessage
        ? <div className="absolute w-full h-full bg-gray-900 opacity-50" />
        : null }

      <div className="mt-8 ml-8">
        <Rules />
      </div>

      {/* TODO: Testing for socket connection, this component will not live here! */}
      <div className="mt-8 ml-8">
        <Rooms />
      </div>

      <div className="self-end mb-8 mr-8 h-1/3 w-1/4 bg-secondary rounded-lg shadow-lg">
        <ButtonContainer
          openLogin={toggleLoginPopup}
          openPlay={togglePlayPopup}
          openLoggedInMessage={toggleLoggedInMessage}
        />
      </div>

      {loggedInMessage && <LoggedInMessage closeLoggedInMessage={toggleLoggedInMessage} />}
      {loginOpen && <LoginPopup closeLogin={toggleLoginPopup} />}
      {playOpen && <PlayPopup closePlay={togglePlayPopup} />}

    </div>
  );
};

export default LandingPage;
