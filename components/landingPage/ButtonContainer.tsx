import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const ButtonContainer = ({ openLogin, openPlay, openLoggedInMessage }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col fit-content">
      <button
        type="button"
        onClick={currentUser ? openLoggedInMessage : openLogin}
        className="button-landing"
      >
        login/register
      </button>
      <button
        type="button"
        onClick={openPlay}
        className="button-landing"
      >
        play
      </button>
    </div>
  );
};

export default ButtonContainer;
