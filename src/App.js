import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import HomePrincipal from './pages/HomePrincipal/HomePrincipal';
import NavBar from "./components/NavBar/NavBar"
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Footer from './components/Footer/Footer'
import Pay from './pages/payment/Pay'
import About from './pages/About/About';
import FormCreateProduct from './components/admin/formCreateProduct/FormCreateProduct';
import Account from './pages/account/Account';
import HistorialCompra from './pages/HistorialCompra/HistorialCompra'
import Carrito from './pages/Carrito/Carrito';

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname === '/log-in' ? null : <NavBar />}
      {/* {location.pathname === '/pay' ? null : <NavBar />} */}
      <Routes>
        <Route exact path='/pay' element={<Pay />} />
        <Route exact path="/" element={<HomePrincipal />} />
        <Route exact path="/products/:id_producto" element={<Detail />} />
        <Route exact path="/products/:categoria" element={<Products />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path='/products/categoria/:id_categoria_producto' element={<Home />}/>
        <Route exact path="/account" element={<Account/>} />
        <Route exact path='/historial-de-compra' element={<HistorialCompra />} />;
        <Route exact path='/carrito' element={<Carrito />} />;
         <Route exact path="/producto" element={<FormCreateProduct/>} /> 
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

