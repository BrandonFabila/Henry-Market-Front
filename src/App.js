import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import HomePrincipal from './pages/HomePrincipal/HomePrincipal';
import NavBar from "./components/NavBar/NavBar"
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import CreateProduct from './pages/CreateProduct/CreateProduct';

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname === '/log-in' ? null : <NavBar />}
      <Routes>
        <Route exact path="/" element={<HomePrincipal />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/registrar-usuario" element={<Register />} />
        <Route exact path="/log-in" element={<Login />} />
        <Route exact path="/producto" element={<CreateProduct/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

