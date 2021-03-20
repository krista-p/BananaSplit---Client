const ButtonContainer = ({ toggleLogin, togglePlay }) => (
  <div className="flex flex-col content-center">
    <button type="button" onClick={toggleLogin} className="bg-black border-yellow-300 border-4 hover:bg-yellow-300 text-yellow-300 hover:text-black font-bold text-3xl py-2 px-4 m-4 rounded shadow-md">login/register</button>
    <button type="button" onClick={togglePlay} className="bg-black border-yellow-300 border-4 hover:bg-yellow-300 text-yellow-300 hover:text-black font-bold text-3xl py-2 px-4 m-4 rounded shadow-md">play</button>
  </div>
);

export default ButtonContainer;
