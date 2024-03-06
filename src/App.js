
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import AboutMe from './components/AboutMe/AboutMe';
import CryptoNav from './components/Navbar/CryptoNav'
import Projects from './components/Projects/Projects';

function App() {
  return (
    <>

    <CryptoNav />
    <Navbar />
    <Main />

    </>
  );
}

export default App;
