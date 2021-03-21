import { useState } from 'react';
import { auth } from '../../../../firebase';

const Register = ({ closeLogin }) => {
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    closeLogin();
    try {
      await auth.createUserWithEmailAndPassword(newEmail, newPassword);
      const user = auth.currentUser;
      console.log(user)
    } catch (err) {
      console.log({ errorInSignUp: err });
    }
  };

  return (
    <div className="flex flex-col items-center">

      <div className="font-bold text-4xl text-secondary">
        <h1>Register</h1>
      </div>

      <form onSubmit={handleSignUp}>
        <div className="m-2 flex flex-col items-center">
          <h2 className="m-2 font-bold text-2xl text-primary">Email</h2>
          <input type="text" placeholder="banana@peel.com..." onChange={handleNewEmailChange} className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" />
        </div>

        <div className="m-4 flex flex-col items-center">
          <h2 className="m-2 font-bold text-2xl text-primary">Username</h2>
          <input type="text" placeholder="bananaKing..." className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" />
        </div>

        <div className="m-4 flex flex-col items-center">
          <h2 className="m-2 font-bold text-2xl text-primary">Password</h2>
          <input type="password" placeholder="bananabread..." onChange={handleNewPasswordChange} className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" />
        </div>

        <div className="m-4 flex flex-col items-center">
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Become the banana!</button>
        </div>

      </form>

    </div>
  );
};

export default Register;
