export default function PokemonCards({ pokemonData }) {
  console.log(pokemonData);

  return (
    <li>
      <figure>
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
        />
      </figure>
      <h2>{pokemonData.name}</h2>
      <div className="pokemonType">
        <p>
          {pokemonData.types
            .map((currtype) => currtype.type.name)
            .join(", ")}
        </p>
      </div>
      <div className="threeFeature">
        <p>
          Height: <span>{pokemonData.height}</span>
        </p>
        <p>
          Weight: <span>{pokemonData.weight}</span>
        </p>
        <p>
          Speed: <span>{pokemonData.stats[5].base_stat}</span>
        </p>
      </div>
      <div className="threeStats">
        <p>
          <span>{pokemonData.base_experience}</span> <br />
          Experience
        </p>
        <p>
          <span>{pokemonData.stats[1].base_stat}</span> <br /> Attack{" "}
        </p>
        <p>
          <span>
            {pokemonData.abilities
              .map((currAbilites) => currAbilites.ability.name)
              .slice(0, 1)
              .join(", ")}
          </span>{" "}
          <br /> Abilities
        </p>
      </div>
    </li>
  );
}
