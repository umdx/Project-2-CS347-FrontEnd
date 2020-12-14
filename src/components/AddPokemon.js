import React, { useState } from "react";
import PokemonService from "../services/PokemonService";

function AddPokemon() {
  const initialPokemonState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [pokemon, setPokemon] = useState(initialPokemonState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setPokemon({ ...pokemon, [name]: value });
  };

  const savePokemon = () => {
    var data = {
      title: pokemon.title,
      description: pokemon.description
    };

    PokemonService.create(data)
      .then(response => {
        setPokemon({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPokemon = () => {
    setPokemon(initialPokemonState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You added a Pokemon successfully!</h4>
          <button className="btn btn-success" onClick={newPokemon}>
            Add
          </button>
        </div>
      ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={pokemon.title}
                onChange={handleInputChange}
                name="title" />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={pokemon.description}
                onChange={handleInputChange}
                name="description" />
            </div>

            <button onClick={savePokemon} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
    </div>
  );
}

export default AddPokemon;