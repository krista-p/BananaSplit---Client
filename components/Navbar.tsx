import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { auth } from '../firebase';

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const toggleProfilePopup = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <nav className="font-sans flex flex-col justify-between w-full py-2 px-6 bg-black shadow-lg md:flex-row md:items-center">
      <h1 className="text-yellow-300 text-xl font-bold">Banana Split</h1>
      { currentUser
        ? <button type="button" onClick={toggleProfilePopup} className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">profile</button>
        : null }
      { currentUser && profileOpen
        && (
        <div>
          <button type="button" className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">profile</button>
          <button type="button" onClick={() => auth.signOut()} className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">log out</button>
        </div>
        ) }
    </nav>
  );
};

export default NavBar;
