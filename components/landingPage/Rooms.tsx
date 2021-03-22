// TODO: Testing for rooms, this component will not live here.
import { io } from 'socket.io-client';

const Rooms = () => {
  const socket = io('http://localhost:4300', {
    withCredentials: true,
  });

  socket.on('init', (message) => {
    console.log(message);
  })  

  return (
    <div className="flex h-1/6 w-1/8 bg-primary rounded-lg shadow-lg">
      <div className="flex flex-col">
        <div className="flex w-full h-auto bg-secondary text-primary text-xl md:text-5xl rounded-t-lg justify-center">
          <h1 className="p-2">Rooms</h1>
        </div>
        <div className="flex w-80 justify-center">
          <div className="flex">
            Testing Playground for Rooms

          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
