import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Publish.css";

const Publish = (props) => {
  let history = useHistory();

  // destructuring
  const { setAtHome, userToken } = props;

  // states used
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [pictures, setPictures] = useState({});

  // update the state which allows to customize the header
  setAtHome(false);

  const handlePublish = async (event) => {
    event.preventDefault();
    try {
      // add the token in the header of the axios request
      const config = {
        headers: {
          Authorization: `Bearer ${props.userToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      // build data for axios request
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("price", price);
      formData.append("pictures", pictures);

      const url =
        "https://leboncoin-project-backend.herokuapp.com/offer/publish";

      const response = await axios.post(url, formData, config);

      // redirection vers l'offre publié
      history.push("/offer/" + response.data._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Publish">
      <div className="container">
        {userToken ? (
          <div className="publish-wrapper">
            <div className="publish-title">
              <span>Déposer une annonce</span>
            </div>
            <form id="publish-form" onSubmit={handlePublish}>
              <h5>Titre de l'annonce *</h5>
              <input
                type="text"
                name="publish-title"
                id="publish-title"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
              <br />
              <h5>Texte de l'annonce *</h5>
              <textarea
                name="publish-desc"
                id="publish-desc"
                rows="5"
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
                value={desc}
              ></textarea>
              <br />
              <h5>Prix *</h5>
              <input
                type="number"
                name="publish-price"
                id="publish-price"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                value={price}
              />{" "}
              €
              <br />
              <h5>Photo *</h5>
              <input
                type="file"
                name="publish-picture"
                id="publish-picture"
                onChange={(event) => {
                  setPictures(event.target.files[0]);
                }}
              />
              <br />
              <button type="submit">valider</button>
            </form>
          </div>
        ) : (
          <div className="publish-wrapper">
            <div className="publish-title">
              <span>
                Merci de vous connecter <br />
                pour déposer une annonce
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publish;
