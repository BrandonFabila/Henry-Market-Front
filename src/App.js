import { Route } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import HomePrincipal from './pages/HomePrincipal/HomePrincipal';
function App() {
  return (
    <div className="App">     
        <Route exact path="/" component={HomePrincipal} />
        <Route exact path="/products" component={Products } />
        <Route exact path="/registrar-usuario" component={Register} />
        <Route exact path="/log-in" component={Login} />


    </div>
  );
}

export default App;
