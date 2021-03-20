import { useState } from 'react';
import ButtonContainer from './ButtonContainer';
import LoginPopup from './popups/loginpopup/LoginPopup';
import PlayPopup from './popups/playpopup/PlayPopup';
import Rules from './Rules';

const LandingPage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [playOpen, setPlayOpen] = useState(false);

  const toggleLoginPopup = () => {
    setLoginOpen(!loginOpen);
  };

  const togglePlayPopup = () => {
    setPlayOpen(!playOpen);
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
        <ButtonContainer toggleLogin={toggleLoginPopup} togglePlay={togglePlayPopup} />
      </div>

      {loginOpen && <LoginPopup closeLogin={toggleLoginPopup} />}
      {playOpen && <PlayPopup closePlay={togglePlayPopup} />}

    </div>
  );
};

export default LandingPage;
