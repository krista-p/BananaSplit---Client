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
    <nav className="flex justify-between w-full px-8 bg-secondary shadow-lg flex-row md:items-center">
      <div className="cursor-pointer">
        <Link href="/">
          <Image
            src="/bananasplitlogo.png"
            alt="BananaSplit Logo"
            width="195"
            height="62"
          />
        </Link>
      </div>
      { currentUser
        ? (
          <div onClick={toggleProfilePopup} className="profile-button">
            <div className="w-full h-full cursor-pointer ml-1">
              <Image
                onClick={toggleProfilePopup}
                src="/monkeycap.png"
                alt="Monkey"
                width="40"
                height="50"
              />
            </div>
          </div>
        )
        : null }
      { currentUser && profileOpen
        && (
        <div className="absolute bg-secondary border-4 border-primary h-24 right-12 w-32 mt-16 md:mt-40 origin-top-right rounded-md shadow-lg md:w-32">
          <Link href="/profile/[id]" as={auth.currentUser ? `/profile/${auth.currentUser.displayName}` : null}>
            <div className="profile-tab">
              profile
            </div>
          </Link>
          <Link href="/">
            <div onClick={() => auth.signOut()} className="profile-tab">
              log out
            </div>
          </Link>
        </div>
        ) }
    </nav>
  );
};

export default NavBar;
