import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";
import Cookies from "js-cookie";
import "./reset.css";
import Header from "./components/Header";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import SignUp from "./containers/SignUp";
import Login from "./containers/Login";
import Publish from "./containers/Publish";
import CheckOut from "./containers/CheckOut";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faPlusSquare,
  faUser,
  faSearch,
  faEye,
  faBell,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faShoppingCart,
  faPlusSquare,
  faUser,
  faSearch,
  faEye,
  faBell,
  faClock
);

function App() {
  // retrieve the token store in the browser
  const browserToken = Cookies.get("token");

  let initUser = "";
  if (browserToken) {
    initUser = browserToken;
  }

  // store the token into a state
  const [userToken, setUserToken] = useState(initUser);

  // state used to customize the header when we are on the home page
  const [atHome, setAtHome] = useState(false);

  return (
    <>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUB_KEY}>
        <Router>
          <Header
            userToken={userToken}
            setUserToken={setUserToken}
            atHome={atHome}
          />
          <Switch>
            <Route path="/offer/:id">
              <Offer
                atHome={atHome}
                setAtHome={setAtHome}
                userToken={userToken}
              />
            </Route>
            <Route path="/sign-up">
              <SignUp
                userToken={userToken}
                setUserToken={setUserToken}
                setAtHome={setAtHome}
              />
            </Route>
            <Route path="/login">
              <Login
                userToken={userToken}
                setUserToken={setUserToken}
                setAtHome={setAtHome}
              />
            </Route>
            <Route path="/publish">
              <Publish userToken={userToken} setAtHome={setAtHome} />
            </Route>
            <Route path="/payment">
              <Elements>
                <CheckOut userToken={userToken} />
              </Elements>
            </Route>
            <Route path="/">
              <Offers atHome={atHome} setAtHome={setAtHome} />
            </Route>
          </Switch>
        </Router>
      </StripeProvider>
    </>
  );
}

export default App;
