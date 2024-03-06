
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import AboutMe from './components/AboutMe/AboutMe';
import CryptoNav from './components/Navbar/CryptoNav'

function App() {
  return (
    <>
    <CryptoNav />
    <Navbar />
    <Main />
    <AboutMe />
    </>
  );
}

export default App;
