const Login = () => {
  const stuff = 0;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="m-4">
        <h1>Login</h1>
      </div>

      <div className="m-4">
        <h2>Email</h2>
        <input type="text" placeholder="banana@peel.com..." className="border-black border-2" />
      </div>

      <div className="m-4">
        <h2>Password</h2>
        <input type="text" placeholder="bananabread..." className="border-black border-2"/>
      </div>

      <div className="m-4">
        <button type="button" className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md">Go bananas!</button>
      </div>
    </div>
  );
};

export default Login;
