import { Route } from 'react-router-dom';
import './App.css';
import Products from './components/Products/Products';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
function App() {
  const location = useLocation()

  return (
    <div className="App">
        <Route exact path="/products" component={Products } />
        <Route exact path="/registrar-usuario" component={Register} />
        <Route exact path="/log-in" component={Login} />


    </div>
  );
}

export default App;
