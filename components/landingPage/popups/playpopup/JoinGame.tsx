import Link from "next/link";
import { useState } from "react";
import { socket } from "./CreateRoom";

const JoinGame = () => {
  const [inputCode, setInputCode] = useState('');

  const handleInputCode = (e) => {
    setInputCode(e.target.value);
  }

  const handleJoinGame = (e) => {
    try {
      console.log(inputCode);
      e.preventDefault();
      socket.emit('joinGame', inputCode);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center">

      <div className="m-4 font-bold text-5xl text-secondary">
        <h1>Join A Room</h1>
      </div>

      <div className="flex flex-row">
        <form>
          <div className="m-4 flex flex-col items-center">
            <h2 className="m-2 font-bold text-2xl text-primary">Private</h2>
            <input type="text" placeholder="enter room code..." className="focus:outline-none focus:ring-4 focus:ring-primary bg-secondary text-primary rounded-full py-3 px-6" value={inputCode} onChange={handleInputCode} />

            <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md" onClick={handleJoinGame}>Go bananas!</button>
          </div>
        </form>

        <form>
          <div className="m-4 flex flex-col items-center">
            <h2 className="m-2 font-bold text-2xl text-primary">Random</h2>
            <div className="m-4 flex flex-col items-center">
              <button type="submit" className="bg-primary hover:bg-primary_hover text-secondary font-bold text-2xl rounded-full py-2 px-5 m-2 shadow-md">Go bananas!</button>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default JoinGame;
