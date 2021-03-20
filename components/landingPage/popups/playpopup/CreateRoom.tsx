const CreateRoom = () => {
  const stuff = 0;

  return (
    <div>
      <div className="m-4">
        <h1>Create a room!</h1>
        <div>
          <h2>Room Name</h2>
          <input type="text" placeholder="banana_heaven..." className="border-black border-2" />
        </div>
        <div>
          <h2>Number of players</h2>
          <select name="players">
            <option value="2">1</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div className="m-4">
          <button type="button" className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">Go bananas!</button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
