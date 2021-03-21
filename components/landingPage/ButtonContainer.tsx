import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

const ButtonContainer = ({ openLogin, openPlay, openLoggedInMessage }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col content-center">
      <button type="button" onClick={currentUser ? openLoggedInMessage : openLogin} className="bg-black border-yellow-300 border-4 hover:bg-yellow-300 text-yellow-300 hover:text-black font-bold text-3xl py-2 px-4 m-4 rounded shadow-md">login/register</button>
      <button type="button" onClick={openPlay} className="bg-black border-yellow-300 border-4 hover:bg-yellow-300 text-yellow-300 hover:text-black font-bold text-3xl py-2 px-4 m-4 rounded shadow-md">play</button>
    </div>
  );
};

export default ButtonContainer;
