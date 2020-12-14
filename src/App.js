import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPokemon from "./components/AddPokemon";
import Pokemons from "./components/Pokemons";
import PokemonList from "./components/PokemonList";

import { Welcome } from './components/Welcome';
import { useDispatch } from 'react-redux';
import { loadPokemon } from './reducers/pokemon';
import { PokemonNotFound } from './components/PokemonNotFound';
import { Pokemon } from './components/Pokemon';

function App() {
  const [name, setName] = useState();
  const dispatch = useDispatch();

  return (
    <body>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Pokedex
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Pokemon
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={PokemonList} />
          <Route exact path="/add" component={AddPokemon} />
          <Route path="/tutorials/:id" component={Pokemons} />
        </Switch>
      </div>

      <div className="container mt-4">
      <div class="center">
      <div className="pokedex">
        <Switch>
          <Route
            path="/not-found"
            exact
            component={PokemonNotFound}
          />
          <Route
            path="/pokemon/:pokemonName"
            exact
            component={Pokemon}
          />
          <Route component={Welcome} />
        </Switch>

        <div className="center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(loadPokemon(name));
            }}
          >
            <input
              onChange={(e) =>
                setName(e.currentTarget.value)
              }
              placeholder="Enter a pokemon name.."
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
      </div>
    </div>
    </body>
  );
}

export default App;
