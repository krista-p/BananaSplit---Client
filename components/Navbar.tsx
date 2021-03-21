import Image from 'next/image';
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
    <nav className="font-sans flex flex-col justify-between w-full py-2 px-6 bg-secondary shadow-lg md:flex-row md:items-center">
      <div className="w-1/4 h=full">
        <Image
          src="/bananasplitlogo.png"
          alt="BananaSplit Logo"
          width="160"
          height="40"
        />
      </div>
      { currentUser
        ? <button type="button" onClick={toggleProfilePopup} className="bg-primary hover:bg-primary_hover text-secondary font-bold py-2 px-4 rounded shadow-md">O</button>
        : null }
      { currentUser && profileOpen
        && (
        <div>
          <button type="button" className="bg-primary hover:bg-primary_hover text-secondary font-bold py-2 px-4 rounded shadow-md">profile</button>
          <button type="button" onClick={() => auth.signOut()} className="bg-primary hover:bg-primary_hover text-secondary font-bold py-2 px-4 rounded shadow-md">log out</button>
        </div>
        ) }
    </nav>
  );
};

export default NavBar;
