import { useEffect, useState } from "react";
import "./pokemon.css";
import PkemonCards from "./pokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("")

  const API = "https://pokeapi.co/api/v2/pokemon?limit=300";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) {
        throw new Error(`You got a Error in ${res.ok}`);
      }

      const data = await res.json();
      const detailsPokemonData = data.results.map(async (currPokemon) => {
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        //    console.log(data)
        return data;
      });
      const detailsResponse = await Promise.all(detailsPokemonData);
      //    console.log(detailsResponse)
      setPokemon(detailsResponse);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);
    // console.log(pokemon)

    const searchData = pokemon.filter((currSearchName) => currSearchName.name.toLowerCase().includes(search.toLowerCase()))
    
  if (loading) {
    return (
      <div className="loading">
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Lets Catch Pokémon</h1>
      </header>
      <div className="SearchPokemon">
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Your Pokemon" />
      </div>
      <div className="CardContainer">
        <ul className="cards">
          {searchData.map((currpokemon) => {
            // console.log(currpokemon);
            return (
              <PkemonCards key={currpokemon.id} pokemonData={currpokemon} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
