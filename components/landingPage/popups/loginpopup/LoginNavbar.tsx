const LoginNavbar = ({ closeLogin, handleLoginTab, handleRegisterTab, loginTab }) => (
  <nav className="flex flex-col justify-between w-full md:flex-row md:items-center">
    <button type="button" onClick={handleLoginTab} className={loginTab ? 'h-16 text-yellow-300 w-2/3 border-t-8 border-r-8 border-yellow-300' : ' h-16 text-black w-2/3 border-b-4 border-yellow-300'}>Log In</button>

    <button type="button" onClick={handleRegisterTab} className={!loginTab ? 'h-16 text-yellow-300 w-2/3 border-t-8 border-l-8 border-yellow-300' : 'h-16 text-black w-2/3 border-b-4 border-yellow-300'}>Register</button>

    <button type="button" onClick={closeLogin} className="h-16 w-16 text-black font-bold bg-yellow-300 border-4 border-black rounded-sm">X</button>
  </nav>
);

export default LoginNavbar;
