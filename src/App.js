import { Route, Routes, useLocation  } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import FormUpdateProduct from "./components/admin/formUpdateProduct/FormUpdateProduct"
import ProductListAdmin from './components/admin/ProductListAdmin/ProductListAdmin';
import HomeAdmin from "./components/admin/HomeAdmin/HomeAdmin"
import Usuarios from './components/admin/Usuarios/Usuarios';
import HistorialVentas from './components/admin/HistorialVentas/HistorialVentas';
import ListaCalf from "./components/admin/Listacalf/ListaCalf"
import Cookies from 'js-cookie';

function App() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const userSession = JSON.parse(Cookies.get('user_session'));
    if (userSession && userSession.dataValues) {
      const { admin } = userSession.dataValues;
      setIsAdmin(admin); 
      setIsLoggedIn(true); 
    } else {
      setIsAdmin(false); 
      setIsLoggedIn(false); 
    }
  }, []);

  return (
    <div className="App">
      {location.pathname === '/log-in' ? null : <NavBar />}
      <Routes>
        <Route exact path="/" element={<HomePrincipal />} />
        <Route exact path="/products/:id_producto" element={<Detail />} />
        <Route exact path="/products/:categoria" element={<Products />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/products/categoria/:id_categoria_producto" element={<Home />} />
        <Route exact path="/account" element={<Account />} />
        <Route exact path="/historial-de-compra" element={<HistorialCompra />} />
        <Route exact path="/carrito" element={<Carrito />} />
        <Route exact path='/pay' element={<Pay />} />

        {/* ADMIN */}
        {isLoggedIn && isAdmin && (
          <>
            <Route exact path="/adminHome" element={<HomeAdmin />} />
            <Route exact path="/products/admin" element={<ProductListAdmin />} />
            <Route exact path="/producto" element={<FormCreateProduct />} />
            <Route exact path="/product/:id_producto" element={<FormUpdateProduct />} />
            <Route exact path="/admin/usuarios" element={<Usuarios />} />
            <Route exact path="/historialVentas" element={<HistorialVentas />} />
            <Route exact path="/calificaciones" element={<ListaCalf />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;