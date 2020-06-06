import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import "./SignUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignUp = ({ userToken, setUserToken, setAtHome }) => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // update the state which allows to customize the header
  setAtHome(false);

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("les 2 mots de passe diffèrent !");
    } else {
      const data = { email: email, username: name, password: password };

      alert("user creation has been disabled");

      // uncomment to reactivate user creation
      // try {
      //   const response = await axios.post(
      //     "https://leboncoin-project-backend.herokuapp.com/user/sign_up",
      //     data
      //   );

      //   // add the token to the browser's cookie
      //   const token = response.data.token;
      //   Cookies.set("token", token, { expires: 15 });

      //   setUserToken(token);

      //   history.push("/");
      // } catch (error) {
      //   console.log(error.message);
      //   alert(error.message);
      // }
    }
  };

  return (
    <div className="sign-up">
      <div className="container">
        <div className="sign-up-left">
          <h4>Pourquoi créer un compte ?</h4>
          <div className="why-signup">
            <div>
              <FontAwesomeIcon icon="clock" size="2x" className="icon-signup" />
            </div>
            <div>
              <h5 className="why-signup-title">Gagnez du temps</h5>
              <p>
                Publiez vos annonces rapidement, avec vos informations
                pré-remplies chaque fois que vous souhaitez déposer une nouvelle
                annonce.
              </p>
            </div>
          </div>
          <div className="why-signup">
            <div>
              <FontAwesomeIcon icon="bell" size="2x" className="icon-signup" />
            </div>
            <div>
              <h5 className="why-signup-title">Soyez les premiers informés</h5>
              <p>
                Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
                qui vous intéresse.
              </p>
            </div>
          </div>
          <div className="why-signup">
            <div>
              <FontAwesomeIcon icon="eye" size="2x" className="icon-signup" />
            </div>
            <div>
              <h5 className="why-signup-title">Visibilité</h5>
              <p>
                Suivez les statistiques de vos annonces (nombre de fois où votre
                annonce a été vue, nombre de contacts reçus).
              </p>
            </div>
          </div>
        </div>
        <div className="sign-up-right">
          <div>
            <h4>Créer un compte</h4>
            <form id="sign-up-form" onSubmit={handleRegistration}>
              <h5>Pseudo *</h5>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              />
              <br />
              <h5>Adresse email *</h5>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              />
              <br />
              <div className="pwd-section">
                <div>
                  <h5>Mot de passe *</h5>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                    value={password}
                  />
                </div>
                <div>
                  <h5>Confirmer le mot de passe *</h5>
                  <input
                    type="password"
                    name="confirmPwd"
                    id="confirmPwd"
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                    value={confirmPassword}
                  />
                </div>
              </div>
              <div className="terms-link">
                <input type="checkbox" name="accept-terms" id="accept-terms" />{" "}
                « J’accepte les <a href="#">Conditions Générales de Vente</a> et
                les <a href="#">Conditions Générales d’Utilisation</a> »
              </div>
              <button type="submit">Créer mon compte personnel</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
