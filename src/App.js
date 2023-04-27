import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import NavBar from './components/NavBar/NavBar'

function App() {

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
