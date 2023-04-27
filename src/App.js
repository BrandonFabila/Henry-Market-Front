import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import HomePrincipal from './pages/HomePrincipal/HomePrincipal';
import NavBar from "./components/NavBar/NavBar"

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname === '/log-in' ? null : <NavBar />}
      <Routes>
        <Route exact path="/" element={<HomePrincipal />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/registrar-usuario" element={<Register />} />
        <Route exact path="/log-in" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

