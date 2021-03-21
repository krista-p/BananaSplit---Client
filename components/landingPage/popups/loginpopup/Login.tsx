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
      console.log({ errorInSignIn: err });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="m-4 font-bold text-5xl text-secondary">
        <h1>Login</h1>
      </div>

      <form onSubmit={handleLogin}>
        <div className="m-4 flex flex-col items-center">
          <h2 className="m-2 font-bold text-2xl text-primary">Email</h2>
          <input type="text" placeholder="banana@peel.com..." onChange={handleEmailChange} className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" />
        </div>

        <div className="m-4 flex flex-col items-center">
          <h2 className="m-2 font-bold text-2xl text-primary">Password</h2>
          <input type="password" placeholder="bananabread..." onChange={handlePasswordChange} className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" />
        </div>

        <div className="m-4 flex flex-col items-center">
          <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Go bananas!</button>
        </div>
      </form>

    </div>
  );
};

export default Login;
