import React from "react";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/img/Logo-Leboncoin.png";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Header = (props) => {
  const history = useHistory();

  // destructuring
  const { userToken, setUserToken } = props;

  return (
    <div className={props.atHome ? "hdr" : "hdr hdr-underlined"}>
      <div className="container">
        <div className="hdr-left">
          <Link to="/">
            <img src={logo} alt="Logo LeBoncoin" />
          </Link>
          <button
            onClick={() => {
              history.push("/publish");
            }}
          >
            <FontAwesomeIcon icon="plus-square" />
            <span>Déposer une annonce</span>
          </button>
          <div
            className={
              props.atHome ? "hdr-search hdr-search-underlined" : "hdr-search"
            }
          >
            <FontAwesomeIcon icon="search" />
            <span>Rechercher</span>
          </div>
        </div>
        {userToken === "" ? (
          <Link to="/login">
            <div className="hdr-right">
              <div>
                <FontAwesomeIcon icon="user" size="2x" />
              </div>
              <div>
                <span className="signup-signout">Se connecter</span>
              </div>
            </div>
          </Link>
        ) : (
          <div
            className="hdr-right"
            onClick={(event) => {
              // delete the token
              Cookies.remove("token");
              setUserToken("");
              history.push("/");
            }}
          >
            <div>
              <FontAwesomeIcon icon="user" size="2x" />
            </div>
            <div>
              <span className="signup-signout">Se déconnecter</span>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default Header;
