
import './App.css';
import Projects from './components/Projects';
import Home from './components/Home';
import Misc from './components/Misc';
import Nav from './components/Nav';

import { Routes, Route }from 'react-router-dom'; 

const App = () => {
  return(
    <div>
    <Nav /> 
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/projects" element={<Projects />}/>
      <Route path="/misc" element={<Misc />}/>
    </Routes>
    </div>
  ); 

}

export default App;
