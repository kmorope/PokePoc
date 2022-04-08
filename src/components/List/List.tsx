import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Backdrop } from "components/shared";
import useFavorite from "global/hooks/useFavorite";
import usePokemonList from "global/services/usePokemonList";
import { Pokemon, Result } from "global/types/pokemon";
import { useEffect, useState } from "react";
import Item from "./Elements/Item";

interface ISearchProps {
  search: string;
}

const schema = yup.object().shape({
  search: yup.string(),
});

const List: React.FC = () => {
  const [page, setPage] = useState(0);
  const [pageRange, setPageRange] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const { getFavorites } = useFavorite();
  const [favs, setFavs] = useState<Pokemon[]>(getFavorites() || []);
  const [search, setSearch] = useState("");
  const { data, isLoading } = usePokemonList(pageRange, search);
  const { handleSubmit, register } = useForm<ISearchProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: ISearchProps) => {
    setSearch(data.search);
  };

  useEffect(() => {
    if (data && data.count) {
      setMaxPage(Math.round(data.count / 20));
    }
  }, [data]);

  useEffect(() => {
    if (activeTab === 1) {
      setFavs(getFavorites() || []);
    }
  }, [activeTab, getFavorites]);

  const renderPagination = () => {
    let buttons = [];
    for (let index = 0; index < maxPage; index++) {
      buttons.push(
        <button
          className={`btn ${page === index ? "btn-active" : ""}`}
          onClick={() => {
            setPage(index);
            setPageRange(index * 20);
          }}
        >
          {index + 1}
        </button>
      );
    }
    return (
      <div className="btn-group">
        {buttons.map((button, index) => {
          return <div key={index}>{button}</div>;
        })}
      </div>
    );
  };

  return (
    <div>
      <div
        className="tabs tabs-boxed fixed w-full z-40"
        style={{ marginTop: "70px" }}
      >
        <button
          type="button"
          className={`tab ${activeTab === 0 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          List
        </button>
        <button
          type="button"
          className={`tab ${activeTab === 1 ? "tab-active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Favorites
        </button>
      </div>

      <div className="mx-2 py-28">
        {activeTab === 0 && (
          <form className="my-4" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <div className="input-group">
                <input
                  name="search"
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered"
                  {...register("search")}
                />
                <button type="submit" className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        )}
        {isLoading ? (
          <Backdrop show />
        ) : (
          <ul className="w-full my-4 list-none flex flex-col gap-2">
            {activeTab === 0 &&
              data &&
              data.count > 1 &&
              data.results &&
              data.results.map((pokemon: Result, index: number) => (
                <li key={index}>
                  <Item pokemon={pokemon} />
                </li>
              ))}
            {activeTab === 0 &&
              data &&
              data.count <= 0 &&
              data.data &&
              data.data.map((pokemon: Pokemon, index: number) => (
                <li key={index}>
                  <Item
                    pokemon={{
                      name: pokemon.name,
                      url: pokemon.species.url,
                    }}
                  />
                </li>
              ))}
            {activeTab === 1 &&
              favs.length > 0 &&
              favs
                .sort((a, b) => {
                  return a.id - b.id;
                })
                .map((pokemon: Pokemon, index: number) => (
                  <li key={index}>
                    <Item
                      pokemon={{
                        name: pokemon.name,
                        url: pokemon.species.url,
                      }}
                    />
                  </li>
                ))}
            {activeTab === 1 && favs.length <= 0 && (
              <li className="text-center">
                <h1>No favorites yet</h1>
              </li>
            )}
          </ul>
        )}
        {activeTab === 0 && search === "" && renderPagination()}
      </div>
    </div>
  );
};

export default List;
