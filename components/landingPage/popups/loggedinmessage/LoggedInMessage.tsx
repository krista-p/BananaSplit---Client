import Image from "next/image";

const LoggedInMessage = ({ closeLoggedInMessage }) => (
  <div className="ml-32 popup-big w-1/3 h-2/3">
    <div className="flex justify-end">
      <button
        type="button"
        onClick={closeLoggedInMessage}
        className="h-16 w-16 close-button"
      >
        X
      </button>
    </div>

    <div className="m-4 md:mx-8 text-3xl md:text-4xl text-center overflow-y-auto scroll-bar-white">
      <h1>you are already signed in!!</h1>
      <Image
        src="/AWbanana.png"
        alt="Banana"
        width="220"
        height="220"
      />
      <h1>you silly <span className="font-bold text-3xl md:text-5xl text-primary">banana</span>!!</h1>
    </div>
  </div>
);

export default LoggedInMessage;
