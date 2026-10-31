import './App.css';
import IdeLayout from './components/ide/IdeLayout';
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return(
      <div className='app'>
        <IdeLayout />
        <Analytics />
      </div>
  );
}

export default App;
