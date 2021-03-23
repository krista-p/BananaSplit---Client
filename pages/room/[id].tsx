import { useRouter } from 'next/router';
import { useContext } from 'react';
import { socket } from '../../components/landingPage/popups/playpopup/CreateRoom';
import NavBar from '../../components/Navbar';
import { AuthContext } from '../../contexts/auth';

const Room = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const { id } = router.query;

  socket.on('init', (message) => {
    console.log(message);
  });

  socket.on('clientCount', (count) => {
    console.log(count);
  });

  return (
    <div className="flex flex-col h-screen w-screen font-sans items-center">
      <NavBar />

      <div className="flex flex-col items-center">
        <div>Room ID: {id} </div>
        <div>Socket ID: {socket.id} </div>
      </div>

      <div className="flex flex-col justify-center items-center border-black border-2 w-1/6 h-1/6 rounded-lg">
        <div>Socket Room #</div>
        <div></div>
        <div>Player: {currentUser.displayName}</div>
      </div>
    </div>
  );
};

export default Room;
