import Image from "next/image";

const LoggedInMessage = ({ closeLoggedInMessage }) => (
  <div className="popup-big">
    <div className="flex justify-end">
      <button
        type="button"
        onClick={closeLoggedInMessage}
        className="h-16 w-16 close-button"
      >
        X
      </button>
    </div>

    <div className="m-4 md:m-8 text-3xl md:text-4xl text-center">
      <h1>you are already signed in!!</h1>
      <Image
        src="/AWbanana.png"
        alt="Banana"
        width="200"
        height="200"
      />
      <h1>you silly <span className="font-bold text-3xl md:text-5xl text-primary">banana</span>!!</h1>
    </div>
  </div>
);

export default LoggedInMessage;
