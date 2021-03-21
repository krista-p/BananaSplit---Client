const LoggedInMessage = ({ closeLoggedInMessage }) => (
  <div className="w-3/4 h-1/2 left-16 md:w-1/2 md:h-1/4 md:inset-x-1/4 top-24 bottom-24 fixed border-black border-4 bg-white shadow-lg rounded-lg">
    <h1>You are already signed in!!!</h1>
    <button type="button" onClick={closeLoggedInMessage} className="h-16 w-16 text-black font-bold bg-yellow-300 border-4 border-black rounded-sm">X</button>
  </div>
);

export default LoggedInMessage;
