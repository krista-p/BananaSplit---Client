import { useRouter } from 'next/router';
import NavBar from '../../../components/Navbar';

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex flex-col h-screen w-screen font-sans">
      <NavBar />
      <div>room id (random for now): {id}</div>
    </div>
  );
};

export default Room;
