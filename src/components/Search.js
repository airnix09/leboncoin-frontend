import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <>
      <div id="ellipse"></div>
      <div className="Search">
        <div className="container">
          <div className="searchForm">
            <input type="text" placeholder="Que recherchez-vous?" />
            <button>Rechercher</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
