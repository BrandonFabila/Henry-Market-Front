import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import validation from './validation'
import swal from 'sweetalert'
import axios from 'axios'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Google from "../../assets/images/IconGoogle.png"
import { userLoggedIn } from "../../store/actions/index"
import { useNavigate } from 'react-router';
import styles from "./FormLogin.module.css"


import Cookies from 'js-cookie';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhW3OvXgwXUNXfTggReDMiuJvSY5jhYHE",
  authDomain: "henrymarket-3eac8.firebaseapp.com",
  projectId: "henrymarket-3eac8",
  storageBucket: "henrymarket-3eac8.appspot.com",
  messagingSenderId: "465779412521",
  appId: "1:465779412521:web:fc1ce1b4ed26fd4400d638"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

export default function FormLogin() {


  const estado = true

  // const logOut = false

    const dispatch = useDispatch()

    const iconGoogle = Google;

    const BACK_HOST = 'http://localhost:3001/'
    // const BACK_HOST = 'https://henry-market-back-production.up.railway.app/'

    const navigate = useNavigate();
    const navigateTo = (url) => {
        navigate(url);
    }

    function login(user) {
        if (user) {
       dispatch(userLoggedIn(estado))
          swal({
            title: 'Bienvenido',
            text: 'Ya puedes navegar con tu cuenta!',
            icon: 'success',
            timer: '2000'
          });


          return Promise.resolve(true);
        } else {
          swal({
            text: 'Usuario o contraseña incorrectos',
            icon: 'error',
            timer: '2000',
            button: 'Accept'
          });
          return Promise.resolve(false);
        }
      }
  

const handleLogin = async (values) => {
  try {
    const user = await axios.post(`${BACK_HOST}usuario/login`, values);

    console.log("USER:  ",user)
    const session = user.data.session;
    const token = user.data.token;
    console.log("session:  ",session)
    console.log("token:  ",token)

    // Almacenar el token y la sesión en cookies con opciones de seguridad
    Cookies.set('user_token', token, { secure: true, sameSite: 'strict' });
    Cookies.set('user_session', JSON.stringify(session), { secure: true, sameSite: 'strict' });

    const isUserAuthenticated = await login(true);
    if (isUserAuthenticated) {
      localStorage.setItem("estaLogueado", "database")
      navigateTo('/');
    } else {
      console.log('Login failed');
    }
  } catch (error) {
    // const err = error.response.data;
    console.log(error)
    swal({
      text: 'Invalid email or password',
      icon: 'error',
      timer: '2000'
    });
    // console.log(err)
  }
};

      
      
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            if (user) {
                swal({
                    title: 'Bienvenido',
                    text: 'Ya puedes navegar con tu cuenta!',
                    icon: 'success',
                    timer: '2000'
                });
                localStorage.setItem("estaLogueado", "google")
                navigateTo('/'); // Redirigir a la ruta localhost:3000/home
            } else {
                swal({
                    text: 'Usuario o contraseña incorrectos',
                    icon: 'error',
                    timer: '2000',
                    button: 'Accept'
                });
            }
        } catch (error) {
            const err = error.response.data;
            swal({
                text: err.msg,
                icon: 'error',
                timer: '2000'
            });
        }
    }
    return (
        <div className={styles.container}>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={handleLogin}
                validate={validation}   
                validateOnBlur={false}
                validateOnChange={false}
            >

                <Form className={styles.formContainer}>
                  <h1>Login</h1>
                  <Field name='email' type='email' placeholder='Email' className={styles.formInput} />
                  <ErrorMessage name='email' />
                  <Field name='password' type='password' placeholder='Password' className={styles.formInput} />
                  <ErrorMessage name='password' />

                  <div className={styles.botones}>
                    <button  className={styles.botonLogin} type='submit' >Iniciar sesión</button>
                    <div>
                        <div style={{ border: '1px solid grey', width: '150px' }}></div> <span style={{ margin: '0px 10px' }}>¿No tienes cuenta?</span> <div style={{ border: '1px solid grey', width: '150px' }}></div>
                    </div>
                    <Link to={'/registrar-usuario'}>
                        <button type="button" className={styles.boton}>Registrarse</button>
                    </Link>
                  </div>
                  <div className={styles.or} >
                          <button type="button" className={styles.botonRedes} onClick={handleGoogleLogin}><img className={styles.btnRedes} src={iconGoogle} alt='GoogleLogo' /></button>
                  </div>

                </Form>

            </Formik>
        </div>
    )
}
