import { useState } from 'react';
import { auth } from '../../../../firebase';
import { createUser } from '../../../lib/api/api';

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

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    closeLogin();
    try {
      await auth.createUserWithEmailAndPassword(newEmail, newPassword);
      const user = auth.currentUser;
      await user.updateProfile({
        displayName: userName,
      });
      const { uid } = user;
      createUser(newEmail, userName, uid);
    } catch (err) {
      console.log({ errorInSignUp: err });
    }
  };

  return (
    <div className="flex flex-col items-center">

      <div className="mt-2 md:mt-4 font-bold text-xl md:text-2xl text-secondary">
        <h1>Register</h1>
      </div>

      <form onSubmit={handleSignUp}>
        <div className="flex flex-col items-center">
          <h2 className="popup-title-small">Email</h2>
          <input type="text" name="email" placeholder="banana@peel.com..." onChange={handleNewEmailChange} className="input-field-small" />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="popup-title-small">Username</h2>
          <input type="text" name="userName" placeholder="bananaKing..." onChange={handleUserName} className="input-field-small" />
        </div>

        <div className="flex flex-col items-center">
          <h2 className="popup-title-small">Password</h2>
          <input type="password" name="password" placeholder="bananabread..." onChange={handleNewPasswordChange} className="input-field-small" />
        </div>

        <div className="m-2 md:m-4 flex flex-col items-center">
          <button type="submit" className="button-yellow">Become the banana!</button>
        </div>

      </form>

    </div>
  );
};

export default Register;
