import Link from 'next/link';
import EndStats from './EndStats';
import EndBoard from './EndBoard';

const GameEndPopup = ({
  winner,
  rottenBanana,
  endGameLongestWord,
  endGameLongestWordUser,
  endGameMostWords,
  endGameMostWordUsers,
}) => (
  <div className="w-screen h-screen top-0 fixed border-secondary border-8 bg-primary shadow-lg overflow-y-auto scroll-bar-dark">
    <div className="flex flex-row m-4">
      <div className="flex flex-col w-3/4">
        <h1 className="text-xl md:text-3xl m-2">
          and the winning banana is...
          <span className="text-2xl md:text-5xl bg-secondary px-2 text-primary rounded-full">{winner}</span>
        </h1>

        <div className="m-4">
          <EndBoard />
        </div>
      </div>
      <div className="flex flex-col w-1/2 md:w-1/4">
        <EndStats
          rottenBanana={rottenBanana}
          endGameLongestWord={endGameLongestWord}
          endGameLongestWordUser={endGameLongestWordUser}
          endGameMostWords={endGameMostWords}
          endGameMostWordUsers={endGameMostWordUsers}
        />
        <Link href="/">
          <button
            type="button"
            className="bg-primary hover:bg-secondary border-secondary border-8 text-secondary hover:text-primary font-extrabold text-lg md:text-3xl rounded-full py-3 px-6 m-2 shadow-md focus:outline-none focus:ring-4 focus:ring-white"
          >
            home
          </button>
        </Link>
      </div>
    </div>
  </div>
);

export default GameEndPopup;
