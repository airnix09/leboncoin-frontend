import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { CardElement, injectStripe } from "react-stripe-elements";
import "./CheckOut.css";

const CheckOut = ({ stripe, userToken }) => {
  const location = useLocation();
  const { title, price, picture, buyer } = location.state;

  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = async (event) => {
    event.preventDefault();

    // we send the card number to Stripe with the buyer's identifier to get stripe verification token
    const stripeResponse = await stripe.createToken({ name: buyer });

    if (stripeResponse.error) {
      alert(stripeResponse.error.message);
    } else {
      // we send the stripe verification token to the backend
      const paymentResponse = await axios.post(
        "https://leboncoin-project-backend.herokuapp.com/pay",
        {
          token: stripeResponse.token.id,
          amount: price,
          description: title,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (paymentResponse.status === 200) {
        setPaymentComplete(true);
      } else {
        alert("An error occurred");
        console.error(paymentResponse);
      }
    }
  };

  return !paymentComplete ? (
    <div className="CheckOut">
      <div className="container">
        <div>
          <h2>Acheter en Ligne</h2>
          <img className="checkOut-pic" src={picture} alt={title} />
          <h3>{title}</h3>
          <span className="checkOut-price">{price} €</span>
        </div>
        <div>
          <h3>Vos coordonnées bancaires</h3>
          <CardElement />
          <button onClick={handlePayment}>Procéder au paiement</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="CheckOut">
      <div className="container">
        <div>
          <h2>Paiement finalisé</h2>
          <img className="checkOut-pic" src={picture} alt={title} />
          <h3>{title}</h3>
          <span className="checkOut-price">{price} €</span>
        </div>
      </div>
    </div>
  );
};

export default injectStripe(CheckOut);
