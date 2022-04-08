import { Backdrop } from "components/shared";
import usePokemon from "global/services/usePokemon";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: pokemon, isLoading } = usePokemon(id);

  useEffect(() => {
    if (typeof id === "undefined" || id === "") {
      navigate(`/`);
    }
  }, [id, navigate]);

  if (isLoading) {
    return <Backdrop show />;
  }

  return (
    <div className="container mx-auto my-2">
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Ir al Listado
      </button>
      {pokemon && pokemon !== null && (
        <div className="card bg-primary w-full shadow-xl cursor-pointer select-none my-4">
          <figure className="mx-2">
            {pokemon && (
              <>
                <img
                  src={
                    pokemon.sprites?.other["official-artwork"].front_default ||
                    pokemon.sprites?.front_default
                  }
                  alt={pokemon.name}
                />
              </>
            )}
          </figure>
          <div className="card-body">
            {pokemon && (
              <div className="flex flex-col mx-2 my-2 gap-2">
                <h2 className="card-title capitalize text-primary-content">
                  {"#" + pokemon.id + " " + pokemon.name}
                </h2>
                <div className="flex flex-row gap-2">
                  {pokemon.types.map((type, index) => {
                    return (
                      <span key={index} className="badge">
                        {type.type.name}
                      </span>
                    );
                  })}
                </div>
                <div>
                  <p className="card-text">
                    <strong>Height: </strong>
                    {pokemon.height}
                  </p>
                  <p className="card-text">
                    <strong>Weight: </strong>
                    {pokemon.weight}
                  </p>
                  <p className="card-text">
                    <strong>Abilities: </strong>
                    {pokemon.abilities.map((ability, index) => {
                      return (
                        <span key={index} className="badge">
                          {ability.ability.name}
                        </span>
                      );
                    })}
                  </p>
                  <p className="card-text">
                    <strong>Stats: </strong>
                    {pokemon.stats.map((stat, index) => {
                      return (
                        <span key={index} className="badge">
                          {stat.stat.name + ": " + stat.base_stat}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
