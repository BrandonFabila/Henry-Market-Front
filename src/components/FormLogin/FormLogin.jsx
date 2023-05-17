import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import validation from "./validation";
import swal from "sweetalert";
import axios from "axios";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Google from "../../assets/images/IconGoogle.png";
import { userLoggedIn } from "../../store/actions/index";
import { useNavigate } from "react-router";
import styles from "./FormLogin.module.css";
import Cookies from "js-cookie";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhW3OvXgwXUNXfTggReDMiuJvSY5jhYHE",
  authDomain: "henrymarket-3eac8.firebaseapp.com",
  projectId: "henrymarket-3eac8",
  storageBucket: "henrymarket-3eac8.appspot.com",
  messagingSenderId: "465779412521",
  appId: "1:465779412521:web:fc1ce1b4ed26fd4400d638",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function FormLogin() {
  // const api_host = "http://localhost:3001/";
  const api_host = 'https://henry-market-back-production.up.railway.app/'

  const estado = true;

  // const logOut = false

  const dispatch = useDispatch();

  const iconGoogle = Google;

  const navigate = useNavigate();
  const navigateTo = (url) => {
    navigate(url);
  };

  function login(user) {
    if (user) {
      dispatch(userLoggedIn(estado));
      swal({
        title: "Bienvenido",
        text: "Ya puedes navegar con tu cuenta!",
        icon: "success",
        timer: "2000",
      });

      return Promise.resolve(true);
    } else {
      swal({
        text: "Usuario o contraseña incorrectos",
        icon: "error",
        timer: "2000",
        button: "Accept",
      });
      return Promise.resolve(false);
    }
  }

  const handleLogin = async (values) => {
    try {
      const user = await axios.post(`${api_host}usuario/login`, values);

      const session = user.data.session;
      const token = user.data.token;

      // Almacenar el token y la sesión en cookies con opciones de seguridad
      Cookies.set("user_token", token, { secure: true, sameSite: "strict" });
      Cookies.set("user_session", JSON.stringify(session), {
        secure: true,
        sameSite: "strict",
      });
      const isUserAuthenticated = await login(true);
      if (isUserAuthenticated) {
        localStorage.setItem("estaLogueado", "database");
        navigateTo("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      if (error.response.data.error === "User not enabled for login") {
        swal({
          title: "Tu cuenta ha sido desactivada",
          text: "Por favor contacte a dev.market.henry@gmail.com",
          icon: "error",
          timer: "5000",
        });
      } else {
        swal({
          text: "Correo o contraseña invalidos",
          icon: "error",
          timer: "2000",
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const google = await signInWithPopup(auth, new GoogleAuthProvider());
      const api = await axios.post(
        `${api_host}usuario/login/google`,
        google.user
      );

      if (api.status === 200 && google) {
        swal({
          title: "Bienvenido",
          text: `${api.data.msg}!`,
          icon: "success",
          timer: "2000",
        });
        const googleToken = await google.user.getIdToken();
        Cookies.set("user_token", googleToken, {
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("user_session", JSON.stringify(api.data.session), {
          secure: true,
          sameSite: "strict",
        });
        localStorage.setItem("estaLogueado", "database");
        if ( api.data.session.dataValues.telefono === "5500000000" && api.data.session.dataValues.direccion === "Aun no ha sido asiganada" ) {
          navigateTo("/account");
        } else {
          navigateTo("/");
        }
        console.log(api.data)
      } else {
        swal({
          text: "Usuario o contraseña incorrectos",
          icon: "error",
          timer: "2000",
          button: "Accept",
        });
      }
    } catch (error) {
      if (error.response.data.error === "User not enabled for login") {
        swal({
          title: "Tu cuenta ha sido desactivada",
          text: "Por favor contacte a dev.market.henry@gmail.com",
          icon: "error",
          timer: "5000",
        });
      } else {
        swal({
          title: error,
          icon: "error",
          timer: "5000",
        });
      }
    }
  };

  const [showPwd, setShowPwd] = useState(false);
  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleLogin}
        validate={validation}
        validateOnBlur={false}
        validateOnChange={false}
      >
        <Form className={styles.formContainer}>
          <h1>Login</h1>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className={styles.formInput}
          />
          <ErrorMessage name="email" />
          <Field
            name="password"
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            style={{ marginLeft: "35px" }}
            className={styles.formInput}
          />
          <div style={{ cursor: "pointer" }}>
            <div
              className="position-absolute pointer pwd-icon"
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height={"1.5rem"}
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height={"1.5rem"}
                >
                  <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM22.676 12.553a11.249 11.249 0 01-2.631 4.31l-3.099-3.099a5.25 5.25 0 00-6.71-6.71L7.759 4.577a11.217 11.217 0 014.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0115.75 12zM12.53 15.713l-4.243-4.244a3.75 3.75 0 004.243 4.243z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 00-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 016.75 12z" />
                </svg>
              )}
            </div>
          </div>

          <ErrorMessage name="password" />

          <div className={styles.botones}>
            <button className={styles.botonLogin} type="submit">
              Iniciar sesión
            </button>
            <span style={{ marginLeft: "30px" }}>O también:</span>
            <div className={styles.or}>
              <button
                type="button"
                className={styles.botonRedes}
                onClick={handleGoogleLogin}
              >
                <img
                  style={{ marginRight: "5px" }}
                  className={styles.btnRedes}
                  src={iconGoogle}
                  alt="GoogleLogo"
                />
                Continuar con Google
              </button>
            </div>
          </div>
          <div style={{ margin: "20px" }}>
            <div style={{ border: "1px solid grey", width: "170px" }}></div>{" "}
            <span style={{ margin: "0px 10px" }}>¿No tienes cuenta?</span>{" "}
            <div style={{ border: "1px solid grey", width: "170px" }}></div>
          </div>
          <Link to={"/register"}>
            <button
              type="button"
              style={{ marginRight: "20px" }}
              className={styles.boton}
            >
              Regístrate
            </button>
          </Link>
        </Form>
      </Formik>
    </div>
  );
}
