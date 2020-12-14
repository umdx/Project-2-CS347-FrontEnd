import React, { useState, useEffect } from "react";
import PokemonService from "../services/PokemonService";
import { Link } from "react-router-dom";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrievePokemon();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrievePokemon = () => {
    PokemonService.getAll()
      .then(response => {
        setPokemon(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePokemon();
    setCurrentPokemon(null);
    setCurrentIndex(-1);
  };

  const setActivePokemon = (pokemon, index) => {
    setCurrentPokemon(pokemon);
    setCurrentIndex(index);
  };

  const removeAllPokemon = () => {
    PokemonService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    PokemonService.findByTitle(searchTitle)
      .then(response => {
        setPokemon(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Pokemon List</h4>

        <ul className="list-group">
          {pokemon &&
            pokemon.map((pokemon, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActivePokemon(pokemon, index)}
                key={index}
              >
                {pokemon.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllPokemon}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentPokemon ? (
          <div>
            <h4>Pokemon</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentPokemon.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentPokemon.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentPokemon.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentPokemon.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Pokemon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonList;