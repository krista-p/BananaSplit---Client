import { useRouter } from 'next/router';
import NavBar from '../../../components/Navbar';

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex flex-col h-screen w-screen font-sans">
      <NavBar />
      <div>username: {id}</div>
    </div>
  );
};

export default Profile;
