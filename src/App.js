import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
