import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const ButtonContainer = ({ openLogin, openPlay, openLoggedInMessage }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col fit-content">
      <button type="button" onClick={currentUser ? openLoggedInMessage : openLogin} className="bg-secondary border-primary border-8 hover:bg-primary text-primary hover:text-secondary font-bold text-3xl rounded-full py-3 px-6 m-2 shadow-md">login/register</button>
      <button type="button" onClick={openPlay} className="bg-secondary border-primary border-8 hover:bg-primary text-primary hover:text-secondary font-bold text-3xl rounded-full py-3 px-6 m-2 shadow-md">play</button>
    </div>
  );
};

export default ButtonContainer;
