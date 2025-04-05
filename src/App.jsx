import './App.css';
import Projects from './components/Projects';
import Home from './components/Home';
import Misc from './components/Misc';
import Cse20 from './components/Maps/Cse20';
import Cse101 from './components/Maps/Cse101';
import Nav from './components/Nav';
import { Routes, Route } from 'react-router-dom'; 
import { Analytics } from "@vercel/analytics/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const App = () => {
  return(
      <div className='something'>
        <div>
        <QueryClientProvider client={queryClient}>
        <Nav/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/misc" element={<Misc />} />
           <Route path="/misc/cse20" element={<Cse20 />} /> 
           <Route path="/misc/cse101" element={<Cse101 />} /> 
        </Routes>
        <Analytics />
        </QueryClientProvider>
        </div>
      </div>
  ); 
}

export default App;
