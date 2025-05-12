import './App.css';
import Projects from './components/Projects';
import Home from './components/Home';
import Misc from './components/Misc';
import Cse20Map from './components/Maps/Cse20Map.jsx';
import Cse101Map from './components/Maps/Cse101Map.jsx';
import Nav from './components/Nav';
import CourseworksPage from './components/CourseworksPage';
import { Routes, Route } from 'react-router-dom'; 
import { Analytics } from "@vercel/analytics/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const App = () => {
  return(
      <div className='app'>
        <div>
        <QueryClientProvider client={queryClient}>
        <Nav/> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/misc" element={<Misc />} />
          <Route path="/misc/courseworks" element={<CourseworksPage />} />
          <Route path="/projects/cse20map" element={<Cse20Map />} /> 
          <Route path="/projects/cse101map" element={<Cse101Map />}/> 
        </Routes>
        <Analytics />
        </QueryClientProvider>
        </div>
      </div>
  ); 
}

export default App;
