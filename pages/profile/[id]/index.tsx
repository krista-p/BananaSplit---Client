import { useContext } from 'react';
import NavBar from '../../../components/Navbar';
import ProfilePage from '../../../components/profilePage/ProfilePage';
import { AuthContext } from '../../../contexts/auth';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex flex-col h-screen w-screen font-sans">
      <NavBar />
      {currentUser ? <ProfilePage /> : null}
    </div>
  );
};

export default Profile;
