import { useState} from 'react';
import './App.css';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const signIn = () => {
    setIsLogged(true);
  };

  return (
    <Router>
      <div className="App">
      {!isLogged
        ?
        <Login
        signIn={signIn} 
        />
        :
        <Home/>
      }
    </div>
    </Router>
    
  );
}

export default App;
