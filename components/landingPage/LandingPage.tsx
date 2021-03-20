import ButtonContainer from './ButtonContainer';
import Rules from './Rules';

const LandingPage = () => (
  <div className="flex flex-grow border-pink-700 border-8 w-full justify-between">
    <Rules />
    <div className="w-1/3 h-full">
      <img src="../../images/AWbanana.png" alt="banana" className="object-fit h-full w-1/3" />
    </div>
    <ButtonContainer />
  </div>
);

export default LandingPage;
