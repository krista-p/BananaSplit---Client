import Image from 'next/image';
import Link from 'next/link';
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
      <div className="w-1/4 h=full cursor-pointer">
        <Link href="/">
          <Image
            src="/bananasplitlogo.png"
            alt="BananaSplit Logo"
            width="160"
            height="40"
          />
        </Link>
      </div>
      { currentUser
        ? <button type="button" onClick={toggleProfilePopup} className="bg-primary hover:bg-primary_hover text-secondary font-bold py-2 px-4 rounded shadow-md">O</button>
        : null }
      { currentUser && profileOpen
        && (
        <div>
          <Link href="/profile/[id]" as={`/profile/${auth.currentUser.displayName}`}>
            <button type="button" className="bg-primary hover:bg-primary_hover text-secondary font-bold py-2 px-4 rounded shadow-md">profile</button>
          </Link>
          <Link href="/">
            <button type="button" onClick={() => auth.signOut()} className="bg-primary hover:bg-primary_hover text-secondary font-bold py-2 px-4 rounded shadow-md">log out</button>
          </Link>
        </div>
        ) }
    </nav>
  );
};

export default NavBar;
