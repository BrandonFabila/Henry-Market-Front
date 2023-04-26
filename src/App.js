import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import './App.css';

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location?.pathname == "/log-in" ? null : <NavBar />}
      <Routes>
        <Route exact path="/" component={NavBar} />
      </Routes>
    </div>
  );
}

export default App;
