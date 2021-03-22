import { useRouter } from 'next/router';
import NavBar from '../../../components/Navbar';
import { io } from 'socket.io-client';

const Room = () => {
  const router = useRouter();
  const { id } = router.query;

  const socket = io('http://localhost:4300', {
    withCredentials: true,
  });

  socket.on('init', (message) => {
    console.log(message);
  });


  return (
    <div className="flex flex-col h-screen w-screen font-sans">
      <NavBar />
      <div>room id (random for now): {id}</div>
    </div>
  );
};

export default Room;
