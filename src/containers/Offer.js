import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Offer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const Offer = (props) => {
  // get ad's ID
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // update the state which allows to customize the header
  props.setAtHome(false);

  const fetchData = async () => {
    try {
      const urlbase = "https://leboncoin-project-backend.herokuapp.com/offer/";
      let url = urlbase + id;
      const response = await axios.get(url);
      setData(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="product">
      <div className="container">
        {isLoaded && (
          <div className="display-product">
            <div className="product-info">
              <div className="product-illustration">
                <div className="product-img">
                  {data.pictures.length > 0 && (
                    <img src={data.pictures[0]} alt={data.title} />
                  )}
                </div>
                <div className="product-sum">
                  <div>
                    <h2>{data.title}</h2>
                    <p className="product-price">
                      {data.price && data.price + " €"}
                    </p>
                  </div>
                  <div>
                    <p className="product-created">
                      {moment(data.created).format("DD/MM/YYYY à HH:mm")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="product-desc">
                <h4>Description</h4>
                <p>{data.description}</p>
              </div>
            </div>
            <div className="basket-container">
              <div className="basket">
                <div className="owner-info">
                  <p className="owner">{data.creator.account.username}</p>
                  <p className="owner-offers">5 annonces en lignes</p>
                </div>
                <div className="get-product">
                  {props.userToken ? (
                    <Link
                      to={{
                        pathname: "/payment",
                        state: {
                          title: data.title,
                          price: data.price,
                          picture: data.pictures[0],
                          buyer: "nom-acheteur",
                        },
                      }}
                    >
                      <button>
                        <FontAwesomeIcon icon="shopping-cart" />{" "}
                        <span>Acheter</span>
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <button>
                        <FontAwesomeIcon icon="shopping-cart" />{" "}
                        <span>Acheter</span>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Offer;
