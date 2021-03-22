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
      <div className="mt-8 ml-8 h-1/3 w-1/4 bg-secondary rounded-lg shadow-lg">
        <div className="text-primary font-bold text-xl">
          <h1>{userName}</h1>
          <h2>{userEmail}</h2>
        </div>
      </div>

      <div className="self-end mb-8 mr-8 h-1/3 w-1/4 bg-secondary rounded-lg shadow-lg">
        <div className="text-primary font-bold text-xl">
          <h1>Wins</h1>
          <h2>{userScore}</h2>
        </div>

        <div className="text-primary font-bold text-xl">
          <h1>Longest Word</h1>
          <h2>{userLongestWord}</h2>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
