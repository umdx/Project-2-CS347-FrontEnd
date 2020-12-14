import React, { useState, useEffect } from "react";
import PokemonService from "../services/PokemonService";

const Pokemon = props => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentPokemon, setCurrentPokemon] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getPokemon = id => {
    PokemonService.get(id)
      .then(response => {
        setCurrentPokemon(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getPokemon(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPokemon({ ...currentPokemon, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentPokemon.id,
      title: currentPokemon.title,
      description: currentPokemon.description,
      published: status
    };

    PokemonService.update(currentPokemon.id, data)
      .then(response => {
        setCurrentPokemon({ ...currentPokemon, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePokemon = () => {
    PokemonService.update(currentPokemon.id, currentPokemon)
      .then(response => {
        console.log(response.data);
        setMessage("The Pokemon was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deletePokemon = () => {
    PokemonService.remove(currentPokemon.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/tutorials");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentPokemon ? (
        <div className="edit-form">
          <h4>Pokemon</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentPokemon.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentPokemon.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentPokemon.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentPokemon.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deletePokemon}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updatePokemon}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Pokemon...</p>
        </div>
      )}
    </div>
  );
};

export default Pokemon;