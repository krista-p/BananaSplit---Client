const EndStats = ({ rottenBanana }) => (
  <div className="text-primary text-2xl w-full bg-secondary rounded-2xl p-6 text-center mr-2">
    <div className="mb-2 text-lg md:text-2xl">
      <h1 className="text-lg md:text-3xl p-2 bg-primary text-secondary rounded-full mb-2">longest word</h1>
      <h2>WHO DID IT</h2>
      <h2>WORD HERE</h2>
    </div>
    <div className="mb-2 text-lg md:text-2xl">
      <h1 className="text-lg md:text-3xl p-2 bg-primary text-secondary rounded-full mb-2">most words</h1>
      <h2>WHO DID IT</h2>
      <h2>NUMBER HERE</h2>
    </div>
    <div className="mb-2 text-lg md:text-2xl">
      <h1 className="text-lg md:text-3xl p-2 bg-primary text-secondary rounded-full mb-2">fewest words</h1>
      <h2>WHO DID IT</h2>
      <h2>NUMBER HERE</h2>
    </div>
    {/* only show if there is a rotton banana */}
    <div className="mb-2 text-lg md:text-2xl">
      <h1 className="text-lg md:text-3xl p-2 bg-primary text-secondary rounded-full mb-2">rotten banana</h1>
      <h2>{rottenBanana}</h2>
    </div>
  </div>
);

export default EndStats;
