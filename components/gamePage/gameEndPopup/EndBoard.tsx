import Image from 'next/image';

const EndBoard = () => (
  <div className="w-full flex flex-row mt-12 h-full justify-center">
    <div className="flex flex-col w-1/2">
      <div className="border-8 border-secondary h-auto overflow-hidden">
        <Image src="/bananahead.gif" height="560" width="1000" layout="responsive" priority />
      </div>
      <div className="border-8 border-secondary h-auto overflow-hidden">
        <Image src="/bananasprinkler.gif" height="560" width="1000" layout="responsive" priority />
      </div>
    </div>
    <div className="flex flex-col w-1/2">
      <div className="border-8 border-secondary h-auto overflow-hidden">
        <Image src="/minionbanana.gif" height="560" width="1000" layout="responsive" priority />
      </div>
      <div className="border-8 border-secondary h-auto overflow-hidden">
        <Image src="/explodingbanana.gif" height="560" width="1000" layout="responsive" priority />
      </div>
    </div>
  </div>
);

export default EndBoard;
