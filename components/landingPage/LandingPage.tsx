import { useState } from 'react';
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
    <div className="flex flex-grow w-full justify-between">

      <div className="mt-16 ml-8">
        <Rules />
      </div>

      <div className="w-1/3 h-full">
        <img src="../../images/AWbanana.png" alt="banana" className="object-fit h-full w-1/3" />
      </div>

      <div className="bottom-16 right-8 fixed h-1/3 w-1/4 border-black border-4 rounded-lg shadow-lg">
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
