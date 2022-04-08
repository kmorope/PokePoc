import usePokemon from "global/services/usePokemon";
import { Result } from "global/types/pokemon";
import { useNavigate } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import useFavorite from "global/hooks/useFavorite";
import Skeleton from "react-loading-skeleton";

interface IItem {
  pokemon: Result;
}
const Item: React.FC<IItem> = ({ pokemon }) => {
  const { data, isLoading } = usePokemon(
    pokemon.url.split("/")[pokemon.url.split("/").length - 2]
  );
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorite();

  const openDetail = () => {
    navigate(`/detail/${data.id}`);
  };

  if (isLoading) {
    return <Skeleton count={1} className="w-full" height={88} />;
  }

  return (
    <div className="card w-full bg-secondary shadow-xl hover:bg-secondary-focus select-none">
      <div className="flex flex-row">
        <figure className="mx-2">
          {data && <img src={data.sprites.front_default} alt={data.name} />}
        </figure>
        <div className="flex flex-row justify-between w-full">
          {data && (
            <div
              className="flex flex-col mx-2 my-2 gap-2 cursor-pointer"
              onClick={openDetail}
            >
              <h2 className="card-title capitalize text-primary-content">
                {"#" + data?.id + " " + data?.name}
              </h2>
              <div className="flex flex-row gap-2">
                {data.types.map((type, index) => {
                  return (
                    <span key={index} className="badge">
                      {type.type.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          <div
            className="flex flex-row justify-center items-center mx-6 cursor-pointer"
            onClick={() => {
              !isFavorite(data?.id || 0)
                ? addFavorite(data)
                : removeFavorite(data);
            }}
          >
            {isFavorite(data?.id || 0) ? (
              <AiFillStar
                className="h-8 w-8"
                strokeLinecap="round"
                strokeLinejoin="round"
                color="yellow"
              />
            ) : (
              <AiOutlineStar
                className="h-8 w-8 "
                strokeLinecap="round"
                strokeLinejoin="round"
                color="yellow"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
