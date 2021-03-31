import { useState } from 'react';
import Image from 'next/image';
import ButtonContainer from './ButtonContainer';
import LoginPopup from './popups/loginpopup/LoginPopup';
import PlayPopup from './popups/playpopup/PlayPopup';
import LoggedInMessage from './popups/loggedinmessage/LoggedInMessage';
import Rules from './Rules';

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

      <div className="self-start mt-8 ml-8 h-80 w-80 md:h-100 md:w-100 bg-primary border-8 border-secondary rounded-full shadow-lg">
        <Rules />
      </div>

      <div className="self-end mb-8 mr-8 h-60 w-60 md:h-96 md:w-96 bg-secondary border-8 border-primary rounded-full shadow-lg flex items-center justify-center">
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
