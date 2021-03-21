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
      console.log({ errorInSignUp: err });
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="m-4">
        <h1>Login</h1>
      </div>

      <form onSubmit={handleLogin}>
        <div className="m-4">
          <h2>Email</h2>
          <input type="text" placeholder="banana@peel.com..." onChange={handleEmailChange} className="border-black border-2" />
        </div>

        <div className="m-4">
          <h2>Password</h2>
          <input type="password" placeholder="bananabread..." onChange={handlePasswordChange} className="border-black border-2" />
        </div>

        <div className="m-4">
          <button type="submit" className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">Go bananas!</button>
        </div>
      </form>

    </div>
  );
};

export default Login;
