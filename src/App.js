import { Route } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import NavBar from './components/NavBar/NavBar';
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()

  return (
    <div className="App">
      {location.pathname === '/log-in' ? null : <NavBar />}
      <Route exact path="/products" component={Products} />
      <Route exact path="/registrar-usuario" component={Register} />
      <Route exact path="/log-in" component={Login} />
    </div>
  );
}

export default App;
