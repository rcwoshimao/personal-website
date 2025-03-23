import './App.css';
import Projects from './components/Projects';
import Home from './components/Home';
import Misc from './components/Misc';
import Cse20 from './components/Maps/Cse20';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom'; 


const App = () => {
  return(
      <div className='something'>
        <div>
        <Nav/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/misc" element={<Misc />} />
           <Route path="/misc/cse20" element={<Cse20 />} /> {/* Correct syntax */}
        </Routes>
        </div>
      </div>
  ); 
}

export default App;
