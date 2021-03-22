const LoginNavbar = ({ closeLogin, handleLoginTab, handleRegisterTab, loginTab }) => (
  <nav className="flex flex-col justify-between w-full md:flex-row md:items-center">
    <button type="button" onClick={handleLoginTab} className={loginTab ? 'h-16 text-2xl text-primary w-2/3 border-t-4 border-r-4 border-primary' : 'h-16 text-2xl text-secondary w-2/3 border-b-4 border-primary'}>Log In</button>

    <button type="button" onClick={handleRegisterTab} className={!loginTab ? 'h-16 text-2xl text-primary w-2/3 border-t-4 border-l-4 border-primary' : 'h-16 text-2xl text-secondary w-2/3 border-b-4 border-primary'}>Register</button>

    <button type="button" onClick={closeLogin} className="h-16 w-24 text-primary text-4xl font-bold bg-secondary border-4 border-primary hover:bg-primary hover:text-secondary rounded-sm">X</button>
  </nav>
);

export default LoginNavbar;
