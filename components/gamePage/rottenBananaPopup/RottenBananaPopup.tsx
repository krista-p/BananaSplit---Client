import Link from 'next/link';
import minion from '../../../public/minionbanana.gif';
import Image from 'next/image';

const RottenBananaPopup = ({ winner }) => (
  <div className="w-screen h-screen top-0 left-0 fixed border-secondary border-8 bg-primary shadow-lg">
    <div className="flex flex-col my-4 h-full">
      <div className="flex flex-row justify-between h-24">
        <h1 className="text-xl md:text-4xl ml-12 mt-6">
          <span className="text-2xl md:text-5xl bg-secondary px-2 text-primary rounded-full">{winner}</span>
          ...is a rotten banana!!
        </h1>
        <Link href="/">
          <button
            type="button"
            className="mr-12 mt-2 bg-primary hover:bg-secondary border-secondary border-8 text-secondary hover:text-primary font-extrabold text-lg md:text-5xl rounded-full px-6 shadow-md focus:outline-none focus:ring-4 focus:ring-white"
          >
            home
          </button>
        </Link>
      </div>

      <div className="w-full flex flex-row mt-4 h-full justify-center">
        <div className="flex flex-col w-1/3">
          <div className="border-8 border-secondary h-auto overflow-hidden">
            <Image src="/bananaslip1.gif" height="560" width="1000" layout="responsive" priority />
          </div>
          <div className="border-8 border-secondary h-auto overflow-hidden">
            <Image src="/bananaslip2.gif" height="560" width="1000" layout="responsive" priority />
          </div>
        </div>
        <div className="flex flex-col w-1/3">
          <div className="border-8 border-secondary h-auto overflow-hidden">
            <Image src="/bananaslip3.gif" height="560" width="1000" layout="responsive" priority />
          </div>
          <div className="border-8 border-secondary h-auto overflow-hidden">
            <Image src="/deadbanana.gif" height="560" width="1000" layout="responsive" priority />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RottenBananaPopup;
