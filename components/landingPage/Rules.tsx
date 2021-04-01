const Rules = () => (
  <div className="m-12">
    <div className="flex items-center justify-center">
      <h1 className="text-secondary text-5xl font-bold">rules</h1>
    </div>
    <div className="m-4 h-36 md:h-72 text-sm md:text-lg overflow-y-auto scroll-bar-rules text-center">
      <ul className="m-2">
        <li>
          <span className="text-2xl font-bold">object: </span>
          become banana master and use up all of your tiles!
        </li>
        <li>
          <span className="text-2xl font-bold">1.</span> the room host will start the game and players will receive a starting amount of tiles in their pile.
        </li>
        <li>
        <span className="text-2xl font-bold">2.</span> drag tiles to the board and create words. words must read left to right or top to bottom. you are allowed to rearrange, use the reset button to put tiles back to your pile.
        </li>
        <li>
        <span className="text-2xl font-bold">3.</span> once you run out of tiles in your pile and your words are connected, press the peel button. each player will receive another tile. keep track of the bunch count!!
        </li>
        <li>
        <span className="text-2xl font-bold">4.</span> you are allowed to get rid of a tile by dragging it to the dump zone, but you will receive 3 more tiles!
        </li>
        <li>
        <span className="text-2xl font-bold">5.</span> when the bunch is less than the amount of players in the room, the person to use all of their tiles and press the BANANA button is the banana master!!
        </li>
        <li>
        <span className="text-2xl font-bold">NOTE: </span> if you press BANANA and have a mispelled word on the board, you will automatically lose and become the ROTTEN BANANA. the others will continue to play until the banana master is found!
        </li>
      </ul>
    </div>
  </div>
);

export default Rules;
