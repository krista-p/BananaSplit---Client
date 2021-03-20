const JoinGame = () => {
  const stuff = 0;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="m-4">
        <h1>Join a private room</h1>
        <div>
          <h2>Room Name</h2>
          <input type="text" placeholder="banana_heaven..." className="border-black border-2" />
        </div>
        <div className="m-4">
          <button type="button" className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">Go bananas!</button>
        </div>
      </div>

      <div className="m-4">
        <h1>Join a random game</h1>
        <div className="m-4">
          <button type="button" className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">Join!</button>
        </div>
      </div>

    </div>
  );
};

export default JoinGame;
