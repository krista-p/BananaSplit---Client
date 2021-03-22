import LandingPage from '../components/landingPage/LandingPage';
import NavBar from '../components/Navbar';

const Index = () => (
  <div className="flex flex-col h-screen w-screen font-sans">
    <NavBar />
    <LandingPage />
  </div>
);

export default Index;
