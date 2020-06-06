import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Offers.css";
import Search from "../components/Search";

const Offers = (props) => {
  let itemsByPage = 5; // number of ads per page
  const allPages = []; // table containing the list of url contained in pagination

  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageSelected, setPageSelected] = useState(0);
  const [page, setPage] = useState(
    "https://leboncoin-project-backend.herokuapp.com/offer/with-count?sort=date-desc&skip=0&limit=" +
      itemsByPage
  );

  // update the state which allows to customize the header
  props.setAtHome(true);

  // function that will build pagination
  const getPages = (counter) => {
    const urlBase =
      "https://leboncoin-project-backend.herokuapp.com/offer/with-count?sort=date-desc";

    if (isLoaded && counter) {
      const numPages = Math.ceil(counter / itemsByPage);

      for (let i = 0; i < Math.ceil(numPages); i++) {
        allPages.push(
          urlBase + "&skip=" + itemsByPage * i + "&limit=" + itemsByPage
        );
      }
    } else {
      allPages.push(urlBase + "&skip=" + 0 + "&limit=" + itemsByPage);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(page);
      setData(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (isLoaded) {
    // build pagination according to the data recovered
    getPages(data.count);
  }

  // format date manually
  const dateFr = (dateString) => {
    let newDate = "";

    const dateFR = new Date(dateString).toLocaleDateString();
    const dateHour = new Date(dateString).getHours();
    const dateMin = new Date(dateString).getMinutes();
    newDate = dateFR + " à " + dateHour + ":" + dateMin;
    return newDate;
  };

  return (
    <div className="offers">
      <Search />
      <div className="container">
        {isLoaded &&
          data.offers.map((product, index) => {
            return (
              <Link to={"/offer/" + product._id} key={product._id}>
                <div className="offer" key={product._id}>
                  <div className="offer-illustration">
                    {product.pictures.length > 0 && (
                      <img src={product.pictures[0]} alt={product.title} />
                    )}
                  </div>
                  <div className="offer-info">
                    <div>
                      <h3>{product.title}</h3>
                      <p className="product-price">
                        {product.price && product.price + " €"}
                      </p>
                    </div>
                    <div>
                      <p className="product-created">
                        {dateFr(product.created)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        <div className="list-pages">
          <span>-</span>
          {isLoaded &&
            allPages.map((elem, index) => {
              return (
                <span
                  key={index}
                  onClick={(event) => {
                    event.preventDefault();
                    setPage(elem);
                    setPageSelected(index);
                  }}
                  className={pageSelected === index ? "isSelected" : null}
                >
                  {index + 1}
                </span>
              );
            })}
          <span>+</span>
        </div>
      </div>
    </div>
  );
};

export default Offers;
