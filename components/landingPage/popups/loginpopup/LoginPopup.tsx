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
    <div className="popup-big w-1/3 ml-32 overflow-hidden">
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
