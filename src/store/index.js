
import { createStore, applyMiddleware, compose } from 'redux'
//middleware 
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer';

//si se tiene instalado compose de reduxdevtools se usa ese y si no el compose de redux comun
const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;


const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))//poder hacer peticiones a un server
);

export default store;