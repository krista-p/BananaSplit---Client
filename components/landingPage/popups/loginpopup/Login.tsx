import { useState } from 'react';
import { auth } from '../../../../firebase';

const Login = ({ closeLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    closeLogin();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log({ errorInSignIn: err });
    }
  };

  return (
    <div className="flex flex-col items-center overflow-y-auto scroll-bar-white">
      <div className="mt-2 md:mt-8 font-bold text-3xl md:text-6xl text-secondary">
        <h1>login</h1>
      </div>

      <form onSubmit={handleLogin}>
        <div className="md:m-2 flex flex-col items-center">
          <h2 className="popup-title-small">email</h2>
          <input type="text" placeholder="banana@peel.com..." onChange={handleEmailChange} className="input-field" />
        </div>

        <div className="m-2 flex flex-col items-center">
          <h2 className="popup-title-small">password</h2>
          <input type="password" placeholder="bananabread..." onChange={handlePasswordChange} className="input-field" />
        </div>

        <div className="mt-6 flex flex-col items-center">
          <button type="submit" className="button-yellow text-4xl">go bananas!</button>
        </div>
      </form>

    </div>
  );
};

export default Login;
