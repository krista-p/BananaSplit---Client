import LandingPage from '../components/landingPage/LandingPage';
import NavBar from '../components/Navbar';
import MobilePopup from '../components/MobilePopup';

const Index = () => (
  <div className="flex flex-col h-screen w-screen font-sans">
    <NavBar />
    <LandingPage />
    <MobilePopup />
  </div>
);

export default Index;
