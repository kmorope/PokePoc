import { Pokemon } from "global/types/pokemon";
import { useCallback, useEffect, useState } from "react";

const useFavorite = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]") || []
  );

  const addFavorite = useCallback((pokemon: Pokemon) => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    favs.push(pokemon);
    setFavorites(favs);
  }, []);

  const removeFavorite = useCallback((pokemon: Pokemon) => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs.filter((fav: Pokemon) => fav.id !== pokemon.id));
  }, []);

  const getFavorites = useCallback(() => {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favs;
  }, []);

  const isFavorite = useCallback(
    (id: number) => {
      return favorites.some((favorite) => favorite.id === id);
    },
    [favorites]
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    getFavorites,
  };
};

export default useFavorite;
