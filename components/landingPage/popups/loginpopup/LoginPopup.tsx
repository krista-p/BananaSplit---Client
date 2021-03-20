import { useState } from 'react';
import Login from './Login';
import LoginNavbar from './LoginNavbar';
import Register from './Register';

const LoginPopup = ({ closeLogin }) => {
  const [loginTab, setLoginTab] = useState(true);

  const handleLoginTab = () => {
    setLoginTab(true);
  };

  const handleRegisterTab = () => {
    setLoginTab(false);
  };

  return (
    <div className="w-3/4 h-1/2 left-16 md:w-1/2 md:h-3/4 md:inset-x-1/4 top-24 bottom-24 fixed border-black border-4 bg-white shadow-lg rounded-lg">
      <LoginNavbar
        closeLogin={closeLogin}
        loginTab={loginTab}
        handleLoginTab={handleLoginTab}
        handleRegisterTab={handleRegisterTab}
      />
      { loginTab ? <Login /> : <Register />}
    </div>
  );
};

export default LoginPopup;
