import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';

const ProfilePage = () => {
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState<string>('');
  const [userScore, setUserScore] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userLongestWord, setUserLongestWord] = useState<string>('');

  const getUserById = async (uid) => {
    await fetch(`http://localhost:4200/user/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.userName);
        setUserEmail(data.email);
        setUserScore(data.score);
        setUserLongestWord(data.longest_word);
      });
  };

  useEffect(() => {
    getUserById(currentUser.uid);
  }, []);

  return (
    <div className="flex flex-grow w-full justify-between bg-hero-pattern bg-center bg-contain bg-no-repeat">
      <div>
        <div className="self-start mt-8 ml-8 h-32 w-32 md:h-60 md:w-60 bg-primary border-4 md:border-8 border-secondary rounded-full shadow-lg">
          <div className="ml-3 mb-4 w-3/4 h-3/4 md:w-full md:h-full">
            <Image
              src="/monkeycap.png"
              alt="Monkey"
              width="190"
              height="250"
            />
          </div>
        </div>

        <div className="ml-8 mt-2 font-bold text-3xl md:text-5xl">
          <h1 className="text-primary">{userName}</h1>
          <h2 className="text-secondary">{userEmail}</h2>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="mt-4 mr-8 h-32 w-32 md:h-60 md:w-60 bg-secondary border-4 md:border-8 border-primary rounded-full shadow-lg">
          <div className="flex flex-col text-3xl md:text-5xl flex items-center text-middle text-primary">
            <h1 className="text-4xl md:text-6xl">wins</h1>
            <h2>{userScore}</h2>
          </div>
        </div>

        <div className="mb-4 r-12 h-32 w-32 md:h-60 md:w-60 bg-secondary border-4 md:border-8 border-primary rounded-full shadow-lg">
          <div className="flex flex-col text-3xl md:text-5xl flex items-center text-middle text-primary">
            <h1 className="text-2xl md:text-4xl">longest word</h1>
            <h2>{userLongestWord}</h2>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
