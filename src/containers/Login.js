import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = ({ userToken, setUserToken, setAtHome }) => {
  const history = useHistory();

  // declare state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // update the state which allows to customize the header
  setAtHome(false);

  // function that manages account verification and token recovery
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("email et password obligatoire");
    } else {
      const data = { email: email, password: password };
      try {
        const response = await axios.post(
          "https://leboncoin-project-backend.herokuapp.com/user/log_in",
          data
        );
        // add token into the browser's cookie
        const token = response.data.token;
        Cookies.set("token", token, { expires: 15 });

        setUserToken(token);

        history.push("/");
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="login-title">
          <span>Connexion</span>
        </div>
        <form id="login-form" onSubmit={handleLogin}>
          <h5>Adresse email</h5>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <br />
          <h5>Mot de passe</h5>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <br />
          <button type="submit">Se connecter</button>
        </form>
        <div className="goto-signup">
          <h5>Vous n'avez pas de compte</h5>
          <button
            onClick={(event) => {
              history.push("/sign-up");
            }}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
