import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import Register from './pages/register/register';
function App() {
  return (
    <div className="App">
        <Route path="/" element={<Products />} />
        <Route exact path="/registrar-usuario" component={Register} />

    </div>
  );
}

export default App;
