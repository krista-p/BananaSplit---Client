import Image from 'next/image';

const MobilePopup = () => (
  <div className="visibile sm:invisible bg-secondary text-primary fixed h-screen h-mobile w-screen w-mobile">
    <div className="m-16">
      <h1 className="ml-8 text-3xl ">not ready for mobile devices!</h1>
      <h1 className="ml-28 text-4xl ">coming soon!!</h1>
    </div>
    <Image
      src="/minionbanana.gif"
      width="600"
      height="300"
    />
  </div>
);

export default MobilePopup;
