const LoginNavbar = ({ closeLogin, handleLoginTab, handleRegisterTab, loginTab }) => (
  <nav className="flex flex-row justify-between w-full">
    <button type="button" onClick={handleLoginTab} className={loginTab ? 'open-tab-left' : 'closed-tab'}>log in</button>

    <button type="button" onClick={handleRegisterTab} className={!loginTab ? 'open-tab-right' : 'closed-tab'}>register</button>

    <button type="button" onClick={closeLogin} className="close-button">X</button>
  </nav>
);

export default LoginNavbar;
