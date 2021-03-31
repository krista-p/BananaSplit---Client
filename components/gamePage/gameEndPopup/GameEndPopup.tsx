import EndStats from './EndStats';
import EndBoard from './EndBoard';
import Link from 'next/link';

const GameEndPopup = ({ winner }) => {
  return (
    <div className="w-screen md:w-screen h-auto top-40 md:top-24 bottom-24 fixed border-secondary border-8 bg-primary shadow-lg rounded-lg overflow-y-scroll">
      <div className="flex flex-row m-2">
        <div className="flex flex-col w-3/4">
          <h1 className="text-xl md:text-3xl m-4">and the winning banana is... <span className="text-2xl md:text-5xl bg-secondary px-2 text-primary rounded-full">{winner}</span></h1>

          <div className="m-4">
            <EndBoard />
          </div>
        </div>
        <div className="flex flex-col w-1/2 md:w-1/4">
          <EndStats />
          <Link href="/">
            <button 
              className="bg-primary hover:bg-secondary border-secondary border-8 text-secondary hover:text-primary font-extrabold text-lg md:text-3xl rounded-full py-3 px-6 m-2 shadow-md focus:outline-none focus:ring-4 focus:ring-white">
              home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameEndPopup;
