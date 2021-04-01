import { useState } from 'react';
import Login from './Login';
import LoginNavbar from './LoginNavbar';
import Register from './Register';

const LoginPopup = ({ closeLogin }) => {
  const [loginTab, setLoginTab] = useState<boolean>(true);

  const handleLoginTab = () => {
    setLoginTab(true);
  };

  const handleRegisterTab = () => {
    setLoginTab(false);
  };

  return (
    <div className="popup-big w-1/3 h-4/5 ml-24 lg:ml-0 overflow-hidden sm:inset-x-0 lg:inset-x-1/4 sm:w-3/4 lg:w-1/2">
      <LoginNavbar
        closeLogin={closeLogin}
        loginTab={loginTab}
        handleLoginTab={handleLoginTab}
        handleRegisterTab={handleRegisterTab}
      />
      { loginTab ? <Login closeLogin={closeLogin} /> : <Register closeLogin={closeLogin} />}
    </div>
  );
};

export default LoginPopup;
